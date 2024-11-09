'use client'

import { useState } from 'react'

import { Deck } from '@/domain/Deck'
import { ModeToggle } from '@/components/ModeToggle'
import Section from '@/features/deck-editor/Section'
import Search from '@/features/deck-editor/Search'
import { CardView } from '@/services/types'
import Hightlight from '@/features/deck-editor/Hightlight'

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
      <div className="grid grid-cols-[1fr,minmax(0,400px),1fr] gap-4 flex-grow">
        <Section>
          <Search setHighlightedCard={setHighlightedCard} />
        </Section>
        <Section>
          <Hightlight highlightedCard={highlightedCard} />
        </Section>
        <Section>
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
        </Section>
      </div>
    </div>
  )
}
