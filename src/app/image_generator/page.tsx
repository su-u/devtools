import { FC } from 'react';
import { ImageGenerator } from '@/app/image_generator/ImageGenerator';

export const metadata = {
  title: 'Dev Toolkit - 画像生成',
};

const ImageGeneratorPage: FC = () => {
  return <ImageGenerator />;
};

export default ImageGeneratorPage;
