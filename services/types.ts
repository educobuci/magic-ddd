import { Card } from '@/domain/Card'

export type CardView = Card & {
  imageUrl: string
}

export type SearchCard = (query: string) => Promise<CardView[]>
