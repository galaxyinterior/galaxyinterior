import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interior Projects',
  description: 'Bespoke interior design services for luxury living spaces.',
  openGraph: {
    title: 'Interior Projects | Galaxy Interior',
    description: 'Bespoke interior design services for luxury living spaces.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
