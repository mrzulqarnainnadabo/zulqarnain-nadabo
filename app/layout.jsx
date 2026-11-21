import './globals.css';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';

const serif = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: false,
});
const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const url = 'https://zulqarnain-nadabo.vercel.app';
const title = 'Zulqarnain Yusuf Nadabo | Institutional Architect & Digital Systems Strategist';
const description = 'Institutional architecture, digital systems and evidence-led development. Selected civic, enterprise and research work from Nigeria.';

export const metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: '%s | Zulqarnain Yusuf Nadabo',
  },
  description,
  applicationName: 'Zulqarnain Yusuf Nadabo',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url,
    title,
    description,
    siteName: 'Zulqarnain Yusuf Nadabo',
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: 'Zulqarnain Yusuf Nadabo — Institutional Architect & Digital Systems Strategist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport = { themeColor: '#0f2319', width: 'device-width', initialScale: 1 };

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (systemDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
