'use client'

import { ChangeEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { search } from '@/services/scryfallService'

export default function Search() {
  const [query, setQuery] = useState('')

  const { data: cards } = useQuery({
    queryKey: ['cards', query],
    queryFn: () => search(query),
    enabled: query.length > 2,
  })

  const handleSearchChance = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
  }

  return (
    <div className="p-4 space-y-4">
      <Input
        defaultValue={query}
        onChange={handleSearchChance}
        placeholder="Search for cards..."
        autoFocus
      ></Input>
      {cards?.map((card) => <div key={card.name}>{card.name}</div>)}
    </div>
  )
}
