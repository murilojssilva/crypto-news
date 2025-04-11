'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { Home, LogOutIcon, Newspaper, Pen, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { List } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
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
    return (
      <div
        className={`flex flex-col h-screen w-[8vh] border-r ${
          resolvedTheme === 'light'
            ? 'bg-gray-200 border-gray-300'
            : 'bg-gray-900 border-gray-500'
        }`}
      />
    )

  return (
    <div
      className={`flex flex-col gap-4 h-screen items-center
        border-r
        ${openMenu ? 'w-[24vh]' : 'w-[8vh]'} sticky top-0
      ${
        resolvedTheme === 'light'
          ? 'bg-gray-200 border-gray-300'
          : 'bg-gray-900 border-gray-500'
      }
      `}
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
            className={`flex items-center justify-center w-10 h-10 text-sm rounded-lg border 
              ${
                resolvedTheme === 'light'
                  ? 'bg-gray-100 border-blue-800'
                  : 'bg-gray-800 border-blue-400'
              }
              `}
            aria-controls='navbar-hamburger'
            aria-expanded={openMenu}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className='sr-only'>Open main menu</span>
            <List
              weight='bold'
              size={24}
              className={`${
                resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}
            />
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-4'>
        <Link
          className='flex flex-col gap-2 items-center'
          href='/'
          aria-label='CryptoNews'
        >
          <Image
            src={logo}
            alt='CryptoNews'
            className='md:w-10 md:h-10 w-6 h-6'
          />
          <span
            className={`text-blue-800 font-bold text-xl ${
              !openMenu && 'hidden'
            }`}
          >
            CryptoNews
          </span>
        </Link>
      </div>
      <div className='flex-1 flex flex-col gap-2 px-5'>
        <Link href='/dashboard'>
          <button
            className={`flex flex-row ${
              openMenu ? 'w-36' : 'w-full'
            } justify-center items-center gap-3 text-md p-2 rounded-xl ${
              pathname === '/dashboard'
                ? `text-blue-800 cursor-not-allowed font-bold bg-gray-100
                    }`
                : resolvedTheme === 'light'
                ? 'text-gray-600 hover:bg-gray-300'
                : 'text-gray-200 hover:bg-gray-600'
            }`}
          >
            <Home
              color={
                pathname === '/dashboard'
                  ? '#1565C0'
                  : resolvedTheme === 'light'
                  ? 'black'
                  : 'gray'
              }
            />
            {openMenu && 'Dashboard'}
          </button>
        </Link>
        {session?.user.role === 'costumer' && (
          <Link href='/dashboard/news'>
            <button
              className={`flex flex-row ${
                openMenu ? 'w-36' : 'w-full'
              } justify-center items-center gap-3 text-md p-2 rounded-xl ${
                pathname?.startsWith('/dashboard/news')
                  ? `text-blue-800 cursor-not-allowed font-bold bg-gray-100
                    }`
                  : resolvedTheme === 'light'
                  ? 'text-gray-600 hover:bg-gray-300'
                  : 'text-gray-200 hover:bg-gray-600'
              }`}
            >
              <Newspaper
                color={
                  pathname?.startsWith('/dashboard/news')
                    ? '#1565C0'
                    : resolvedTheme === 'light'
                    ? 'black'
                    : 'gray'
                }
              />
              {openMenu && 'Notícias'}
            </button>
          </Link>
        )}
        {session?.user.role !== 'costumer' && (
          <Link href='/dashboard/posts'>
            <button
              className={`flex flex-row ${
                openMenu ? 'w-36' : 'w-full'
              } justify-center items-center gap-3 text-md p-2 rounded-xl ${
                pathname?.startsWith('/dashboard/posts')
                  ? `text-blue-800 cursor-not-allowed font-bold bg-gray-100
                    }`
                  : resolvedTheme === 'light'
                  ? 'text-gray-600 hover:bg-gray-300'
                  : 'text-gray-200 hover:bg-gray-600'
              }`}
            >
              <Pen
                color={
                  pathname?.startsWith('/dashboard/posts')
                    ? '#1565C0'
                    : resolvedTheme === 'light'
                    ? 'black'
                    : 'gray'
                }
              />
              {openMenu && 'Posts'}
            </button>
          </Link>
        )}
        <Link href='/dashboard/profile'>
          <button
            className={`flex flex-row ${
              openMenu ? 'w-36' : 'w-full'
            } justify-center items-center gap-3 text-md p-2 rounded-xl ${
              pathname === '/dashboard/profile'
                ? `text-blue-800 cursor-not-allowed font-bold bg-gray-100
                    }`
                : resolvedTheme === 'light'
                ? 'text-gray-600 hover:bg-gray-300'
                : 'text-gray-200 hover:bg-gray-600'
            }`}
          >
            <User
              color={
                pathname === '/dashboard/profile'
                  ? '#1565C0'
                  : resolvedTheme === 'light'
                  ? 'black'
                  : 'gray'
              }
            />
            {openMenu && 'Perfil'}
          </button>
        </Link>
      </div>
      <div className='py-8'>
        <button
          onClick={handleLogout}
          className={`flex flex-row ${
            openMenu ? 'w-36' : 'w-full'
          } justify-center items-center gap-3 text-md p-2 rounded-xl text-red-500
            ${
              resolvedTheme === 'light'
                ? 'hover:bg-gray-300'
                : 'hover:bg-gray-600'
            }
          `}
        >
          <LogOutIcon color='red' /> {openMenu && 'Sair'}
        </button>
      </div>
    </div>
  )
}
