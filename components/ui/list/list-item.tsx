import { MouseEventHandler, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface ListItemProps {
  isSelected: boolean
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const ListItem = ({
  isSelected,
  onClick,
  children,
}: PropsWithChildren<ListItemProps>) => {
  return (
    <div
      onMouseDown={onClick}
      className={cn(
        isSelected && 'bg-accent text-accent-foreground',
        `px-3 py-1`,
      )}
    >
      {children}
    </div>
  )
}

export default ListItem
