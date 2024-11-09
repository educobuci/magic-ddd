import Image from 'next/image'
import { useEffect, useState } from 'react'

import { CardView } from '@/services/types'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function Hightlight({
  highlightedCard,
}: {
  highlightedCard: CardView | null
}) {
  const [isLoading, setIsLoading] = useState(false)

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
        className={cn(
          isLoading ? 'invisible' : 'visible',
          'rounded-xl overflow-hidden',
        )}
        src={highlightedCard?.imageUrl || ''}
        alt={highlightedCard?.name || 'Highlighted card'}
        width={500}
        height={500}
        onLoad={() => {
          setIsLoading(false)
        }}
      />
    </div>
  )
}
