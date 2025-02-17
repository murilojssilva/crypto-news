'use client'

import Footer from '@/app/components/Footer'
import { Header } from '@/app/components/Header'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Page404() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header />

      <main className='flex flex-1 flex-row items-center justify-around text-center p-8'>
        <AlertTriangle color='red' size={300} />
        <div className='flex flex-col'>
          <h1 className='text-4xl text-gray-800 font-bold mt-6'>
            Ops! Página não encontrada.
          </h1>
          <p className='text-lg text-gray-600 mt-2 max-w-md'>
            Parece que você tentou acessar um link que não existe ou foi
            removido. Volte para a página inicial e continue navegando!
          </p>
          <Link
            href='/'
            className='mt-6 px-6 py-3 bg-blue-800 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition'
          >
            Ir para a Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
