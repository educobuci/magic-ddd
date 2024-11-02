import { ReactNode } from 'react'

export default function Section({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-md border border-gray-200 dark:border-gray-800 p-2">
      {children}
    </section>
  )
}
