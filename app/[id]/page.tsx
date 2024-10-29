import { Deck } from '@/domain/Deck'
import { DeckRepository } from '@/infrastructure/DeckRepository'

type AsyncParams<T> = { params: Promise<T> }

export default async function Editor({ params }: AsyncParams<{ id: string }>) {
  const id = (await params).id

  const deck: Deck = await new DeckRepository().findById(id)

  return (
    <div>
      <h1>{deck.name}</h1>
      {Array.from(deck.mainboard).map((card) => (
        <div key={card.name}>{card.name}</div>
      ))}
    </div>
  )
}
