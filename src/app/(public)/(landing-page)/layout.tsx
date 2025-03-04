'use client'

import Footer from '@/app/components/Footer'
import { Header } from '@/app/components/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
