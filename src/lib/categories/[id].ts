import axios from 'axios'

export const getCategoryById = async (id: string) => {
  const response = await axios.get(`/api/posts/${id}/categories/`)
  return response.data
}
