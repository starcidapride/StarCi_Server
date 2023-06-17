import { card_type, champion_card_role, equipment_card_class } from '@prisma/client'

export const TypeMap: {[key: number]: card_type} = {
	1: 'Champion',
	2: 'Equipment',
	3: 'Spell',
	4: 'Summon'
}

export const RoleMap: {[key: number]: champion_card_role} = {
	1: 'Warrior',
	2: 'Tank',
	3: 'Support',
	4: 'Mage',
	5: 'Marksman',
	6: 'Assassin'
}

export const ClassMap: {[key: number]: equipment_card_class} = {
	1: 'Attack',
	2: 'Magic',
	3: 'Defense',

}