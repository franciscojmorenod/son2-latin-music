import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Son2 Latin Music | Award-Winning Latin Band in Tampa Bay',
  description: 'Professional Latin band performing salsa, merengue, bachata, cumbia, and more. Over 10 years of experience in Tampa Bay area. Book us for your next event!',
  keywords: 'Latin band, Tampa Latin music, salsa band, merengue, cumbia, bachata, live music Tampa, wedding band, corporate events',
  openGraph: {
    title: 'Son2 Latin Music',
    description: 'Award-winning Latin band in Tampa Bay',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
