import { DeckDbService } from '@database/deck.db.service'
import { Injectable } from '@nestjs/common'
import { deck } from '@prisma/client'


@Injectable()
export class DeckService {
	constructor(private readonly deckDbService: DeckDbService){}
	
	performCreateDeck(deckName: string, email: string): Promise<deck>{
		return this.deckDbService.createDeck(deckName, email)
	}
	
	performGetDecks(email: string): Promise<deck[]>{
		return this.deckDbService.getDecks(email)
	}
}