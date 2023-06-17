import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { card, card_type, champion_card, champion_card_role, equipment_card_class } from '@prisma/client'
import { Card, ChampionCard, EquipmentCard, SpellCard } from '@defined-types/card.type'

@Injectable()
export class CardDbService {
	constructor(private prisma: PrismaService) {
	}
	async getCards(name: string, type?: card_type): Promise<card[]> {
	 	return await this.prisma.card.findMany({
			where: {
				name: {
					contains: name
				},
				...(type && { type })
			},
		})
	}

	async getChampionCard(name: string, role?: champion_card_role): Promise< ChampionCard | null>{
		try{
			return await this.prisma.champion_card.findFirstOrThrow({
				where: {
					name, 
					...(role && {role})
				},
			})
 	} catch (ex){
			return null
		}
	}

	async getEquipmentCard(name: string, equipmentClass : equipment_card_class): Promise< EquipmentCard | null>{
		try{
			return await this.prisma.equipment_card.findFirstOrThrow({
				where: {
					name, 
					...(equipmentClass && {equipmentClass})
				},
			})
 	} catch (ex){
			return null
		}
	}
	
}