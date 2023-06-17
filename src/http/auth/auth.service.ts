import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { CryptoService } from '@utils/sha256.service'
import { JwtService } from '@nestjs/jwt'
import { UserDbService } from '@database/user.db.service'
import { user } from '@prisma/client'
import { AuthTokenSet, JwtPayload, PresentableUser, SignInResponse, SignUpRequest, SignUpResponse, VerifyResponse } from '@defined-types/auth.type'
import jwtConfig from '@config/jwt.config'
import { MailerService } from './mailer/mailer.service'
import { RefreshTokenDbService } from '@database/refresh-token.db.service'
import { TokenExpiredError } from 'jsonwebtoken'

@Injectable()
export class AuthService {
	constructor(
		private readonly userDbService: UserDbService,
		private readonly jwtService: JwtService,
		private readonly refreshTokenDbService: RefreshTokenDbService,
		private readonly mailerService: MailerService,
		private readonly cryptoService: CryptoService

	) { }
	async validateUser(email: string, password: string): Promise<user> {
		const hashedPassword = this.cryptoService.createHashSHA256(password)
		const user = await this.userDbService.getUser(email,
			{
				password: hashedPassword
			})
		if (!user) {
			throw new UnauthorizedException('Email hoặc mật khẩu không đúng.')
		}
		return user
	}

	private async generateAuthTokenSet(email: string): Promise<AuthTokenSet> {
		const payload = { email }
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: jwtConfig().accessTokenExpiryTime,
			secret: jwtConfig().secret,
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: jwtConfig().refreshTokenExpiryTime,
			secret: jwtConfig().secret,
		})

		return { accessToken, refreshToken }
	}

	private getPresentableUser(user: user): PresentableUser {
		return {
			email: user.email,
			...(user.picture !== null && { picture: user.picture.toString('base64') }),
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName
		}
	}
	async performSignIn(user: user): Promise<SignInResponse> {
		const authTokenSet = await this.generateAuthTokenSet(user.email)

		if (!user.isVerified) {
			throw new UnauthorizedException('Prior to continuing, it\'s important that you verify your account through your email. Furthermore, we have sent you another email as a backup option in case you have misplaced or cannot locate the initial email.')
		}
		const presentableUser = this.getPresentableUser(user)

		return { authTokenSet, presentableUser }
	}

	async performSignUp(data: SignUpRequest): Promise<PresentableUser> {
		const { email, password, username, firstName, lastName } = data

		const hashedPassword = this.cryptoService.createHashSHA256(password)
		const user: user = {
			email, password: hashedPassword, username, firstName, lastName, picture: null, isVerified: 0
		}

		const isSuccess = await this.userDbService.createUser(user)
		if (!isSuccess) {
			throw new HttpException('This email has been register before.', HttpStatus.NOT_FOUND)
		}

		await this.mailerService.sendMail(email, username)

		return this.getPresentableUser(user)

	}

	async performRefresh(refreshToken: string): Promise<AuthTokenSet> {
		let payload: JwtPayload
		try{
		 	payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, { secret: jwtConfig().secret })
		} catch (ex){
			throw new HttpException('The refresh token has either expired or is invalid.', HttpStatus.BAD_REQUEST)
		}

		const email = payload.email

		// const queryToken = await this.refreshTokenDbService.getToken(refreshToken)
		// if (queryToken === null) {
		// 	throw new HttpException('The database does not contain the refresh token.', HttpStatus.BAD_REQUEST)
		// }

		const tokenSet = await this.generateAuthTokenSet(email)
		await this.refreshTokenDbService.addToken({
			token: tokenSet.refreshToken,
			email
		}
		)
		return tokenSet
	}

	async performLaunch(user: user): Promise<PresentableUser> {
		return this.getPresentableUser(user)
	}


	async performVerify(email: string, token: string): Promise<VerifyResponse> {
		try {
			const decoded = this.jwtService.verify<JwtPayload>(token, { secret: jwtConfig().secret })

			const isVerified = (await this.userDbService.getUser(decoded.email)).isVerified

			if (isVerified) {
				return 'already confirmed'
			} else {
				await this.userDbService.updateUser(email, { isVerified: 1 })
				return 'success'
			}

		} catch (ex) {
			if (ex instanceof TokenExpiredError) {
				return 'time out'
			} else {
				return 'not found'
			}
		}
	}
}


