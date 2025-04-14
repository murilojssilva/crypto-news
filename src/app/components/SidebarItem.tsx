import { useMenu } from '@/context/MenuContext'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ElementType } from 'react'

interface SidebarItemProps extends LinkProps {
  title: string
  icon: ElementType
}

export default function SidebarItem({
  title,
  icon: Icon,
  ...props
}: SidebarItemProps) {
  const { openMenu } = useMenu()
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  return (
    <Link
      {...props}
      className={`group flex items-center gap-3 px-3 py-2 outline-none
            ${!openMenu && 'justify-center'}
            `}
      {...props}
    >
      <Icon
        className='h-5 w-5 flex-shrink-0'
        color={
          pathname === props.href
            ? '#1565C0'
            : resolvedTheme === 'light'
            ? 'black'
            : 'gray'
        }
      />
      <span
        className={`rounded-full
            ${
              pathname === props.href
                ? `${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  } cursor-not-allowed font-bold`
                : resolvedTheme === 'light'
                ? 'text-gray-600'
                : 'text-gray-200'
            }
            ${!openMenu && 'hidden'}
          `}
      >
        {title}
      </span>
    </Link>
  )
}
