import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        email: { label: 'E-mail', type: 'email', required: true },
        password: { label: 'Senha', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('E-mail e senha são obrigatórios')
        }

        if (credentials.password === '123456') {
          return {
            id: '1',
            name: 'Murilo',
            email: String(credentials.email), // Garante que o email é string
          }
        }

        return null
      },
    }),
  ],
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig)
