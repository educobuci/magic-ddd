'use client'

import { useCallback, useState } from 'react'

import { Deck } from '@/domain/Deck'
import { ModeToggle } from '@/components/mode-toggle'
import Search from '@/features/editor/search'
import CardDetails from '@/features/editor/details'
import { Card } from '@/domain/Card'

import DeckList from './deck-list'

export default function DeckEditor({ deck }: { deck: Deck }) {
  const [deckState, setDeckState] = useState(deck)
  const [highlightedCard, setHighlightedCard] = useState<Card | null>(null)

  const addCard = useCallback((card: Card) => {
    setDeckState((previousDeck) => {
      const mainboard = new Set(previousDeck.mainboard)
      mainboard.add(card)
      return { ...previousDeck, mainboard }
    })
  }, [])

  return (
    <div className="p-4 space-y-4 h-screen max-h-screen flex max-w-screen-2xl flex-col m-auto ">
      <title>{deck.name}</title>
      <header className="flex w-full">
        <h1 className="flex-grow scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          {deck.name}
        </h1>
        <div className="flex-shrink">
          <ModeToggle />
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden gap-4 relative">
        <section className="flex-1 rounded-md border p-2">
          <Search setHighlightedCard={setHighlightedCard} />
        </section>
        <section className="flex-none max-w-[400px] w-full rounded-md border p-2">
          <CardDetails highlightedCard={highlightedCard} addCard={addCard} />
        </section>
        <section className="flex-1">
          <DeckList deck={deckState} />
        </section>
      </div>
    </div>
  )
}
