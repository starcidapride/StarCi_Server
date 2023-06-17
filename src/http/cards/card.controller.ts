import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CardService } from './card.service'
import { Card, SearchCardsRequest } from '@defined-types/card.type'
import { JwtAuthGuard } from '@http/auth/guards/jwt.guard'
import { SearchCardsGuard } from './guards/search-cards.guard'

@Controller('api/card')
export class CardController {
	constructor(
        private readonly cardService: CardService,
	) { }

	@UseGuards(JwtAuthGuard, SearchCardsGuard)
    @Post('search-cards')
	async handleUploadPicture(@Body() body: SearchCardsRequest): Promise<Card[]>{
		return this.cardService.performSearchCards(body)
	}
}
