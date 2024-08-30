// app/layout.tsx
import './globals.css'
import { GlobalProvider } from '@@/src/providers/GlobalContext';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import "@@/src/utils/script"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextThemes } from '@@/src/providers/NextThemes';

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
        <body>
          <ToastContainer />
          <GlobalProvider>
            <NextThemes>
              {children}
              <div id="modal-root"></div>
            </NextThemes>
          </GlobalProvider>
        </body>
      </html>
  );
}
