import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Discover our comprehensive range of interior design and construction services.',
  openGraph: {
    title: 'Our Services | Galaxy Interior',
    description: 'Discover our comprehensive range of interior design and construction services.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
