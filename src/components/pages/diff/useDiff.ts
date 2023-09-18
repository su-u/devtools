import { useCustomForm } from '@/components/common/Form/useCustomForm';

type DiffForm = {
  original: string;
  modified: string;
};

export const useDiff = () => {
  const methods = useCustomForm<DiffForm>({
    defaultValues: {
      original: '',
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
