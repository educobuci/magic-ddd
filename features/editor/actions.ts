'use server'

import { revalidatePath } from 'next/cache'

import { Card } from '@/domain/Card'
import { DeckRepository } from '@/infrastructure/DeckRepository'

const addCardAction = async (deckId: string, card: Card) => {
  const deckRepository = new DeckRepository()
  const deck = await deckRepository.findById(deckId)
  deck.mainboard = new Set([...deck.mainboard, card])
  deckRepository.save(deck)
  revalidatePath(`/${deckId}`)
}

export { addCardAction }
