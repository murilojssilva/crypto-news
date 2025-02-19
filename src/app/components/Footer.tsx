'use client'

import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from '@phosphor-icons/react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='flex flex-col'>
      <nav className='bg-gray-50 p-8 flex flex-row justify-between'>
        <div>
          <h1 className='text-xl font-bold text-blue-800'>Mapa do site</h1>
          <ul className='flex flex-col py-4 gap-2'>
            <Link href='' className='text-blue-800 hover:text-blue-600'>
              <li>Quem somos</li>
            </Link>
            <Link href='' className='text-blue-800 hover:text-blue-600'>
              <li>Privacidade</li>
            </Link>
            <Link href='' className='text-blue-800 hover:text-blue-600'>
              <li>Termos de uso</li>
            </Link>
          </ul>
        </div>
        <div>
          <h1 className='text-xl font-bold text-blue-800'>Contato</h1>
          <ul className='flex flex-col py-4 gap-2'>
            <Link href='' className='text-blue-800 hover:text-blue-600'>
              <li>E-mail</li>
            </Link>
            <Link href='' className='text-blue-800 hover:text-blue-600'>
              <li>Telegram</li>
            </Link>
            <Link href='' className='text-blue-800 hover:text-blue-600'>
              <li>Suporte</li>
            </Link>
          </ul>
        </div>
        <div>
          <h1 className='text-xl font-bold text-blue-800'>Siga-nos</h1>
          <div className='flex flex-row py-4 gap-2'>
            <div className='rounded-full bg-blue-800 p-2 flex items-center justify-center'>
              <Link href='facebook.com'>
                <FacebookLogo color='white' weight='bold' size={32} />
              </Link>
            </div>
            <div className='rounded-full bg-blue-800 p-2 flex items-center justify-center'>
              <Link href='linkedin.com'>
                <LinkedinLogo color='white' weight='bold' size={32} />
              </Link>
            </div>
            <div className='rounded-full bg-blue-800 p-2 flex items-center justify-center'>
              <Link href='instagram.com'>
                <InstagramLogo color='white' weight='bold' size={32} />
              </Link>
            </div>
            <div className='rounded-full bg-blue-800 p-2 flex items-center justify-center'>
              <Link href='x.com'>
                <XLogo color='white' weight='bold' size={32} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className='bg-gray-900 px-8 py-4 gap-2 flex flex-row justify-between'>
        <h3>. Todos os direitos reservados</h3>
        <p>{new Date().getFullYear()} &copy; cryptonews.com.br</p>
      </div>
    </div>
  )
}
