import { Metadata } from 'next'

import { Deck } from '@/domain/Deck'
import { IDeckRepository } from '@/infrastructure/IDeckRepository'
import { DeckRepository } from '@/infrastructure/DeckRepository'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import DeckEditor from '@/features/editor'

const deckRepository: IDeckRepository = new DeckRepository()

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> => {
  const id = (await params).id
  return { title: (await deckRepository.findById(id)).name }
}

export default async function DeckEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const deck: Deck = await deckRepository.findById(id)

  return (
    <ReactQueryProvider>
      <DeckEditor deck={deck} />
    </ReactQueryProvider>
  )
}
