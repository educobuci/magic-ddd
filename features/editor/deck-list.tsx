import List from '@/components/ui/list'
import ListItem from '@/components/ui/list/list-item'
import { useList } from '@/components/ui/list/useList'
import { Deck } from '@/domain/Deck'

export default function DeckList({ deck }: { deck: Deck }) {
  const { control, selected, setSelected } = useList<HTMLDivElement>(
    () => deck.mainboard.size,
    deck.sideboard.size > 0 ? deck.mainboard.size + 1 : undefined,
  )

  return (
    <List className="h-full" ref={control}>
      <div className="px-3 py-2 font-semibold flex items-center leading-none">
        Mainboard
      </div>
      {Array.from(deck.mainboard).map((card, index) => (
        <ListItem
          isSelected={index === selected?.row && selected.section === 0}
          onClick={() => setSelected({ row: index, section: 0 })}
          key={card.name}
        >
          {card.name}
        </ListItem>
      ))}
      {deck.sideboard.size > 0 && (
        <>
          <div className="px-3 py-2 font-semibold flex items-center leading-none">
            Sideboard
          </div>
          {Array.from(deck.sideboard).map((card, index) => (
            <ListItem
              isSelected={index === selected?.row && selected.section === 1}
              onClick={() => setSelected({ row: index, section: 1 })}
              key={card.name}
            >
              {card.name}
            </ListItem>
          ))}
        </>
      )}
    </List>
  )
}
