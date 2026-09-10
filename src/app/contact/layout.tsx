import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Studio Consultation | Galaxy Interior India',
  description: 'Schedule an architectural consultation or visit our regional studios in Ranchi, Bhagalpur, Patna, and Kolkata. Verified helpline: +91 70044 65611.',
  openGraph: {
    title: 'Contact Galaxy Interior India | Architecture, Interiors & Turnkey Build',
    description: 'Get in touch with our Principal Architects and Civil Engineers for residential builds across Jharkhand, Bihar, and West Bengal.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
