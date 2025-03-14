import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // console.log('Middleware is running:', pathname);
  // console.log('Token:', token ? '✅ User is logged in' : '❌ No token');

  // Jika user tidak memiliki token, lempar ke /login, kecuali jika sudah di halaman login atau register
  if (!token) {
    if (pathname !== '/login' && pathname !== '/register') {
      // console.log('User not logged in, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  // Jika user memiliki token dan mencoba akses halaman login atau register, arahkan ke dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    // console.log('User already logged in, redirecting to /dashboard/overview');
    return NextResponse.redirect(new URL('/chat-gpt', req.url));
  }

  const url = req.nextUrl;

  // Periksa apakah URL yang diakses adalah "/dashboard/pos" tanpa query "cat"
  if (url.pathname === '/dashboard/pos' && !url.searchParams.has('cat')) {
    url.searchParams.set('cat', 'all'); // Tambahkan query parameter
    return NextResponse.redirect(url); // Redirect ke URL yang sudah diubah
  }

  return NextResponse.next();
}

// Middleware hanya berjalan pada halaman tertentu
export const config = {
  matcher: [
    '/dashboard/:path*', // Semua halaman di dalam /dashboard
    '/chat-gpt', // Semua halaman di dalam /dashboard
    '/',
    '/login',
    '/register'
  ]
};
