import { Module } from '@nestjs/common'
import { PrismaService } from '@database/prisma.service'
import { CardDbService } from '@database/card.db.service'
import { CardService } from './card.service'
import { CardController } from './card.controller'

@Module({
	imports: [],
	providers: [
		PrismaService,
		CardDbService,
		CardService
	],
	controllers: [CardController]
})
export class CardModule {}
