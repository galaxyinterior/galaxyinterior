import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import TargetCursor from '@/components/TargetCursor';
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | Galaxy Interior',
    default: 'Galaxy Interior - Elite Living Redefined',
  },
  description: 'Premium interior design and turnkey construction firm. We build luxury homes and design bespoke interiors from concept to handover.',
  keywords: ['Interior Design', 'Turnkey Construction', 'Luxury Homes', 'Home Renovation', 'Architectural Planning', 'Galaxy Interior'],
  authors: [{ name: 'Galaxy Interior' }],
  creator: 'Galaxy Interior',
  metadataBase: new URL('https://galaxyinterior.in'), // Replace with actual domain when ready
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://galaxyinterior.in',
    title: 'Galaxy Interior - Elite Living Redefined',
    description: 'Premium interior design and turnkey construction firm. We build luxury homes and design bespoke interiors from concept to handover.',
    siteName: 'Galaxy Interior',
    images: [
      {
        url: '/logo.png', // Fallback to logo if page doesn't specify OG image
        width: 1200,
        height: 630,
        alt: 'Galaxy Interior Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Galaxy Interior',
    image: 'https://galaxyinterior.in/logo.png',
    '@id': 'https://galaxyinterior.in',
    url: 'https://galaxyinterior.in',
    telephone: '+919999999999',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Elite Avenue',
      addressLocality: 'Mumbai',
      postalCode: '400001',
      addressCountry: 'IN',
    },
    priceRange: '$$$',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans bg-white`}>
        {/* Single global TargetCursor instance — shared across all pages */}
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
          targetSelector="button, a, .cursor-target, select, input, .faq-item"
        />

        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-[104px]">
            {children}
          </main>
          <Footer />
        </AuthProvider>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919631980881"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-8 right-8 z-50 group"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full scale-150 blur-xl group-hover:scale-175 transition-transform duration-300"></div>
          <div className="relative bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>
        </a>

      </body>
    </html>
  );
}
