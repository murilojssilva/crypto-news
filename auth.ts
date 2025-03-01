import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import db from './lib/db'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email', required: true },
        password: { label: 'Senha', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('E-mail e senha são obrigatórios.')
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        console.log('Usuário: ', user)

        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
          throw new Error('E-mail ou senha inválidos.')
        }

        return {
          id: user.id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id
      return session
    },
  },
  session: { strategy: 'jwt' },
  debug: true,
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    },
  },
}

// Definir a função POST como parte do export de rotas
export async function POST(req: NextRequest) {
  try {
    const nextApiReq = req as unknown as NextApiRequest
    const nextApiRes = req as unknown as NextApiResponse

    return await NextAuth(nextApiReq, nextApiRes, authConfig)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
