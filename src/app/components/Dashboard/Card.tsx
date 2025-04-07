import { useTheme } from 'next-themes'
import { ReactElement } from 'react'

interface CardProps {
  text: string
  value: number
  icon: ReactElement
}

export function Card({ text, value, icon }: CardProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={`border p-4 rounded-md flex flex-col gap-3 justify-around
    ${
      resolvedTheme === 'light'
        ? 'bg-gray-100 border-gray-200'
        : ' bg-gray-800 border-gray-700'
    }
      `}
    >
      <div>
        <h3
          className={`text-xl font-bold

        ${resolvedTheme === 'light' ? 'text-blue-800' : 'text-gray-50'}
          text-gray-800
          `}
        >
          {text}
        </h3>
      </div>
      <div className='flex flex-row justify-between items-center'>
        {icon}
        <span
          className={`font-bold text-3xl

        ${resolvedTheme === 'light' ? 'text-blue-800' : ' text-blue-400'}
          
          `}
        >
          {value}
        </span>
      </div>
    </div>
  )
}
