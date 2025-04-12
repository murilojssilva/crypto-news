'use client'

import { EyeSlash } from '@phosphor-icons/react'
import { Eye } from 'lucide-react'
import { useTheme } from 'next-themes'

interface EyeButtonProps {
  passwordType: 'password' | 'text'
  setPasswordType: (type: 'password' | 'text') => void
}

export default function EyeButton({
  passwordType,
  setPasswordType,
}: EyeButtonProps) {
  const { resolvedTheme } = useTheme()
  return (
    <button
      className={`absolute right-4 top-10
        ${resolvedTheme === 'light' ? 'text-gray-400' : 'text-gray-900'}
        `}
      type='button'
      onClick={() =>
        setPasswordType(passwordType === 'password' ? 'text' : 'password')
      }
    >
      {passwordType === 'password' ? (
        <Eye size={24} color={resolvedTheme === 'light' ? 'black' : 'white'} />
      ) : (
        <EyeSlash
          size={24}
          color={resolvedTheme === 'light' ? 'black' : 'white'}
        />
      )}
    </button>
  )
}
