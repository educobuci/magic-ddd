import { CardType, Color, Supertype } from '@/domain/Card'

import { CardView, SearchCard } from './types'

const CARD_FRONT_IMAGE_URL = `https://c1.scryfall.com/file/scryfall-cards/normal/front`

export const searchCard: SearchCard = async (
  query: string,
): Promise<CardView[]> => {
  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}`,
  )
  if (response.status === 200) {
    const results = await response.json()
    const cards: CardView[] = results.data.map(jsonToCard)
    return cards
  }
  return []
}

interface ScryfallCard {
  id: string
  type_line: string
  colors: string[]
  color_identity: string[]
  name: string
}

function jsonToCard(json: ScryfallCard): CardView {
  const [folder, sub] = json.id.split('')
  return {
    cardType: getCardType(json.type_line),
    color: json.colors as Color[],
    colorIndicator: json.color_identity as Color[],
    name: json.name.split(' // ')[0],
    imageUrl: `${CARD_FRONT_IMAGE_URL}/${folder}/${sub}/${json.id}.jpg`,
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
