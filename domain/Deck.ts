import { Card } from '@/domain/Card'

export interface Deck {
  name: string
  readonly mainboard: ReadonlySet<Card>
  readonly sideboard: ReadonlySet<Card>
}
