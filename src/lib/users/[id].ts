import axios from 'axios'

export const getUserById = async (id: string) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data
}

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`/api/users/${id}`)
    console.log('Usuário excluído com sucesso:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error)
    throw new Error('Erro ao excluir o usuário')
  }
}
