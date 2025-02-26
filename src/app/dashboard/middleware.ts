// app/(dashboard)/middleware.ts

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // Verificar se o usuário tem um token JWT válido
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Se não houver token, redireciona para o login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Permitir acesso à página se o token existir
  return NextResponse.next()
}

// Definir as rotas que serão protegidas
export const config = {
  matcher: ['/app/(dashboard)/*'], // Protege todas as páginas dentro de (dashboard)
}
