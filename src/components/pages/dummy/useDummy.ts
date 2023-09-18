import { useCustomForm } from '@/components/common/Form/useCustomForm';

export const LANG_LIST = [
  {
    label: '日本語',
    value: 'ja',
  },
];

type CharacterCountForm = {
  input: string;
  separator: string;
};

export const useDummy = () => {
  const methods = useCustomForm<CharacterCountForm>();
  const { watch, control } = methods;

  const input = watch('input', '');
  const separator = watch('separator', '');
  const output = input;

  return {
    control,
    output,
  };
};
