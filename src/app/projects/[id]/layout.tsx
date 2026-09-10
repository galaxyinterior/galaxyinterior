import type { Metadata } from 'next';
import { getProjectByIdOrSlug } from '@/data/projectsCatalog';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectByIdOrSlug(id);

  if (!project) {
    return {
      title: 'Project Details | Galaxy Interior India',
      description: 'Explore landmark residential architecture and luxury interior projects by Galaxy Interior India.'
    };
  }

  return {
    title: `${project.title} | Galaxy Interior India`,
    description: `${project.subtitle} Located in ${project.location}. Scope: ${project.scope}.`,
    openGraph: {
      title: `${project.title} | Galaxy Interior India`,
      description: project.subtitle,
      url: `https://galaxyinteriorindia.com/projects/${project.id}`,
      siteName: 'Galaxy Interior India',
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    }
  };
}

export default function ProjectDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
