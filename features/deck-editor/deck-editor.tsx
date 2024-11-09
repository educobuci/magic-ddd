'use client'

import { useState } from 'react'

import { Deck } from '@/domain/Deck'
import { ModeToggle } from '@/components/mode-toggle'
import Search from '@/features/deck-editor/search'
import { CardView } from '@/services/types'
import CardDetails from '@/features/deck-editor/card-details'

export default function DeckEditor({ deck }: { deck: Deck }) {
  const [highlightedCard, setHighlightedCard] = useState<CardView | null>(null)

  return (
    <div className="p-4 space-y-4 h-screen max-h-screen flex flex-col">
      <title>{deck.name}</title>
      <header className="flex w-full">
        <h1 className="flex-grow scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {deck.name}
        </h1>
        <div className="flex-shrink">
          <ModeToggle />
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden gap-4 relative">
        <section className="basis-1/3 rounded-md border p-2">
          <Search setHighlightedCard={setHighlightedCard} />
        </section>
        <section className="basis-1/3 max-w-[400px] rounded-md border p-2">
          <CardDetails highlightedCard={highlightedCard} />
        </section>
        <section className="basis-1/3 rounded-md border p-2">
          <div>
            <h2>Mainboard</h2>
            {Array.from(deck.mainboard).map((card) => (
              <div key={card.name}>{card.name}</div>
            ))}
          </div>
          {deck.sideboard.size > 0 && (
            <div>
              <h2>Sideboard</h2>
              {Array.from(deck.sideboard).map((card) => (
                <div key={card.name}>{card.name}</div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
