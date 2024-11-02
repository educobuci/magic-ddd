import { Deck } from '@/domain/Deck'
import { IDeckRepository } from '@/infrastructure/IDeckRepository'
import { DeckRepository } from '@/infrastructure/DeckRepository'

import Section from './_components/Section'

export default async function Editor({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const deckRepository: IDeckRepository = new DeckRepository()
  const deck: Deck = await deckRepository.findById(id)

  return (
    <div className="p-4 space-y-4">
      <title>{deck.name}</title>
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
