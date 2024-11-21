import { eq } from 'drizzle-orm'

import { decksTable } from '@/db/schema'
import { Deck } from '@/domain/Deck'
import { db } from '@/db'
import { IDeckRepository } from '@/infrastructure/IDeckRepository'
import { Card } from '@/domain/Card'

export class DeckRepository implements IDeckRepository {
  async findById(id: string): Promise<Deck> {
    const row = await db
      .select()
      .from(decksTable)
      .where(eq(decksTable.id, id))
      .then((row) => row![0])

    return DeckRepository.fromRow(row)
  }

  async all(): Promise<Deck[]> {
    const rows = await db
      .select()
      .from(decksTable)
      .then((rows) => rows!)

    return rows.map(DeckRepository.fromRow)
  }

  async save(deck: Deck): Promise<void> {
    await db
      .update(decksTable)
      .set({
        id: deck.id,
        name: deck.name,
        mainboard: Array.from(deck.mainboard),
        sideboard: Array.from(deck.sideboard),
      })
      .execute()
  }

  private static fromRow(row: {
    id: string
    name: string
    mainboard: Card[]
    sideboard: Card[]
  }): Deck {
    return {
      id: row.id,
      name: row.name,
      mainboard: new Set(row.mainboard),
      sideboard: new Set(row.sideboard),
    }
  }
}
