import Image from 'next/image'

import { CardView } from '@/services/types'

export default function Hightlight({
  highlightedCard,
}: {
  highlightedCard: CardView | null
}) {
  if (!highlightedCard) {
    return null
  }
  return (
    <Image
      src={highlightedCard?.imageUrl || ''}
      alt={highlightedCard?.name || 'Highlighted card'}
      layout="responsive"
      width={500}
      height={500}
    />
  )
}
