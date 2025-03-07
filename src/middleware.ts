/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookies = request.cookies
  const sessionToken = cookies.get('next-auth.session-token')

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    if (request.nextUrl.pathname.startsWith('/dashboard/posts')) {
      const session = request.cookies.get('next-auth.session-token') as any

      if (session) {
        const userRole = session?.user?.role

        if (userRole === 'costumer') {
          const dashboardUrl = new URL('/dashboard', request.url)
          return NextResponse.redirect(dashboardUrl)
        }
      }
    }
  }

  if (
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup')) &&
    sessionToken
  ) {
    console.log('Usuário já está logado')
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}
