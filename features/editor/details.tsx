import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/domain/Card'

const CARD_FRONT_IMAGE_URL = `https://c1.scryfall.com/file/scryfall-cards/normal/front`

export default function CardDetails({
  addCard,
  highlightedCard,
}: {
  addCard: (card: Card) => void
  highlightedCard: Card | null
}) {
  const [isLoading, setIsLoading] = useState(false)

  const imageUrl = useMemo(() => {
    if (highlightedCard) {
      const [folder, sub] = highlightedCard?.id.split('')
      return `${CARD_FRONT_IMAGE_URL}/${folder}/${sub}/${highlightedCard.id}.jpg`
    }
  }, [highlightedCard])

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
          isLoading ? 'invisible opacity-0' : 'visible opacity-100',
          'transition-opacity  rounded-[4.3%] overflow-hidden border',
        )}
        src={imageUrl || ''}
        alt={highlightedCard?.name || 'Highlighted card'}
        width={500}
        height={500}
        onLoad={() => {
          setIsLoading(false)
        }}
      />
      {!isLoading && (
        <div className="pt-2 flex w-full gap-2 items-stretch justify-evenly ">
          <Button className="flex-1" variant="secondary">
            Add to side
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              addCard({ ...highlightedCard })
            }}
          >
            Add to main
          </Button>
        </div>
      )}
    </div>
  )
}
