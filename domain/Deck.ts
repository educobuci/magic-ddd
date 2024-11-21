import { Card } from '@/domain/Card'

export interface Deck {
  id: string
  name: string
  mainboard: ReadonlySet<Card>
  sideboard: ReadonlySet<Card>
}
