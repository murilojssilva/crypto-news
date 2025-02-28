'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { Home, LogOutIcon, Pen, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { List } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

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

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <div
      className={`flex flex-col h-screen bg-gray-200 ${
        openMenu ? 'w-[30vh]' : 'w-[10vh]'
      } sticky top-0`}
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
            className='inline-flex items-center justify-center w-10 h-10 text-sm rounded-lg border border-blue-800 bg-gray-100 ms:hidden'
            aria-controls='navbar-hamburger'
            aria-expanded={openMenu}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className='sr-only'>Open main menu</span>
            <List weight='bold' size={24} className='text-blue-800' />
          </button>
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-2 px-5'>
        <Link href='/dashboard'>
          <button
            className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl hover:bg-gray-300 w-full ${
              pathname === '/dashboard'
                ? `text-gray-800 font-bold ${openMenu && 'bg-gray-100'}`
                : 'text-gray-600'
            }`}
          >
            <Home color={pathname === '/dashboard' ? '#1565C0' : 'black'} />
            {openMenu && 'Dashboard'}
          </button>
        </Link>
        <Link href='/dashboard/posts'>
          <button
            className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl hover:bg-gray-300 w-full ${
              pathname === '/dashboard/posts'
                ? `text-gray-800 font-bold ${openMenu && 'bg-gray-100'}`
                : 'text-gray-600'
            }`}
          >
            <Pen
              color={pathname === '/dashboard/posts' ? '#1565C0' : 'black'}
            />
            {openMenu && 'Posts'}
          </button>
        </Link>
        <Link href='/dashboard/profile'>
          <button
            className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl hover:bg-gray-300 w-full ${
              pathname === '/dashboard/profile'
                ? `text-gray-800 font-bold ${openMenu && 'bg-gray-100'}`
                : 'text-gray-600'
            }`}
          >
            <User
              color={pathname === '/dashboard/profile' ? '#1565C0' : 'black'}
            />
            {openMenu && 'Perfil'}
          </button>
        </Link>
      </div>

      <div className='p-5'>
        <button
          onClick={handleLogout}
          className='flex flex-row items-center gap-3 text-sx p-2 rounded-xl text-gray-800 hover:bg-gray-300 w-full'
        >
          <LogOutIcon color='red' /> {openMenu && 'Sair'}
        </button>
      </div>
    </div>
  )
}
