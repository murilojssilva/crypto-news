'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserById } from '@/lib/users/[id]'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { getUsers } from '@/lib/users'
import { UserProps } from '@/app/interfaces/UserInterface'
import { Prisma } from '@prisma/client'

interface UsersContextType {
  users: UserProps[]
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  totalPages: number
  fetchUsers: () => Promise<void>
  fetchUserById: (id: string) => Promise<UserProps | null>
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserProps[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      fetchUserById(id as string)
    } else {
      console.log('ID do usuário está vazio ou inválido.')
    }
  }, [id])

  const fetchUserById = async (id: string): Promise<UserProps | null> => {
    if (!id) {
      console.error('ID do usuário não encontrado.')
      toast.error('ID do usuário não encontrado.')
      return null
    }

    try {
      setLoading(true)
      console.log(`Buscando usuário com ID: ${id}`)
      const response = await getUserById(id)
      if (!response) throw new Error('Usuário não encontrado')

      console.log('Usuário encontrado:', response)
      return response
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        toast.error(
          `Erro ao recuperar usuário. Detalhes: ${
            error.message || 'Tente novamente mais tarde.'
          }`
        )
      }

      return null
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)

    try {
      const data = await getUsers(page, 10)
      setUsers(data.users)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page])

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
        setLoading,
        setPage,
        page,
        totalPages,
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
