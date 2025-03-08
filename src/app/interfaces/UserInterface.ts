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
}
