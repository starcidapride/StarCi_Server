import { Module } from '@nestjs/common'
import { AuthService } from '@http/auth/auth.service'
import { AuthController } from '@http/auth/auth.controller'
import { LocalStrategy } from '@http/auth/strategies/local.strategy'
import { UserDbService } from '@database/user.db.service'
import { PrismaService } from '@database/prisma.service'
import { JwtStrategy } from '@http/auth/strategies/jwt.strategy'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@http/auth/mailer/mailer.service'
import { CryptoService } from '@utils/sha256.service'
import { RefreshTokenDbService } from '@database/refresh-token.db.service'

@Module({
	imports: [],
	providers: [
		AuthService, 
		LocalStrategy,
		JwtStrategy,
		UserDbService,
		RefreshTokenDbService,
		PrismaService,
		JwtService,
		MailerService, 
		CryptoService
	],
	controllers: [AuthController]
})
export class AuthModule {}
