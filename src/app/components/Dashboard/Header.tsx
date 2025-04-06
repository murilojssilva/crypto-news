import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../../../auth'
import { HeaderDashboardProps } from '@/app/interfaces/Dashboard'
import ThemeSwitcher from '../Theme/ThemeSwitcher'
import { useTheme } from 'next-themes'

export default function HeaderDashboard({
  IconComponent,
  title,
  firstName,
}: HeaderDashboardProps) {
  const { resolvedTheme } = useTheme()

  if (firstName)
    return (
      <div
        className={`p-4 border-b
      ${
        resolvedTheme === 'dark'
          ? 'bg-gray-800 border-gray-500'
          : 'bg-gray-50 border-gray-300'
      }
      
      `}
      >
        <div className='flex items-center justify-between w-full'>
          <div>
            <h1
              className={`${
                resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-800'
              }`}
            >
              Olá, <span className='font-bold'>{firstName}</span>
            </h1>
          </div>
          <div className='flex flex-row items-center gap-8'>
            <ThemeSwitcher />
            <div className='flex flex-row gap-2'>
              <IconComponent
                color={resolvedTheme === 'light' ? '#1565C0' : '#60a5fa'}
              />
              <span
                className={`font-bold ${
                  resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-800'
                }`}
              >
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authConfig)

  return {
    props: {
      firstName: session?.user.name,
    },
  }
}
