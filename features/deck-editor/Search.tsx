'use client'

import { ChangeEvent, useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { search } from '@/services/scryfallService'
import { useList } from '@/components/ui/list/useList'
import List from '@/components/ui/list'
import ListItem from '@/components/ui/list/ListItem'
import { Skeleton } from '@/components/ui/skeleton'

export default function Search() {
  const [query, setQuery] = useState('')

  const { data: cards, isLoading } = useQuery({
    queryKey: ['cards', query],
    queryFn: () => search(query),
    enabled: query.length > 2,
  })

  const { control, selected, setSelected } = useList<HTMLDivElement>(
    () => cards?.length ?? 0,
  )

  const handleSearchChance = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setQuery(e.target.value)
    },
    [],
  )

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full flex flex-col">
      <Input
        defaultValue={query}
        onChange={handleSearchChance}
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
