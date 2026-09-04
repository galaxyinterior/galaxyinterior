import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Galaxy Interior for your next luxury project.',
  openGraph: {
    title: 'Contact Us | Galaxy Interior',
    description: 'Get in touch with Galaxy Interior for your next luxury project.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
