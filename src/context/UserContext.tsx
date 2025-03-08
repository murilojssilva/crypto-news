'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserById } from '@/lib/users/[id]'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { getUsers } from '@/lib/users'
import { UserProps } from '@/app/interfaces/UserInterface'

interface UsersContextType {
  users: UserProps[]
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  fetchUsers: () => Promise<void>
  fetchUserById: (id: string) => Promise<UserProps | null>
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserProps[]>([])
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      fetchUserById(id as string)
    }
  }, [id])

  const fetchUserById = async (id: string): Promise<UserProps | null> => {
    if (!id) {
      console.error('ID do user não encontrado.')
      return null
    }

    try {
      setLoading(true)
      const response = await getUserById(id)
      if (!response) throw new Error('Usuário não encontrado')
      return response
    } catch (error) {
      console.error('Erro ao buscar user:', error)
      toast.error('Erro ao recuperar useragens. Tente novamente mais tarde.')
      return null
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)

    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
        setLoading,
        fetchUserById,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers deve ser usado dentro de um UsersProvider')
  }
  return context
}
