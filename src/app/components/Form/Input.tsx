import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorsField: string // mantém, está correto
}

export default function Input({ errorsField, disabled, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        'border border-gray-400 p-2 rounded w-full text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-800',
        {
          'border-red-500 focus:border-red-500': !!errorsField,
          'bg-gray-300 cursor-not-allowed ': !!disabled,
        }
      )}
    />
  )
}
