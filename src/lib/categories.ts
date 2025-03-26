import axios from 'axios'

export const getCategories = async () => {
  const response = await axios.get('/api/categories')
  return response.data
}
