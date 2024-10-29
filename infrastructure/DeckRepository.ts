import { decksTable } from '@/db/schema'
import { IDeckRepository } from './IDeckRepository'
import { Deck } from '@/domain/Deck'
import { db } from '@/db'
import { eq } from 'drizzle-orm'

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

  private static fromRow(row: any): Deck {
    return {
      id: row.id,
      name: row.name,
      mainboard: new Set(row.mainboard as []),
      sideboard: new Set(row.sideboard as []),
    }
  }
}
