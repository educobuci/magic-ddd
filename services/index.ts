import { Card } from '@/domain/Card'

export type SearchCard = (query: string) => Promise<Card[]>
