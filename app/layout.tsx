import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'By Kayode Uthman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#f5f6f8]'>{children}</body>
    </html>
  )
}
