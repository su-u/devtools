import { useCustomForm } from '@/components/common/Form/useCustomForm';

type DiffForm = {
  original: string;
  modified: string;
};

export const useDiff = () => {
  const methods = useCustomForm<DiffForm>({
    defaultValues: {
      // 10行の空白
      original: `
      
      
      
      
      
      
      
      
      
      `,
      modified: '',
    },
  });
  const { watch } = methods;

  const original = watch('original', '');
  const modified = watch('modified', '');

  return {
    methods,
    original,
    modified,
  };
};
