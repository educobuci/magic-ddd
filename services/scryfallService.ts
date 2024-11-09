import { Card, CardType, Color, Supertype } from '@/domain/Card'

import { SearchCard } from './types'

export const searchCard: SearchCard = async (
  query: string,
): Promise<Card[]> => {
  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}`,
  )
  if (response.status === 200) {
    const results = await response.json()
    const cards: Card[] = results.data.map(jsonToCard)
    return cards
  }
  return []
}

interface ScryfallCard {
  type_line: string
  colors: string[]
  color_identity: string[]
  name: string
}

function jsonToCard(json: ScryfallCard): Card {
  return {
    cardType: getCardType(json.type_line),
    color: json.colors as Color[],
    colorIndicator: json.color_identity as Color[],
    name: json.name.split(' // ')[0],
  }
}

function getCardType(typeLine: string): CardType {
  const types = typeLine.match(/^\w+/)
  if (!types) {
    throw new Error('Invalid type line')
  }
  if (Object.values(Supertype).includes(types[0] as Supertype)) {
    return types[1] as CardType
  }
  return types[0] as CardType
}
