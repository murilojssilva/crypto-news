import axios from 'axios'

export const getPostById = async (id: string) => {
  console.log('ID do post getPostById: ', id)
  const response = await axios.get(`/api/posts/${id}`)
  console.log('Response: ', response)
  return response.data
}

export const deletePost = async (id: string) => {
  try {
    const response = await axios.delete(`/api/posts/${id}`)
    console.log('Post excluído com sucesso:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir o post:', error)
    throw new Error('Erro ao excluir o post')
  }
}
