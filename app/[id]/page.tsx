import { Deck } from '@/domain/Deck'
import { IDeckRepository } from '@/infrastructure/IDeckRepository'
import { DeckRepository } from '@/infrastructure/DeckRepository'

import Section from './_components/Section'
import Search from './_components/Search'
import { ModeToggle } from '@/components/ModeToggle'

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
      <header className="flex w-full">
        <h1 className="flex-grow scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {deck.name}
        </h1>
        <div className="flex-shrink">
          <ModeToggle />
        </div>
      </header>
      <div className="grid grid-cols-[auto,400px,auto] gap-4">
        <Section>
          <Search />
        </Section>
        <Section>Details</Section>
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
