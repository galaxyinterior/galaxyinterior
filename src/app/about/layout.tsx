import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Galaxy Interior and our elite design philosophy.',
  openGraph: {
    title: 'About Us | Galaxy Interior',
    description: 'Learn more about Galaxy Interior and our elite design philosophy.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
