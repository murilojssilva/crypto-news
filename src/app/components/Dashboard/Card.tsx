import { ReactElement } from 'react'

interface CardProps {
  text: string
  value: number
  icon: ReactElement
}

export function Card({ text, value, icon }: CardProps) {
  return (
    <div className='border border-gray-300 bg-gray-100 p-4 rounded-md flex flex-col gap-3 justify-around'>
      <div>
        <h3 className='text-gray-800 text-xl font-bold'>{text}</h3>
      </div>
      <div className='flex flex-row justify-between items-center'>
        {icon}
        <span className='text-blue-800 font-bold text-3xl'>{value}</span>
      </div>
    </div>
  )
}
