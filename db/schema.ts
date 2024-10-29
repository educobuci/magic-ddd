import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const decksTable = sqliteTable('decks', {
  id: text().primaryKey(),
  name: text().notNull(),
  mainboard: text({ mode: 'json' }).notNull(),
  sideboard: text({ mode: 'json' }).notNull(),
})
