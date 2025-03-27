import { CategoryProps } from './CategoryInterface'

export interface PostProps {
  id: string
  title: string
  subtitle?: string
  content: string
  published: boolean
  userId: string
  createdAt: string
  updatedAt: string
  categories: CategoryProps[]
}

export interface NewsItemProps {
  id: string
  title: string
  subtitle?: string
  content: string
  published: boolean
  userId: string
  createdAt: string
  updatedAt: string
  categories: CategoryProps[]
}

export interface NewsItem {
  id: string
  title: string
  subtitle?: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
  published: boolean
  categories: CategoryProps[]
}

export interface NewsPageItem {
  id: string
  title: string
  content: string
  subtitle: string
  userId: string
}

export interface LatestNewsProps {
  count: number
}
