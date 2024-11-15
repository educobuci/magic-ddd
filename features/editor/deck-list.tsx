import { useMemo } from 'react'

import List from '@/components/ui/list'
import ListItem from '@/components/ui/list/list-item'
import { useList } from '@/components/ui/list/useList'
import { Deck } from '@/domain/Deck'

type CardLines = Map<string, number>

export default function DeckList({ deck }: { deck: Deck }) {
  const cardLines = useMemo(() => {
    return Array.from(deck.mainboard).reduce<CardLines>((acc, card) => {
      const quantity = acc.get(card.name) ?? 0
      acc.set(card.name, quantity + 1)
      return acc
    }, new Map())
  }, [deck.mainboard])

  const { control, selected, setSelected } = useList<HTMLDivElement>(
    () => cardLines.size,
    deck.sideboard.size > 0 ? deck.mainboard.size + 1 : undefined,
  )

  return (
    <List className="h-full" ref={control}>
      <div className="p-4 font-semibold flex items-center leading-none">
        Mainboard
      </div>
      {[...cardLines.entries()].map(([name, quantity], index) => (
        <ListItem
          isSelected={index === selected?.row && selected.section === 1}
          onClick={() => setSelected({ row: index, section: 1 })}
          key={name}
        >
          ({quantity}) - {name}
        </ListItem>
      ))}
      {deck.sideboard.size > 0 && (
        <>
          <div className="px-3 py-2 font-semibold flex items-center leading-none">
            Sideboard
          </div>
          {cardLines.entries().map(([name, quantity], index) => (
            <ListItem
              isSelected={index === selected?.row && selected.section === 1}
              onClick={() => setSelected({ row: index, section: 1 })}
              key={name}
            >
              ({quantity}) - {name}
            </ListItem>
          ))}
        </>
      )}
    </List>
  )
}
