import axios from 'axios'

export const getUsers = async () => {
  const response = await axios.get('/api/posts')
  return response.data
}
