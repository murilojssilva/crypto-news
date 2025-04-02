'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import Link from 'next/link'
import { useState } from 'react'
import { List } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()
  const [openMenu, setOpenMenu] = useState(false)

  const pathname = usePathname()
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
            } md:block pt-4 md:pt-0`}
            id='navbar-hamburger'
          >
            <ul className='flex flex-col sm:flex-row items-center gap-2 font-medium justify-center bg-gray-50 md:bg-transparent'>
              <Link href='/news' className='text-blue-800 hover:text-blue-700'>
                <li
                  className={`hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold ${
                    pathname === '/news'
                      ? 'bg-[#1e40af] text-gray-100 hover:bg-blue-500'
                      : 'bg-transparent text-blue-800'
                  }`}
                >
                  Notícias
                </li>
              </Link>
              <Link
                href='/guides'
                className='text-blue-800 hover:text-blue-600'
              >
                <li
                  className={`hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold ${
                    pathname === '/guides'
                      ? 'bg-[#1e40af] text-gray-100 hover:bg-blue-500'
                      : 'bg-transparent text-blue-800'
                  }`}
                >
                  Guias
                </li>
              </Link>
              <Link href='/about' className='text-blue-800 hover:text-blue-600'>
                <li
                  className={`hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold ${
                    pathname === '/about'
                      ? 'bg-[#1e40af] text-gray-100 hover:bg-blue-500'
                      : 'bg-transparent text-blue-800'
                  }`}
                >
                  Sobre
                </li>
              </Link>
              <Link
                href='/privacy'
                className='text-blue-800 hover:text-blue-600'
              >
                <li
                  className={`hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold ${
                    pathname === '/privacy'
                      ? 'bg-[#1e40af] text-gray-100 hover:bg-blue-500'
                      : 'bg-transparent text-blue-800'
                  }`}
                >
                  Privacidade
                </li>
              </Link>
              <Link
                href='https://t.me/crypto_newsbr'
                target='_blank'
                className='text-blue-800 hover:text-blue-600'
              >
                <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold'>
                  Grupo Vip
                </li>
              </Link>
              {session?.user ? (
                <Link
                  href='/dashboard'
                  className='text-blue-800 hover:text-blue-600'
                >
                  <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold'>
                    Dashboard
                  </li>
                </Link>
              ) : (
                <Link
                  href='/login'
                  className='text-blue-800 hover:text-blue-600'
                >
                  <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50 text-md font-bold'>
                    Login
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
