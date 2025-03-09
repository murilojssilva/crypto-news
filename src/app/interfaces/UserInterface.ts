import { PostProps } from './PostInterface'

export interface UserProps {
  id: string
  firstName: string
  lastName: string
  role: 'admin' | 'editor' | 'costumer'
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  posts: PostProps[]
  plan: 'free' | 'premium'
  startPremium?: Date
  endPremium?: Date
}

export interface UserCreateProps {
  firstName: string
  lastName: string
  role: 'admin' | 'editor' | 'costumer'
  email: string
  password: string

  plan: 'free' | 'premium'
  startPremium?: Date
  endPremium?: Date
}
