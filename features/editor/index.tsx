'use client'

import { useOptimistic, useState, useTransition } from 'react'

import { Deck } from '@/domain/Deck'
import { ModeToggle } from '@/components/mode-toggle'
import Search from '@/features/editor/search'
import CardDetails from '@/features/editor/details'
import { Card } from '@/domain/Card'

import DeckList from './deck-list'
import { addCardAction } from './actions'

export default function DeckEditor({ deck }: { deck: Deck }) {
  const [optimisticDeck, setOptimisticDeck] = useOptimistic(
    { deck, sending: false },
    (state, newDeck: Deck) => ({ deck: newDeck, sending: false }),
  )
  const [highlightedCard, setHighlightedCard] = useState<Card | null>(null)
  const [isPending, startTransition] = useTransition()

  const addCard = (card: Card) => {
    startTransition(async () => {
      const newDeck = { ...deck, mainboard: new Set([...deck.mainboard, card]) }
      setOptimisticDeck(newDeck)
      await addCardAction(deck.id, card)
    })
  }

  return (
    <div className="p-4 space-y-4 h-screen max-h-screen flex max-w-screen-2xl flex-col m-auto ">
      <header className="flex w-full items-center gap-2">
        <h1 className="flex-grow scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          {deck.name}
        </h1>
        {isPending && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        )}
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
          <DeckList
            deck={optimisticDeck.deck}
            setHighlightedCard={setHighlightedCard}
          />
        </section>
      </div>
    </div>
  )
}
