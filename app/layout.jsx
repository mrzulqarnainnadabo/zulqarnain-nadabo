import './globals.css';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';

// next/font self-hosts these at build time: no layout shift, no external request at runtime.
const serif = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const url = 'https://zulqarnain-nadabo.vercel.app';
const title = 'Ambassador Zulqarnain Yusuf Nadabo | ISEYC · Hubil Group';
const description =
  'National President of ISEYC and Managing Director of Hubil Group. Builds civic information systems and enterprise systems. Abuja, Nigeria.';

export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'profile', url, title, description, images: ['/zulqarnain.jpg'] },
  twitter: { card: 'summary', title, description, images: ['/zulqarnain.jpg'] },
};

export const viewport = { themeColor: '#0f2319' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
