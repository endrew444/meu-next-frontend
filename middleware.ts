// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  // Se o usuário está tentando acessar o login/registro, mas já tem um token,
  // redireciona para a página de produtos.
  if (authToken && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  // Se o usuário está tentando acessar uma rota protegida (neste caso, '/products')
  // sem um token, redireciona para o login.
  if (!authToken && pathname.startsWith('/products')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// O 'matcher' define em quais rotas o middleware será executado.
export const config = {
  matcher: ['/products/:path*', '/login', '/register'],
};