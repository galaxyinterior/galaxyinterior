import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/login', '/register'],
    },
    sitemap: 'https://galaxyinteriorindia.com/sitemap.xml',
  };
}
