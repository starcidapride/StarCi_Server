import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { card, card_type, champion_card_role, equipment_card_class } from '@prisma/client'
import { ChampionCard, EquipmentCard, SpellCard } from '@defined-types/card.type'

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
			const data = await this.prisma.champion_card.findFirstOrThrow({
				where: {
					name, 
					...(role && {role})
				},
			})
			return {
				role: data.role,
				maxHealth: data.maxHealth,
				attackDamage: data.attackDamage,
				armor: data.armor,
				magicResistance: data.magicResistance
			}
 	} catch (ex){
			return null
		}
	}

	async getEquipmentCard(name: string, equipmentClass? : equipment_card_class): Promise< EquipmentCard | null>{
		try{
			const data = await this.prisma.equipment_card.findFirstOrThrow({
				where: {
					name, 
					...(equipmentClass && {equipmentClass})
				},
			})

			return {
				class : data.class,
				description: data.description,
			}
 	} catch (ex){
			return null
		}
	}

	async getSpellCard(name: string): Promise< SpellCard | null>{
		try{
			const data =  await this.prisma.spell_card.findFirstOrThrow({
				where: {
					name
				},
			})
			return {
				description: data.description,
			}
 	} catch (ex){
			return null
		}
	}
}