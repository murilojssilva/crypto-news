'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { Home, Pen, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { List } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenMenu(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <div
        className={`overflow-y-scroll sticky top-4 h-[calc(100vh)] ${
          openMenu ? 'w-[calc(30vh)]' : 'w-[calc(10vh)]'
        } bg-gray-200 items-center`}
      >
        <div
          className={`flex ${
            openMenu ? 'flex-row' : 'flex-col'
          } gap-2 items-center justify-between p-8`}
        >
          <Image src={logo} alt='CryptoNews' className='w-10 h-10' />

          <div className='hidden md:flex justify-start'>
            <button
              data-collapse-toggle='navbar-hamburger'
              type='button'
              className={`inline-flex items-center justify-center w-10 h-10 text-sm rounded-lg border border-blue-800 bg-gray-100 ms:hidden`}
              aria-controls='navbar-hamburger'
              aria-expanded={openMenu}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span className='sr-only'>Open main menu</span>
              <List weight='bold' size={24} className='text-blue-800' />
            </button>
          </div>
        </div>
        <div className={`flex flex-col gap-2 ${openMenu ? 'px-7' : 'px-5'}`}>
          <Link href='/dashboard'>
            <button
              className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl ${
                pathname === '/dashboard'
                  ? openMenu && 'text-gray-800 font-bold bg-gray-100 w-full'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              <Home color={pathname === '/dashboard' ? '#1565C0' : 'black'} />
              {openMenu && 'Dashboard'}
            </button>
          </Link>
          <Link href='/posts'>
            <button
              className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl ${
                pathname === '/posts'
                  ? openMenu && 'text-gray-800 font-bold bg-gray-100 w-full'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              <Pen color={pathname === '/posts' ? '#1565C0' : 'black'} />
              {openMenu && 'Posts'}
            </button>
          </Link>
          <Link href='/profile'>
            <button
              className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl ${
                pathname === '/profile'
                  ? openMenu && 'text-gray-800 font-bold bg-gray-100 w-full'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              <User color={pathname === '/profile' ? '#1565C0' : 'black'} />
              {openMenu && 'Perfil'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
