'use client'

import { ChangeEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { search as doSearch } from '@/services/scryfallService'

export default function Search() {
  const [search, setSearch] = useState('')

  const { data: cards } = useQuery({
    queryKey: ['cards', search],
    queryFn: () => doSearch(search),
    enabled: search.length > 2,
  })

  const handleSearchChance = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  return (
    <div className="p-4 space-y-4">
      <Input
        defaultValue={search}
        onChange={handleSearchChance}
        placeholder="Search for cards..."
        autoFocus
      ></Input>
      {cards?.map((card) => <div key={card.name}>{card.name}</div>)}
    </div>
  )
}
