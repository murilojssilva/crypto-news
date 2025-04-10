import axios from 'axios'

export const getPosts = async (page = 1, limit = 10) => {
  const response = await axios.get('/api/posts', {
    params: { page, limit },
  })
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
