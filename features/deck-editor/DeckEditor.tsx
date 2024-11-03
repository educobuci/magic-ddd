import { Deck } from '@/domain/Deck'
import { ModeToggle } from '@/components/ModeToggle'
import Section from '@/features/deck-editor/Section'
import Search from '@/features/deck-editor/Search'

export default async function DeckEditor({ deck }: { deck: Deck }) {
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
      <div className="grid grid-cols-[1fr,400px,1fr] gap-4">
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
