'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { Home, LogOutIcon, Pen, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { List } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

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
  }, [session?.user])

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  if (status === 'loading')
    return <div className='flex flex-col h-screen bg-gray-200 w-[10vh]' />

  return (
    <div
      className={`flex flex-col gap-4 h-screen bg-gray-200 items-center ${
        openMenu ? 'w-[24vh]' : 'w-[16vh]'
      } sticky top-0`}
    >
      <div
        className={`flex ${
          openMenu ? 'flex-row' : 'flex-col'
        } gap-8 items-center justify-between p-8`}
      >
        <div className='hidden md:flex justify-start'>
          <button
            data-collapse-toggle='navbar-hamburger'
            type='button'
            className='flex items-center justify-center w-10 h-10 text-sm rounded-lg border border-blue-800 bg-gray-100'
            aria-controls='navbar-hamburger'
            aria-expanded={openMenu}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className='sr-only'>Open main menu</span>
            <List weight='bold' size={24} className='text-blue-800' />
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-4'>
        <Image
          src={logo}
          alt='CryptoNews'
          className='md:w-10 md:h-10 w-6 h-6'
        />
        <span
          className={`text-blue-800 font-bold text-xl ${!openMenu && 'hidden'}`}
        >
          CryptoNews
        </span>
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
        {session?.user.role !== 'costumer' && (
          <Link href='/dashboard/posts'>
            <button
              className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl hover:bg-gray-300 w-full ${
                pathname?.startsWith('/dashboard/posts')
                  ? `text-gray-800 font-bold ${openMenu && 'bg-gray-100'}`
                  : 'text-gray-600'
              }`}
            >
              <Pen
                color={
                  pathname?.startsWith('/dashboard/posts') ? '#1565C0' : 'black'
                }
              />
              {openMenu && 'Posts'}
            </button>
          </Link>
        )}
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
      <div className='py-8'>
        <button
          onClick={handleLogout}
          className='flex flex-row items-center gap-3 text-sx p-2 rounded-xl text-red-500 hover:bg-gray-300 w-full'
        >
          <LogOutIcon color='red' /> {openMenu && 'Sair'}
        </button>
      </div>
    </div>
  )
}
