import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { deck } from '@prisma/client'

@Injectable()
export class DeckDbService {
	constructor(private prisma: PrismaService) {
	}

	public async getDecks(email: string): Promise<deck[]> {
		return this.prisma.deck.findMany({
			where: {
				email
			}
		})
	}

	public async createDeck(deckName: string, email: string): Promise<deck> {
		return this.prisma.deck.create({
			data: {
				name: deckName,
				email
			}
		})
	}
}