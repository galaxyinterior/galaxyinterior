import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Portfolio & Landmarks | Galaxy Interior India',
  description:
    'Explore completed luxury villas, bespoke residential interiors, and turnkey architectural landmarks across Jharkhand, Bihar, and West Bengal by Galaxy Interior.',
  openGraph: {
    title: 'Architectural Portfolio & Landmarks | Galaxy Interior India',
    description:
      'Explore completed luxury villas, bespoke residential interiors, and turnkey architectural landmarks across Jharkhand, Bihar, and West Bengal by Galaxy Interior.',
    url: 'https://galaxyinteriorindia.com/projects',
    siteName: 'Galaxy Interior India',
    images: [
      {
        url: '/generated/legacy_villa.png',
        width: 1200,
        height: 630,
        alt: 'Galaxy Interior Architectural Portfolio'
      }
    ]
  }
};

export default function ProjectsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
