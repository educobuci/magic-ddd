import { useCallback, useEffect, useRef, useState } from 'react'

export interface IndexPath {
  section: number
  row: number
}

export function useList<TElement extends HTMLElement = HTMLUListElement>(
  getNumberOfRowsInSection: (section: number) => number,
  numberOfSections: number = 1,
) {
  const [selected, setSelected] = useState<IndexPath | null>(null)
  const clearSelected = () => setSelected(null)
  const control = useRef<TElement>(null)

  const onKeyDown = useCallback(
    (selectedIndexPath: IndexPath, e: KeyboardEvent) => {
      const { section, row } = selectedIndexPath
      const keyHandlers = {
        ArrowUp: () => {
          if (row > 0) {
            setSelected({ section, row: row - 1 })
          } else if (section > 0) {
            const newSection = section - 1
            const newRow = getNumberOfRowsInSection(newSection) - 1
            setSelected({ section: newSection, row: newRow })
          }
        },
        ArrowDown: () => {
          if (row < getNumberOfRowsInSection(section) - 1) {
            setSelected({ section, row: row + 1 })
          } else if (section < numberOfSections - 1) {
            const newSection = section + 1
            const newRow = 0
            setSelected({ section: newSection, row: newRow })
          } else if (row === -1) {
            setSelected({ section: 0, row: 0 })
          }
        },
      }
      const handler = keyHandlers[e.key as keyof typeof keyHandlers]
      if (handler) {
        handler()
        e.preventDefault()
      }
    },
    [getNumberOfRowsInSection, numberOfSections],
  )

  useEffect(() => {
    const currentControl = control.current
    const onKeyDownAdapter = (e: KeyboardEvent) => {
      onKeyDown(selected || { section: 0, row: -1 }, e)
    }

    currentControl?.addEventListener('keydown', onKeyDownAdapter)
    return () => {
      currentControl?.removeEventListener('keydown', onKeyDownAdapter)
    }
  }, [selected, onKeyDown])

  return { control, selected, setSelected, clearSelected }
}
