import axios from 'axios'

export const getPosts = async () => {
  const response = await axios.get('/api/posts')
  return response.data
}

export const createPost = async (newPost: {
  title: string
  subtitle?: string
  content: string
  published: boolean
  userId: string
}) => {
  const response = await axios.post('/api/posts', newPost)

  return response.data
}
