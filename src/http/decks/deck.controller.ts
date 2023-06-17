import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@http/auth/guards/jwt.guard'
import { CreateDeckRequest } from '@defined-types/deck.type'
import { deck, user } from '@prisma/client'
import { DeckService } from './deck.service'
import { User } from '@decorators/user.decorator'
import { CreateDeckGuard } from './guards/create-deck.guard'


@Controller('api/deck')
export class DeckController {
	constructor(
        private readonly deckService: DeckService,
	) { }

	@UseGuards(JwtAuthGuard)
	@Get('get-decks')
	async handleGetDecks(@User() user : user): Promise<deck[]>{
		return this.deckService.performGetDecks(user.email)
	}

	@UseGuards(JwtAuthGuard, CreateDeckGuard)
    @Put('create-deck')
	async handleCreateDeck(@User() user : user, @Body() body: CreateDeckRequest): Promise<deck>{
		return this.deckService.performCreateDeck(body.deckName, user.email)
	}

}
