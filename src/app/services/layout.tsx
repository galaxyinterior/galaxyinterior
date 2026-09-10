import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural & Interior Services | Galaxy Interior India',
  description: 'Comprehensive residential architecture, turnkey civil construction, 3D photorealistic design, and bespoke interior execution across Jharkhand, Bihar, and West Bengal.',
  openGraph: {
    title: 'Architectural & Interior Services | Galaxy Interior India',
    description: 'Comprehensive residential architecture, turnkey civil construction, 3D photorealistic design, and bespoke interior execution across Jharkhand, Bihar, and West Bengal.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
