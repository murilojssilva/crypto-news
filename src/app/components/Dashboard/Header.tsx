import { Icon } from '@phosphor-icons/react'

interface HeaderProps {
  currentDate: string
  IconComponent: Icon
  name: string
  title: string
}

export default function HeaderDashboard({
  currentDate,
  IconComponent,
  name,
  title,
}: HeaderProps) {
  return (
    <div className='p-4 mt-2 border-b border-gray-300'>
      <div className='flex items-center justify-between w-full'>
        <div>
          <h1 className='text-blue-800 font-bold'>Olá, {name}</h1>
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
