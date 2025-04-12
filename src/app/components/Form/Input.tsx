import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorsField: string
}

export default function Input({ errorsField, disabled, ...props }: InputProps) {
  const { resolvedTheme } = useTheme()
  return (
    <input
      {...props}
      className={clsx(
        'border p-2 rounded w-full outline-none border-gray-400 ',
        {
          'border-red-500 focus:border-red-500': !!errorsField,
          'cursor-not-allowed ': !!disabled,
          'text-gray-400 bg-gray-900': resolvedTheme !== 'light' && !!disabled,
          'text-gray-100 bg-gray-300': resolvedTheme === 'light' && !!disabled,
          'text-gray-800 placeholder:text-gray-600 bg-gray-100 focus:border-blue-800':
            resolvedTheme === 'light',
          'text-gray-200 placeholder:text-gray-100 bg-gray-800 focus:border-blue-400':
            resolvedTheme !== 'light',
        }
      )}
    />
  )
}
