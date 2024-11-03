import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/ThemeProvider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Magic DDD',
  description: 'Magic the Gathering Editor in Domain-Driven Design',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
