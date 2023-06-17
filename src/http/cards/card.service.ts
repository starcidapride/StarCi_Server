import { CardDbService } from '@database/card.db.service'
import { Card, ChampionCard, EquipmentCard, SearchCardsRequest, SpellCard } from '@defined-types/card.type'
import { Injectable } from '@nestjs/common'
import { ClassMap, RoleMap, TypeMap } from 'src/maps/card.map'

@Injectable()
export class CardService {
	constructor(private readonly cardDbService: CardDbService){}
	async performSearchCards(data: SearchCardsRequest): Promise<Card[]>{
		
		const cards: Card[] = []
		
		const type = data.type == 0 ? null : TypeMap[data.type]

		const generalCards = await this.cardDbService.getCards(data.name, type)

		for (const card of generalCards){
			let details: ChampionCard | EquipmentCard | SpellCard | null
			switch (card.type){
			case 'Champion':
				const role = data.championRole == 0 ? null : RoleMap[data.championRole]
				details = await this.cardDbService.getChampionCard(card.name, role)
				if (details == null){
					continue
				}
				break
			case 'Equipment':
				const equipmentClass = data.equipmentClass == 0 ? null : ClassMap[data.equipmentClass]
				details = await this.cardDbService.getEquipmentCard(card.name, equipmentClass)
				if (details == null){
					continue
				}
				break
			case 'Spell':
				details = await this.cardDbService.getSpellCard(card.name)
				if (details == null){
					continue
				}
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