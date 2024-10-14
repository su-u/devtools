import type { Color } from 'antd/es/color-picker';
import { AggregationColor } from 'antd/es/color-picker/color';
import { useCallback, useState } from 'react';
import { getPresetSize } from '@/app/image_generator/presetSize';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type ImageGeneratorForm = {
  wight: number;
  height: number;
  type: 'jpg' | 'png' | 'webp';
  bgColor: Color | undefined;
  textColor: Color | undefined;
  tab: 'unsplash' | 'placehold';
  text: string;
  textSize: number | undefined;
};

export const DEFAULT_VALUES: ImageGeneratorForm = {
  wight: 256,
  height: 256,
  type: 'jpg',
  bgColor: new AggregationColor('ffffff'),
  textColor: new AggregationColor('1668dc'),
  tab: 'unsplash',
  text: '',
  textSize: undefined,
};

export const IMG_SIZE_LIMIT = {
  min: 1,
  max: 5000,
};

export const TEXT_SIZE_LIMIT = {
  min: 1,
  max: 999,
};

export const UNSPLASH_FILE_TYPES = [
  {
    label: 'JPG',
    value: 'jpg',
  },
  {
    label: 'Webp',
    value: 'webp',
  },
];

export const PLACEHOLD_FILE_TYPES = [
  {
    label: 'JPG',
    value: 'jpg',
  },
  {
    label: 'PNG',
    value: 'png',
  },
];

export const useImageGenerator = () => {
  const methods = useCustomForm<ImageGeneratorForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { getValues, setValue } = methods;
  const [src, setSrc] = useState('');

  useFormPersistence('image_generator', methods, (defaultValues) => {
    setValue('wight', defaultValues?.wight);
    setValue('height', defaultValues?.height);
    setValue('type', defaultValues?.type);
    setValue('bgColor', defaultValues?.bgColor);
    setValue('textColor', defaultValues?.textColor);
    setValue('tab', defaultValues?.tab);
    setValue('text', defaultValues?.text);
    setValue('textSize', defaultValues?.textSize);
  });
  const onClickGenerate = useCallback(() => {
    const values = getValues();
    switch (values.tab) {
      case 'unsplash':
        setSrc(createUnsplashURL(values));
        break;
      case 'placehold':
        setSrc(createPlaceholdURL(values));
        break;
    }
  }, [getValues]);

  const onSelectPreset = useCallback(
    (value: string) => {
      const { width, height } = getPresetSize(value);

      setValue('wight', width);
      setValue('height', height);
    },
    [setValue],
  );

  const onChangeTab = useCallback(
    (key: ImageGeneratorForm['tab']) => {
      setValue('tab', key);

      const { type } = getValues();
      if (type === 'webp') {
        setValue('type', DEFAULT_VALUES.type);
      }
    },
    [setValue, getValues],
  );

  return {
    methods,
    src,
    onClickGenerate,
    onSelectPreset,
    onChangeTab,
  };
};

// https://picsum.photos/
const createUnsplashURL = (values: ImageGeneratorForm) => {
  const { wight, height, type } = values;
  const params = new URLSearchParams({
    random: Math.random().toString(),
  });

  const url = `https://picsum.photos/${wight}/${height}.${type}?${params}`;
  // console.log(url);
  return url;
};

// https://placehold.jp/
const createPlaceholdURL = (values: ImageGeneratorForm) => {
  const { wight, height, type, textColor, bgColor, text, textSize } = values;
  const textSizePath = textSize ? `/${textSize}` : '';
  const bgColorPath = bgColor ? `/${bgColor.toHex()}` : '';
  const textColorPath = textColor ? `/${textColor.toHex()}` : '';

  const params = new URLSearchParams({
    text,
  });

  return `https://placehold.jp${textSizePath}${bgColorPath}${textColorPath}/${wight}x${height}.${type}?${params}`;
};
