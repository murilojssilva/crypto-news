import axios from 'axios'

export const getUserById = async (id: string) => {
  const response = await axios.get(`/api/users/${id}`)
  console.log('Response: ', response)
  return response.data
}
