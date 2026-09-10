import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials | Galaxy Interior India',
  description: 'Read authentic reviews from homeowners across Ranchi, Patna, Kolkata, Bhagalpur, and Deoghar who built their luxury homes and turnkey residences with Galaxy Interior.',
  openGraph: {
    title: 'Client Testimonials | Galaxy Interior India',
    description: 'Verified reviews and project stories from 120+ homeowners across Eastern India.',
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
