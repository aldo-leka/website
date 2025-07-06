import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: "Aldo's Site",
  description: 'Personal portfolio and blog about programming and investing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Sidebar />
        <main className="md:ml-48 max-w-content mx-auto px-4 md:px-8 py-16 pt-20 md:pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}