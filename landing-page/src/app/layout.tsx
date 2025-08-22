import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Waltzes - Create Professional Resumes with AI',
  description:
    'Build ATS-friendly resumes that stand out. Powered by AI, designed for success. Create your professional resume with Waltzes today.',
  keywords: [
    'resume builder',
    'AI resume',
    'professional resume',
    'ATS-friendly resume',
    'CV maker',
  ],
  openGraph: {
    title: 'Waltzes - Create Professional Resumes with AI',
    description:
      'Build ATS-friendly resumes that stand out. Powered by AI, designed for success.',
    url: 'https://waltzyourway.com',
    siteName: 'Waltzes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waltzes - Create Professional Resumes with AI',
    description:
      'Build ATS-friendly resumes that stand out. Powered by AI, designed for success.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      </head>
      <Script
        id="umami-analytics"
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
      />
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
