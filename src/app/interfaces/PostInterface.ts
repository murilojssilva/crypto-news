export interface PostProps {
  id: string
  title: string
  subtitle?: string
  content: string
  published: boolean
  written_by: string
  createdAt: string
  updatedAt: string
}

export interface NewsItemProps {
  id: string
  title: string
  subtitle?: string
  content: string
  published: boolean
  writtenBy: string
  createdAt: string
  updatedAt: string
}

export interface NewsItem {
  id: string
  title: string
  content: string
  written_by: string
  createdAt: string
}

export interface NewsPageItem {
  id: string
  title: string
  content: string
  subtitle: string
  writtenBy: string
}
