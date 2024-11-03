import { Deck } from '@/domain/Deck'
import { IDeckRepository } from '@/infrastructure/IDeckRepository'
import { DeckRepository } from '@/infrastructure/DeckRepository'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import DeckEditor from '@/features/deck-editor/DeckEditor'

export default async function DeckEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const deckRepository: IDeckRepository = new DeckRepository()
  const deck: Deck = await deckRepository.findById(id)

  return (
    <ReactQueryProvider>
      <DeckEditor deck={deck} />
    </ReactQueryProvider>
  )
}
