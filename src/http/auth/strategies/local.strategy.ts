import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '@http/auth/auth.service'
import { user } from '@prisma/client'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'email'
		})
	}

	validate(email: string, password: string): Promise<user> {
		return this.authService.validateUser(email, password)
	}
}