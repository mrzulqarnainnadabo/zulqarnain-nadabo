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
const description = 'Zulqarnain Yusuf Nadabo builds civic information systems, enterprise tools and evidence-led institutional infrastructure in Nigeria. Explore selected work and professional background.';
const personId = `${url}/#person`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Zulqarnain Yusuf Nadabo',
      url: `${url}/`,
      jobTitle: 'Institutional Architect & Digital Systems Strategist',
      description: 'Institutional architect and digital systems strategist working across civic information systems, enterprise tools and evidence-led development in Nigeria. National President of ISEYC and Managing Director of Hubil Group.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NG',
      },
      sameAs: [
        'https://www.linkedin.com/in/amb-zulqarnain-yusuf-9b04b0124/',
        'https://github.com/mrzulqarnainnadabo',
        'https://x.com/nain_nadabo',
      ],
      knowsAbout: [
        'Institutional architecture',
        'Digital systems strategy',
        'Civic intelligence',
        'Geographical information',
        'Sustainability studies',
        'Evidence-led development',
      ],
      affiliation: [
        { '@type': 'Organization', name: 'Initiative for Sustainable Evolution for Youth and Community (ISEYC)' },
        { '@type': 'Organization', name: 'Hubil Group' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      url: `${url}/`,
      name: 'Zulqarnain Yusuf Nadabo',
      description,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${url}/#profile`,
      url: `${url}/`,
      name: title,
      mainEntity: { '@id': personId },
      isPartOf: { '@id': `${url}/#website` },
    },
  ],
};

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
    url: `${url}/`,
    title,
    description,
    siteName: 'Zulqarnain Yusuf Nadabo',
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: 'Zulqarnain Yusuf Nadabo, Institutional Architect and Digital Systems Strategist' }],
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
