import { Body, Controller, Get, Post, Put, Query, Res, UseGuards, Headers, UseInterceptors } from '@nestjs/common'
import { Response } from 'express'
import { LocalAuthGuard } from '@http/auth/guards/local.guard'
import { AuthService } from '@http/auth/auth.service'
import { AuthTokenSet, SignInResponse, SignUpRequest } from '@defined-types/auth.type'
import { User } from '@decorators/user.decorator'
import { user } from '@prisma/client'
import { SignUpGuard } from './guards/sign-up.guard'
import { RefreshGuard } from './guards/refresh.guard'
import { JwtAuthGuard } from './guards/jwt.guard'
import { SignUpInterceptor } from './interceptors/sign-up.interceptor'

@Controller('api/auth')
export class AuthController {
	constructor(
        private readonly authService: AuthService,
	) { }

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
	async handleSignIn(@User() user: user): Promise<SignInResponse> {
		return await this.authService.performSignIn(user)
	}

    @UseGuards(SignUpGuard)
	@UseInterceptors(SignUpInterceptor)
    @Put('sign-up')
    async handleSignUp(@Body() body: SignUpRequest): Promise<{ email: string }> {
    	return await this.authService.performSignUp(body)
    }

    @Get('verify-email')
    async handleVerify(@Query('email') email: string, @Query('token') token: string, @Res() res: Response): Promise<void> {
    	const verifyResult = await this.authService.performVerify(email, token)
    	const templates = {
    		'success': 'success',
    		'already confirmed': 'already-confirmed',
    		'time out': 'time-out',
    		'not found': 'not-found'
    	}

    	const templateName = templates[verifyResult] || 'not-found'
    	res.render(templateName, { email })

    }
    @UseGuards(RefreshGuard)
    @Get('refresh')
    async handleRefresh(@Headers('authorization') authHeader: string): Promise<AuthTokenSet> {
    	console.log(authHeader)
    	const refreshToken = authHeader.split(' ')[1]

    	return await this.authService.performRefresh(refreshToken)

    }

    @UseGuards(JwtAuthGuard)
    @Get('launch')
    async handleInit(@User() user: user): Promise<user> {
    	return user
    }

}
