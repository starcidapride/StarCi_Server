import { card_type, champion_card_role, equipment_card_class } from '@prisma/client'

export type ChampionCard = {
    role: champion_card_role,
    maxHealth: number,
    attackDamage: number,
    armor: number,
    magicResistance: number
}

export type EquipmentCard = {
    // 
}

export type SpellCard = {
    description: string
}

export type Card = {
    name: string,
    type: card_type,
    details?: ChampionCard | EquipmentCard | SpellCard
}

export type SearchCardsRequest = {
    name: string,
    type: number,
    championRole: number,
    equipmentClass: number
}
