import { Deck } from '@/domain/Deck'
import { db } from '@/db'
import { decksTable } from '@/db/schema'
import { DeckRepository } from '@/infrastructure/DeckRepository'

export default async function Editor() {
  const id = 'e990842a-2190-452b-afab-2607c2193aad'

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
