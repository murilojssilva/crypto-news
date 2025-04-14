'use client'

import { SessionProvider } from 'next-auth/react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PostsProvider } from '@/context/PostContext'
import { UsersProvider } from '@/context/UserContext'
import { CategoryProvider } from '@/context/CategoryContext'
import { ThemeProvider } from 'next-themes'
import { MenuProvider } from '@/context/MenuContext'

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
    <html lang='pt-BR' suppressHydrationWarning>
      <title>CryptoNews</title>
      <link rel='icon' href='/logo.svg' sizes='any' />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <UsersProvider>
            <PostsProvider>
              <CategoryProvider>
                <ThemeProvider
                  attribute='class'
                  defaultTheme='dark'
                  disableTransitionOnChange
                >
                  <MenuProvider>{children}</MenuProvider>
                </ThemeProvider>
              </CategoryProvider>
            </PostsProvider>
          </UsersProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
