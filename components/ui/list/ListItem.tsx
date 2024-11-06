import { MouseEventHandler, PropsWithChildren } from 'react'

interface ListItemProps {
  isSelected: boolean
  onClick?: MouseEventHandler<HTMLLIElement> | undefined
}

const ListItem = ({
  isSelected,
  onClick,
  children,
}: PropsWithChildren<ListItemProps>) => {
  return (
    <li
      onMouseDown={onClick}
      className={`px-3 py-1 ${
        isSelected ? 'bg-gray-200 dark:bg-gray-600' : ''
      }`}
    >
      {children}
    </li>
  )
}

export default ListItem
