import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './database/prisma.service'
import serverConfig from '@config/server.config'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import {json} from 'body-parser'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.setBaseViewsDir(join(__dirname, '..', 'views'))
 	app.setViewEngine('ejs')

	app.use(json({limit: '50mb'}))

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)
	await app.listen(serverConfig().port)

}

bootstrap()
