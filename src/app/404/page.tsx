'use client'

import Footer from '@/app/components/Footer'
import { Header } from '@/app/components/Header'
import { Info } from 'lucide-react'

export default function Page404() {
  return (
    <div className='flex flex-col bg-gray-200'>
      <Header />

      <main>
        <Info color='red' size={64} />
        <p>Página não encontrada</p>
      </main>

      <Footer />
    </div>
  )
}
