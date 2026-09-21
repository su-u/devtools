import React, { FC } from 'react';
import { HomePage } from '@/app/home/Home';
import { features } from '@/components/common/Features';
import { JsonLd } from '@/components/common/JsonLd';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata = {
  title: { absolute: `${SITE_NAME} - 無料の開発者向けWebツール集` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
};
const indexPage: FC = () => {
  const tools = features.flatMap((group) => group.items ?? []);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: '開発者向けWebツール一覧',
          numberOfItems: tools.length,
          itemListElement: tools.map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: tool.title,
            url: `${SITE_URL}${tool.path}`,
          })),
        }}
      />
      <HomePage />
    </>
  );
};

export default indexPage;
