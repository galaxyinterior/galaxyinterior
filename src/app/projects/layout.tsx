import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse through our completed luxury homes and bespoke interiors.',
  openGraph: {
    title: 'Projects | Galaxy Interior',
    description: 'Browse through our completed luxury homes and bespoke interiors.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
