import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Facilities',
  description: 'State-of-the-art design facilities for architectural and interior planning.',
  openGraph: {
    title: 'Design Facilities | Galaxy Interior',
    description: 'State-of-the-art design facilities for architectural and interior planning.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
