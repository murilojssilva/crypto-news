'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCategories } from '@/lib/categories' // Ajuste conforme necessário
import { CategoryProps } from '@/app/interfaces/CategoryInterface'

interface CategoryContextType {
  categories: CategoryProps[]
  loading: boolean
  error: string | null
  fetchCategories: () => Promise<void>
}

interface CategoryProviderProps {
  children: React.ReactNode
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
)

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const categoriesData = await getCategories()
      setCategories(categoriesData)

      console.log({ categoriesData })
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      setError('Erro ao carregar categorias')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, loading, error, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategories = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error(
      'useCategories deve ser usado dentro de um CategoryProvider'
    )
  }
  return context
}
