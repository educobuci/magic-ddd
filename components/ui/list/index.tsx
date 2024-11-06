import { forwardRef, PropsWithChildren } from 'react'

const List = forwardRef<HTMLUListElement, PropsWithChildren<object>>(
  ({ children }, ref) => {
    return (
      <ul
        ref={ref}
        tabIndex={0}
        className="flex-grow max-h-full overflow-y-auto select-none focus:outline-none w-full focus:ring-2 focus:ring-indigo-500 rounded"
      >
        {children}
      </ul>
    )
  },
)

List.displayName = 'List'

export default List
