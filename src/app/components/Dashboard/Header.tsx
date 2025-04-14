'use client'

import { HeaderDashboardProps } from '@/app/interfaces/Dashboard'
import ThemeSwitcher from '../Theme/ThemeSwitcher'
import { useTheme } from 'next-themes'
import { List } from '@phosphor-icons/react'
import { useMenu } from '@/context/MenuContext'

export default function HeaderDashboard({
  IconComponent,
  title,
}: HeaderDashboardProps) {
  const { openMenu, setOpenMenu } = useMenu()
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={`p-4 border-b
      ${
        resolvedTheme === 'light'
          ? 'bg-gray-50 border-gray-300'
          : 'bg-gray-800 border-gray-500'
      }
      
      `}
    >
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-row items-center gap-8'>
          <div className='flex flex-row gap-2'>
            <IconComponent
              color={resolvedTheme === 'light' ? '#1565C0' : '#60a5fa'}
            />
            <span
              className={`font-bold ${
                resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}
            >
              {title}
            </span>
          </div>
        </div>
        <div className='flex flex-row gap-4 items-end justify-end'>
          <ThemeSwitcher />
          <div
            className={`flex ${
              openMenu ? 'flex-row' : 'flex-col'
            } gap-8 items-center justify-between`}
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
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
