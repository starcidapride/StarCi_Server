import cryptoConfig from '@config/crypto.config'
import jwtConfig from '@config/jwt.config'
import mailerConfig from '@config/mailer.config'
import serverConfig from '@config/server.config'
import { AuthModule } from '@http/auth/auth.module'
import { AuthService } from '@http/auth/auth.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'


@Module({
	imports: [ConfigModule.forRoot({
		load: [
			mailerConfig,
			jwtConfig,
			serverConfig,
			cryptoConfig
		],
	}),
	AuthModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
