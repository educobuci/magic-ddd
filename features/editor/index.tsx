'use client'

import { useState } from 'react'

import { Deck } from '@/domain/Deck'
import { ModeToggle } from '@/components/mode-toggle'
import Search from '@/features/editor/search'
import CardDetails from '@/features/editor/details'
import { Card } from '@/domain/Card'

import DeckList from './deck-list'

export default function DeckEditor({ deck }: { deck: Deck }) {
  const [highlightedCard, setHighlightedCard] = useState<Card | null>(null)

  return (
    <div className="p-4 space-y-4 h-screen max-h-screen flex flex-col">
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
        <section className="flex-grow rounded-md border p-2">
          <Search setHighlightedCard={setHighlightedCard} />
        </section>
        <section className="flex-grow max-w-[400px] rounded-md border p-2">
          <CardDetails highlightedCard={highlightedCard} />
        </section>
        <section className="flex-grow">
          <DeckList deck={deck} />
        </section>
      </div>
    </div>
  )
}
