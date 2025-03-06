import { ButtonHTMLAttributes, ElementType } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  IconComponent?: ElementType
}

export function Button({ text, IconComponent, ...props }: ButtonProps) {
  return (
    <button
      className='bg-blue-800 font-bold text-md text-white px-8 py-4 rounded-xl hover:bg-blue-600 flex items-center gap-2 justify-center'
      {...props}
    >
      {IconComponent && <IconComponent color='white' />} {text}
    </button>
  )
}
