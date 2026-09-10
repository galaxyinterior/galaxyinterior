import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Studio | Galaxy Interior India',
  description: 'Founded in 2021 by Shivashish Ranjan, Galaxy Interior delivers premium architectural design, turnkey civil construction, and bespoke interiors across Jharkhand, Bihar, and West Bengal.',
  openGraph: {
    title: 'About Our Studio | Galaxy Interior India',
    description: 'Founded in 2021 by Shivashish Ranjan, Galaxy Interior delivers premium architectural design, turnkey civil construction, and bespoke interiors across Jharkhand, Bihar, and West Bengal.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
