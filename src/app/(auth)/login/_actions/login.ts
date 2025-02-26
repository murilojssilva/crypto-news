'use server'

import bcrypt from 'bcryptjs'
import db from '../../../../../lib/db'

export default async function loginAction(data: {
  email: string
  password: string
}) {
  if (!data || !data.email || !data.password) {
    throw new Error('E-mail e senha são obrigatórios')
  }

  try {
    const user = await db.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      return { success: false, message: 'Usuário não encontrado' }
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) {
      return { success: false, message: 'Senha incorreta' }
    }

    return { success: true, message: 'Login bem-sucedido', userId: user.id }
  } catch (error: unknown) {
    console.error('Erro ao tentar autenticar o usuário', error)
    return { success: false, message: 'Erro ao tentar autenticar' }
  }
}
