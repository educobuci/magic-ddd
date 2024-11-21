import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { Card } from '@/domain/Card'

export const decksTable = sqliteTable('decks', {
  id: text().primaryKey(),
  name: text().notNull(),
  mainboard: text({ mode: 'json' }).$type<Card[]>().notNull(),
  sideboard: text({ mode: 'json' }).$type<Card[]>().notNull(),
})
