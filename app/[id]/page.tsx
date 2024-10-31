import { ReactNode } from 'react'

import { Deck } from '@/domain/Deck'
import { DeckRepository } from '@/infrastructure/DeckRepository'

type AsyncParams<T> = { params: Promise<T> }

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-md border border-gray-200 dark:border-gray-800 p-2">
      {children}
    </section>
  )
}

export default async function Editor({ params }: AsyncParams<{ id: string }>) {
  const id = (await params).id
  const deck: Deck = await new DeckRepository().findById(id)

  return (
    <div className="p-4 space-y-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {deck.name}
      </h1>
      <div className="grid grid-cols-[auto,400px,auto] gap-4">
        <Section>Search</Section>
        <Section>Details</Section>
        <Section>
          {Array.from(deck.mainboard).map((card) => (
            <div key={card.name}>{card.name}</div>
          ))}
        </Section>
      </div>
    </div>
  )
}
