'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider } from 'next-auth/react';
import ReduxProvider from '../providers/redux-provider';
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <SessionProvider>
          <ReduxProvider>{children} </ReduxProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
