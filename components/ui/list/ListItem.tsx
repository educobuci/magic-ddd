import { MouseEventHandler, PropsWithChildren } from 'react'

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
      className={`px-3 py-1 ${
        isSelected ? 'bg-gray-200 dark:bg-gray-600' : ''
      }`}
    >
      {children}
    </div>
  )
}

export default ListItem
