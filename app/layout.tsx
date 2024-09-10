// app/layout.tsx
import './globals.css'
import { GlobalProvider } from '@@/src/providers/GlobalContext';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import "@@/src/utils/script"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextThemes } from '@@/src/providers/NextThemes';

const APP_NAME = "Polres Utara AI";
const APP_DEFAULT_TITLE = "Polres Jakarta Utara AI";
const APP_TITLE_TEMPLATE = "%s - Utara AI";
const APP_DESCRIPTION = "Konek GPT Polres Jakarta Utara";
const KEYWORDS = ['Utara AI', 'Polres Jakarta Utara', 'Konek GPT', 'GAI']
const PUBLISHER = 'PT. Gerbang Artifisial Internusa'
const AUTHORS = [{ name: 'Zinedine Ziddan Fahdlevy', url: 'https://www.linkedin.com/in/zinedine-fahdlevy-5137471b4/' }]
const BASE_DOMAIN = process.env.BASE_DOMAIN ?? 'https://gai.co.id'
const IMAGEICON = '/logo.png'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  keywords: KEYWORDS,
  publisher: PUBLISHER,
  authors: AUTHORS,
  creator: 'Zinedine Ziddan Fahdlevy',
  // referrer: 'origin-when-cross-origin',
  referrer: "no-referrer-when-downgrade",
  // colorScheme: 'light dark',
  // themeColor: '#00526c',
  metadataBase: new URL(BASE_DOMAIN),
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: ['/icongen/apple-touch-icon.png'],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
    date: true,
    url: true
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    url: BASE_DOMAIN,
    images: [IMAGEICON],
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    images: [IMAGEICON],
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icongen/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/icongen/tile70x70.png"
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#00526c",
};


export default function RootLayout({
  children,
  params
}: {
  children: ReactNode,
  params: {
    lang: string
  }
}) {
  return (
      <html lang="en">
        <body>
          <ToastContainer />
          <GlobalProvider lang={params.lang}>
            <NextThemes>
              {children}
            </NextThemes>
          </GlobalProvider>
        </body>
      </html>
  );
}
