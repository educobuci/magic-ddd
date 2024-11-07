import { forwardRef, PropsWithChildren } from 'react'

const List = forwardRef<HTMLUListElement, PropsWithChildren<object>>(
  ({ children }, ref) => {
    return (
      <ul
        ref={ref}
        tabIndex={0}
        className="flex-grow max-h-full rounded border border-input bg-transparent shadow-sm select-none
          transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {children}
      </ul>
    )
  },
)

List.displayName = 'List'

export default List
