import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import db from './lib/db'
import bcrypt from 'bcryptjs'

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

        if (!user) {
          throw new Error('Usuário não encontrado.')
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValidPassword) {
          throw new Error('Senha incorreta. Verifique e tente novamente.')
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          plan: user.plan,
          firstName: user.firstName,
          lastName: user.lastName,
          endPremium: user.endPremium,
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
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.plan = user.plan
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.endPremium = user.endPremium
      }

      if (token.endPremium && new Date(token.endPremium as Date) < new Date()) {
        await db.user.update({
          where: { id: token.id as string },
          data: {
            plan: 'free',
          },
        })

        token.plan = 'free'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.role = token.role
        session.user.plan = token.plan
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.endPremium = token.endPremium
      }
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

export default NextAuth(authConfig)
