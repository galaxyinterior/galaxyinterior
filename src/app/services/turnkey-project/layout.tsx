import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turnkey Projects',
  description: 'Complete turnkey construction solutions from concept to handover.',
  openGraph: {
    title: 'Turnkey Projects | Galaxy Interior',
    description: 'Complete turnkey construction solutions from concept to handover.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
