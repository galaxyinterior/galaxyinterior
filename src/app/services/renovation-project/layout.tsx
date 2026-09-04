import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renovation Projects',
  description: 'Premium renovation and remodeling services for your home.',
  openGraph: {
    title: 'Renovation Projects | Galaxy Interior',
    description: 'Premium renovation and remodeling services for your home.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
