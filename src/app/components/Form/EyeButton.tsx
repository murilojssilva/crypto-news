'use client'

import { EyeSlash } from '@phosphor-icons/react'
import { Eye } from 'lucide-react'

interface EyeButtonProps {
  passwordType: 'password' | 'text'
  setPasswordType: (type: 'password' | 'text') => void
}

export default function EyeButton({
  passwordType,
  setPasswordType,
}: EyeButtonProps) {
  return (
    <button
      className='absolute right-4 top-10 text-gray-400'
      type='button'
      onClick={() =>
        setPasswordType(passwordType === 'password' ? 'text' : 'password')
      }
    >
      {passwordType === 'password' ? (
        <Eye size={24} color='black' />
      ) : (
        <EyeSlash size={24} color='black' />
      )}
    </button>
  )
}
