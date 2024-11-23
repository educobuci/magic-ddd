import { useEffect, useMemo } from 'react'

import List from '@/components/ui/list'
import ListItem from '@/components/ui/list/list-item'
import { useList } from '@/components/ui/list/useList'
import { Deck } from '@/domain/Deck'
import { Card } from '@/domain/Card'

type CardLines = Map<string, [number, Card]>

export default function DeckList({
  deck,
  setHighlightedCard,
}: {
  deck: Deck
  setHighlightedCard: (card: Card | null) => void
}) {
  const cardLines = useMemo(() => {
    return Array.from(deck.mainboard).reduce<CardLines>((acc, card) => {
      const quantity = acc.get(card.id)?.[0] ?? 0
      acc.set(card.id, [quantity + 1, card])
      return acc
    }, new Map())
  }, [deck.mainboard])

  const { control, selected, setSelected } = useList<HTMLDivElement>(
    () => cardLines.size,
    deck.sideboard.size > 0 ? deck.mainboard.size + 1 : undefined,
  )

  useEffect(() => {
    if (selected) {
      const selectedCard = cardLines.get(
        [...cardLines.keys()][selected.row],
      )![1]
      setHighlightedCard(selectedCard)
    }
  }, [selected, cardLines, setHighlightedCard])

  return (
    <List className="h-full" ref={control}>
      <div className="p-4 font-semibold flex items-center leading-none">
        Mainboard
      </div>
      {[...cardLines.entries()].map(([id, [quantity, card]], index) => (
        <ListItem
          isSelected={index === selected?.row && selected.section === 1}
          onClick={() => setSelected({ row: index, section: 1 })}
          key={id}
        >
          ({quantity}) - {card.name}
        </ListItem>
      ))}
      {/* {deck.sideboard.size > 0 && (
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
      )} */}
    </List>
  )
}
