import { Card } from '@/domain/Card'

export interface Deck {
  id: string
  name: string
  readonly mainboard: ReadonlySet<Card>
  readonly sideboard: ReadonlySet<Card>
}
