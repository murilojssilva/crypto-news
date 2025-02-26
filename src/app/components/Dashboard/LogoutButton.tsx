'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/app/(auth)/(logout)/_actions/logout'
import { LogOutIcon } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className='flex flex-row items-center gap-3 text-sx p-2 rounded-xl text-gray-600 bg-gray-200 transition-all hover:bg-gray-300'
    >
      <LogOutIcon color='red' /> Sair
    </button>
  )
}
