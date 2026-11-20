import type { Metadata, Viewport } from 'next';
import { Baloo_2, Caveat, DM_Sans } from 'next/font/google';
import './globals.css';

const display = Baloo_2({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
});

const title = 'Happy Birthday';
const description = 'Ucapan ulang tahun berisi doa, semangat, dan harapan baik untuk perjalanan hidup, kuliah, serta skripsi.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002'),
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'id_ID',
    siteName: 'Happy Birthday',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fffaf6',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
