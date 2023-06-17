import { Controller,  UseGuards, Get, Param } from '@nestjs/common'
import { CardService } from './card.service'
import { Card, SearchCardsRequest } from '@defined-types/card.type'
import { SearchCardsGuard } from './guards/search-cards.guard'


@Controller('api/card')
export class CardController {
	constructor(
        private readonly cardService: CardService,
	) { }

	@UseGuards(SearchCardsGuard)
    @Get('search-cards/:name/:type/:championRole/:equipmentClass')
	async handleUploadPicture(@Param('name') name: string, 
	@Param('type') type: number, @Param('championRole') championRole: number, @Param('equipmentClass') equipmentClass : number ): Promise<Card[]>{
		const param: SearchCardsRequest = { name, type, championRole, equipmentClass }
		console.log(param)
		return this.cardService.performSearchCards(param)
	}
}
