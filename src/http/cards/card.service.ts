import { CardDbService } from '@database/card.db.service'
import { Card, ChampionCard, EquipmentCard, SearchCardsRequest, SpellCard } from '@defined-types/card.type'
import { Injectable } from '@nestjs/common'
import { ClassMap, RoleMap, TypeMap } from 'src/maps/card.map'

@Injectable()
export class CardService {
	constructor(private readonly cardDbService: CardDbService){}
	async performSearchCards(data: SearchCardsRequest): Promise<Card[]>{
		const cards: Card[] = []
		
		let name : string
		if (!data.name){
			name = ''
		}
	
		const type = data.type == 0 ? null : TypeMap[data.type]

		const generalCards = await this.cardDbService.getCards(name, type)
		

		for (const card of generalCards){
			let details: ChampionCard | EquipmentCard | SpellCard | null
			switch (card.type){
			case 'Champion':
				const role = data.championRole == 0 ? null : RoleMap[data.championRole]
				details = await this.cardDbService.getChampionCard(name, role)
				break
			case 'Equipment':
				const equipmentClass = data.equipmentClass == 0 ? null : ClassMap[data.equipmentClass]
				details = await this.cardDbService.getEquipmentCard(name, equipmentClass)
				break
			case 'Spell':

				break
			case 'Summon':
				details = null
				break
			}

			cards.push(
				{
					name: card.name,
					type: card.type,
					...(details && {details})
				}
			)
		  }

		return cards
	}
}