import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: unknown
      role: unknown
    } & DefaultSession['user']
  }
}
