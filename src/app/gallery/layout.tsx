import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Ideas & Inspiration Archive | Galaxy Interior India',
  description:
    'Curated architectural design ideas, bespoke modular kitchens, living room salons, false ceilings, and luxury materials by Galaxy Interior India.',
  openGraph: {
    title: 'Design Ideas & Inspiration Archive | Galaxy Interior India',
    description:
      'Curated architectural design ideas, bespoke modular kitchens, living room salons, false ceilings, and luxury materials by Galaxy Interior India.',
    url: 'https://galaxyinteriorindia.com/gallery',
    siteName: 'Galaxy Interior India',
    images: [
      {
        url: '/generated/inspiration_modular_kitchen.jpg',
        width: 1200,
        height: 630,
        alt: 'Galaxy Interior Design Ideas & Inspiration'
      }
    ]
  }
};

export default function GalleryLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
