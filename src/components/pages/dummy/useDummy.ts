import { useForm } from 'react-hook-form';

export const LANG_LIST = [
  {
    label: '日本語',
    value: 'ja'
  }
]

type characterCountForm = {
  input: string;
  separator: string;
};

export const useDummy = () => {
  const methods = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { watch, control } = methods;

  const input = watch('input') ?? '';
  const separator = watch('separator') ?? ',';
  const output = input;


  return {
    control,
    output,
  };
};
