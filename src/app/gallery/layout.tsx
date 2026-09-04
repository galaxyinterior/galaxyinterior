import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore our portfolio of premium interior designs and turnkey projects.',
  openGraph: {
    title: 'Gallery | Galaxy Interior',
    description: 'Explore our portfolio of premium interior designs and turnkey projects.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
