import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import jwtConfig from '@config/jwt.config'
import { UserDbService } from '@database/user.db.service'
import { JwtPayload } from '@defined-types/auth.type'
import { user } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userDbService: UserDbService) {
		super(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				ignoreExpiration: false,
				secretOrKey: jwtConfig().secret
			}
		)
	}

	async validate(payload: JwtPayload): Promise<user> {
		return await this.userDbService.getUser(payload.email)
	}
}