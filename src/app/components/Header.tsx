'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import Link from 'next/link'
import { useState } from 'react'
import { List } from '@phosphor-icons/react'

export function Header() {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div>
      <nav className='border-gray-200 bg-gray-50'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link className='flex flex-row gap-2 items-center' href='/'>
            <Image src={logo} alt='CyptoNews' className='w-8 h-8' />
            <h1 className='text-blue-800 font-bold text-xl'>CryptoNews</h1>
          </Link>

          <button
            data-collapse-toggle='navbar-hamburger'
            type='button'
            className='inline-flex items-center justify-center w-10 h-10 text-sm rounded-lg border border-blue-800 bg-gray-100 md:hidden'
            aria-controls='navbar-hamburger'
            aria-expanded={openMenu}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className='sr-only'>Open main menu</span>
            <List weight='bold' size={24} className='text-blue-800' />
          </button>
          <div
            className={`w-full md:w-auto ${
              openMenu ? 'block' : 'hidden'
            } md:block`}
            id='navbar-hamburger'
          >
            <ul className='flex flex-col sm:flex-row items-center gap-2 font-medium bg-gray-50 md:bg-transparent'>
              <Link href='/news' className='text-blue-800 hover:text-blue-600'>
                <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold'>
                  Notícias
                </li>
              </Link>
              <Link href='/about' className='text-blue-800 hover:text-blue-600'>
                <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold'>
                  Sobre
                </li>
              </Link>
              <Link
                href='https://t.me/crypto_newsbr'
                className='text-blue-800 hover:text-blue-600'
              >
                <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold'>
                  Grupo Vip
                </li>
              </Link>
              <Link
                href='/privacy'
                className='text-blue-800 hover:text-blue-600'
              >
                <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold'>
                  Privacidade
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
