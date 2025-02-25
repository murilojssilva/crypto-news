'use server'

import db from '../../../../../lib/db'
import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'

export default async function registerAction(data: {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}) {
  console.log('Data received in registerAction:', data) // Adicione isso

  if (
    !data ||
    typeof data !== 'object' ||
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.password
  ) {
    throw new Error('Todos os campos devem estar preenchidos')
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  try {
    await db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
    })

    return {
      success: true,
      message: 'Usuário criado com sucesso',
      redirect: '/',
    }
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { success: false, message: 'E-mail já cadastrado!' }
      }
    }

    return { success: false, message: 'Erro ao criar usuário' }
  }
}
