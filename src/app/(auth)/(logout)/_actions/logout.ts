'use server'

import { auth } from '../../../../../auth'
import { cookies } from 'next/headers'

export async function logout() {
  const session = await auth() // Obtém a sessão atual

  if (session) {
    cookies().delete('next-auth.session-token') // Remove o cookie da sessão
  }
}
