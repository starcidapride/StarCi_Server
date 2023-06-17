import { Module } from '@nestjs/common'
import { PrismaService } from '@database/prisma.service'
import { DeckDbService } from '@database/deck.db.service'
import { DeckController } from './deck.controller'
import { DeckService } from './deck.service'

@Module({
	imports: [],
	providers: [
		PrismaService,
		DeckDbService, 
		DeckService
	],
	controllers: [DeckController]
})
export class DeckModule {}
