import { Card, CardType, Supertype } from '@/domain/Card'

export const search = async (query: string): Promise<Card[]> => {
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

function jsonToCard(json: any): Card {
  return {
    cardType: getCardType(json.type_line),
    color: json.colors,
    colorIndicator: json.color_identity,
    name: json.name,
  }
}

function getCardType(json: any): CardType {
  const types = json.type_line?.match(/^\w+/)
  if (Object.values(Supertype).includes(types?.[0])) {
    return types[1]
  }
  return types?.[0]
}
