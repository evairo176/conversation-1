import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Jendela Digital', // Judul default jika tidak ada judul lain
    template: '%s | Jendela Digital' // Template untuk halaman lain
  },
  description: 'Cepat, nyaman dan mudah'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${lato.className}`} suppressHydrationWarning>
      <body className={'overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <Providers>
            <Toaster richColors closeButton position='top-center' />
            {children}
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
