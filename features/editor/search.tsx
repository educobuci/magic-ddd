'use client'

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useQuery } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { searchCard } from '@/services/scryfallService'
import { useList } from '@/components/ui/list/useList'
import List from '@/components/ui/list'
import ListItem from '@/components/ui/list/list-item'
import { Skeleton } from '@/components/ui/skeleton'
import { CardView, SearchCard } from '@/services/types'

export default function Search({
  setHighlightedCard,
}: {
  setHighlightedCard: (card: CardView | null) => void
}) {
  const [query, setQuery] = useState('')
  const search: SearchCard = searchCard

  const { data: cards, isLoading } = useQuery({
    queryKey: ['cards', query],
    queryFn: () => search(query),
    enabled: query.length > 2,
  })

  const { control, selected, setSelected, clearSelected } =
    useList<HTMLDivElement>(() => cards?.length ?? 0)

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setQuery(e.target.value)
    },
    [],
  )

  const handleTextFieldKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        control.current?.focus()
      }
    },
    [control],
  )

  useEffect(() => {
    if (selected && cards) {
      setHighlightedCard(cards[selected.row])
    } else {
      setHighlightedCard(null)
    }
  }, [setHighlightedCard, selected, cards])

  useEffect(() => {
    clearSelected()
  }, [cards, clearSelected])

  return (
    <div className="p-4 space-y-4 overflow-hidden h-full flex flex-col">
      <Input
        defaultValue={query}
        onChange={handleSearchChange}
        onKeyDown={handleTextFieldKeyDown}
        placeholder="Search for cards..."
        autoFocus
      ></Input>
      <List ref={control}>
        {isLoading && (
          <div className="p-4 flex flex-col gap-4 w-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        )}
        {cards?.map((card, index) => (
          <ListItem
            isSelected={index === selected?.row}
            onClick={() => setSelected({ row: index, section: 0 })}
            key={card.name}
          >
            {card.name}
          </ListItem>
        ))}
      </List>
    </div>
  )
}
