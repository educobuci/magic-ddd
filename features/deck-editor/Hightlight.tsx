import Image from 'next/image'
import { useEffect, useState } from 'react'

import { CardView } from '@/services/types'
import { Skeleton } from '@/components/ui/skeleton'

export default function Hightlight({
  highlightedCard,
}: {
  highlightedCard: CardView | null
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
  }, [highlightedCard])

  if (!highlightedCard) {
    return null
  }

  return (
    <div className="flex flex-col">
      {isLoading && <Skeleton className="aspect-[5/7] rounded-xl w-full" />}
      <Image
        className={isLoading ? 'hidden' : 'block'}
        src={highlightedCard?.imageUrl || ''}
        alt={highlightedCard?.name || 'Highlighted card'}
        layout="responsive"
        width={500}
        height={500}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
