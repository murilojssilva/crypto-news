'use client'

import { SessionProvider } from 'next-auth/react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PostsProvider } from '@/context/PostContext'
import { UsersProvider } from '@/context/UserContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <UsersProvider>
            <PostsProvider>{children}</PostsProvider>
          </UsersProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
