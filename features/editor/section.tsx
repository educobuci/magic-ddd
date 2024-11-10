import { ReactNode } from 'react'

export default function Section({ children }: { children: ReactNode }) {
  return <section className="rounded-md border p-2">{children}</section>
}
