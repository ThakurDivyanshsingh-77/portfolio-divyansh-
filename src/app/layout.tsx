import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/global.css';
import macBackground1 from '../assets/images/mac-background1.jpg';
import macBackground2 from '../assets/images/mac-background2.jpg';
import macBackground3 from '../assets/images/mac-background3.jpg';
import { userConfig } from '../config';

const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:3000';
const metadataBase = new URL(siteUrl);
const ogImageUrl = new URL(macBackground1.src, metadataBase).toString();

export const metadata: Metadata = {
  metadataBase,
  title: userConfig.seo.title,
  description: userConfig.seo.description,
  keywords: [...userConfig.seo.keywords],
  authors: [{ name: userConfig.name }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
    title: userConfig.seo.title,
    description: userConfig.seo.description,
    siteName: userConfig.name,
    images: [{ url: ogImageUrl }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    apple:
      'https://github.com/ThakurDivyanshsingh-77.png',
    icon: [
      {
        url: 'https://github.com/ThakurDivyanshsingh-77.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://github.com/ThakurDivyanshsingh-77.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: userConfig.theme.secondaryColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: userConfig.name,
    description: userConfig.seo.description,
  };
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: userConfig.name,
    jobTitle: userConfig.role,
    url: userConfig.website,
    sameAs: [userConfig.social.github, userConfig.social.linkedin].filter(Boolean),
  };
  const preloadedBackgrounds = [macBackground1, macBackground2, macBackground3];

  return (
    <html
      lang="en"
      className="scroll-smooth selection:bg-gray-900 selection:text-white overflow-x-hidden"
    >
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="msapplication-TileColor" content={userConfig.theme.secondaryColor} />
        <link rel="sitemap" href="/sitemap.xml" />
        {preloadedBackgrounds.map((bg) => (
          <link key={bg.src} rel="preload" href={bg.src} as="image" fetchPriority="high" />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="overflow-x-hidden bg-gray-900">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
