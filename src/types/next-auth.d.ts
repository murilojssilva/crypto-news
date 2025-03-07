import { DefaultSession, AdapterUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: unknown
      role: unknown
    } & DefaultSession['user']
  }

  interface User extends AdapterUser {
    role: string
  }
}
