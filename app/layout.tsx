import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'FinanceFlow - Smart Finance Dashboard',
  description:
    'A modern finance dashboard to track your income, expenses, and financial insights.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Navbar />

        {/* ✅ Responsive Main Wrapper */}
        <main className="min-h-screen pt-16 px-3 sm:px-6 lg:px-8 overflow-x-hidden">
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  )
}