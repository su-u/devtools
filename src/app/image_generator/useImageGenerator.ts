import { useCallback, useState } from 'react';
import { getPresetSize } from '@/app/image_generator/presetSize';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

type ImageGeneratorForm = {
  wight: number;
  height: number;
  type: 'jpg' | 'png' | 'webp';
  tab: 'unsplash' | 'placehold';
};

export const DEFAULT_VALUES: ImageGeneratorForm = {
  wight: 256,
  height: 256,
  type: 'jpg',
  tab: 'unsplash',
};

export const SIZE_LIMIT = {
  min: 1,
  max: 5000,
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

  const onClickGenerate = useCallback(() => {
    const values = getValues();
    console.log({ values });
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

const createUnsplashURL = (values: ImageGeneratorForm) => {
  const { wight, height, type } = values;
  const params = new URLSearchParams({
    random: Math.random().toString(),
  });

  return `https://picsum.photos/${wight}/${height}.${type}?${params}`;
};

const createPlaceholdURL = (values: ImageGeneratorForm) => {
  const { wight, height, type } = values;

  return `https://placehold.jp/${wight}x${height}.${type}`;
};
