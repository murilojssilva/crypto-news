import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  IconComponent?: React.ElementType
}

export function Button({ text, IconComponent, ...props }: ButtonProps) {
  return (
    <button
      className='bg-blue-800 font-bold text-md text-white px-8 py-4 rounded-xl hover:bg-blue-600 flex items-center gap-2'
      {...props}
    >
      {IconComponent && <IconComponent color='white' />} {text}
    </button>
  )
}
