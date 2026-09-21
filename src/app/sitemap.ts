import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const toolPaths = [
  '/base64',
  '/character_count',
  '/character_replace',
  '/color_converter',
  '/date_diff',
  '/datetime_converter',
  '/diff',
  '/dummy',
  '/hash',
  '/image_generator',
  '/json_formatter',
  '/json_view',
  '/jwt_decoder',
  '/number_comma',
  '/punycode',
  '/radix_converter',
  '/unixtime_converter',
  '/urlencode',
  '/uuid',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...staticPages,
    ...toolPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
