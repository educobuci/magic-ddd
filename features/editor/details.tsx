import Image from 'next/image'
import { useEffect, useState } from 'react'

import { CardView } from '@/services/types'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function CardDetails({
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
      <div>
        <h3 className="mb-2  scroll-m-20 text-2xl font-semibold tracking-tight">
          {highlightedCard.name}
        </h3>
      </div>
      {isLoading && <Skeleton className="aspect-[5/7] rounded-[4.3%] w-full" />}
      <Image
        className={cn(
          isLoading ? 'invisible' : 'visible',
          'rounded-[4.3%] overflow-hidden border',
        )}
        src={highlightedCard?.imageUrl || ''}
        alt={highlightedCard?.name || 'Highlighted card'}
        width={500}
        height={500}
        onLoad={() => {
          setIsLoading(false)
        }}
      />
      <div className="pt-2 flex w-full gap-2 items-stretch justify-evenly ">
        <Button className="flex-1" variant="secondary">
          Add to side
        </Button>
        <Button className="flex-1">Add to main</Button>
      </div>
    </div>
  )
}
