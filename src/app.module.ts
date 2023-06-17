import cryptoConfig from '@config/crypto.config'
import jwtConfig from '@config/jwt.config'
import mailerConfig from '@config/mailer.config'
import serverConfig from '@config/server.config'
import { AuthModule } from '@http/auth/auth.module'
import { CardModule } from '@http/cards/card.module'
import { ProfileModule } from '@http/profile/profile.module'
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
	AuthModule,
	ProfileModule,
	CardModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
