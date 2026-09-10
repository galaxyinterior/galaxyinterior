import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Luxury Furniture & Artisanal Joinery | Galaxy Interior India',
  description:
    'Handcrafted custom beds, walk-in wardrobes, velvet sectionals, and Italian marble dining tables built to your exact room dimensions by Galaxy Interior India.',
  openGraph: {
    title: 'Bespoke Luxury Furniture & Artisanal Joinery | Galaxy Interior India',
    description:
      'Handcrafted custom beds, walk-in wardrobes, velvet sectionals, and Italian marble dining tables built to your exact room dimensions by Galaxy Interior India.',
    url: 'https://galaxyinteriorindia.com/furniture',
    siteName: 'Galaxy Interior India',
    images: [
      {
        url: '/generated/furniture_dining_table.png',
        width: 1200,
        height: 630,
        alt: 'Galaxy Interior Bespoke Luxury Furniture'
      }
    ]
  }
};

export default function FurnitureLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
