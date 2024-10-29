import { Deck } from '@/domain/Deck'

export interface IDeckRepository {
  findById(id: string): Promise<Deck>
}
