// app/layout.tsx
import './globals.css'
import { GlobalProvider } from '@@/src/context/GlobalContext';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import "@@/src/utils/script"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={inter.className}>
        <ToastContainer />
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
