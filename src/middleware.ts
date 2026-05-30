// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server'

// Rotas que requerem autenticação
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/register', '/']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('authToken')?.value

  // Se tem token e tenta acessar login/register, redireciona para dashboard
  if (token && publicRoutes.includes(pathname)) {
    if (pathname !== '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Se não tem token e tenta acessar rota protegida, redireciona para login
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
