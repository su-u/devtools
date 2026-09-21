import { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { ImageGenerator } from '@/app/image_generator/ImageGenerator';

const heading = '画像生成';
const description =
  'サイズや色、表示文字を指定してテスト用のダミー画像を生成できる無料ツールです。';

export const metadata = createPageMetadata({
  path: '/image_generator',
  title: 'ダミー画像生成',
  description,
  keywords: ['ダミー画像', '画像生成', 'プレースホルダー'],
});

const ImageGeneratorPage: FC = () => {
  return <ImageGenerator title={heading} description={description} />;
};

export default ImageGeneratorPage;
