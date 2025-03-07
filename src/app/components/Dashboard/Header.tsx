import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../../../auth'
import { HeaderDashboardProps } from '@/app/interfaces/Dashboard'

export default function HeaderDashboard({
  currentDate,
  IconComponent,
  title,
  name,
}: HeaderDashboardProps) {
  return (
    <div className='p-4 mt-2 border-b border-gray-300'>
      <div className='flex items-center justify-between w-full'>
        <div>
          <h1 className='text-blue-800'>
            Olá, <span className='font-bold'>{name}</span>
          </h1>
          <span className='text-gray-800'>{currentDate}</span>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <IconComponent color='#1565C0' />
          <span className='font-bold text-gray-800'>{title}</span>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authConfig)

  return {
    props: {
      name: session?.user?.name || 'Visitante',
    },
  }
}
