import { DefaultSession, AdapterUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: unknown
      role: unknown
      plan: unknown
      firstName: unknown
      lastName: unknown
    } & DefaultSession['user']
  }

  interface User extends AdapterUser {
    role: string
    plan: string
    firstName: string
    lastName: string
  }
}
