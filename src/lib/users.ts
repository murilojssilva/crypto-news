import axios from 'axios'

export const getUsers = async (page = 1, limit = 10) => {
  const response = await axios.get('/api/users', {
    params: { page, limit },
  })
  return response.data
}
