import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';

type characterCountForm = {
  input: string;
  [key: string]: string;
};

export const useCharacterReplace = () => {
  const { control, watch, setValue, reset } = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const [inputCount, setInputCount] = useState(3);

  // @ts-ignore
  const numberArray = [...Array(inputCount).keys()].map((i) => ++i);

  const input = watch('input') ?? '';
  const output = numberArray.reduce((a, b) => {
    const targetRegex = watch(`target_${b}`)?.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&') ?? '';
    const replace = watch(`replace_${b}`)?.replace('\\n', '\n') ?? '';
    if (targetRegex === '') return a;

    return a?.replace(new RegExp(targetRegex, 'gm'), replace);
  }, input);

  const onClickInputClear = useCallback(() => {
    reset({
      input: '',
    });
  }, [reset]);

  const countUp = useCallback(() => {
    setInputCount((prev) => prev + 1);
  }, []);

  const countDown = useCallback(() => {
    setInputCount((prev) => prev - 1);
  }, []);

  const countDownDisabled = inputCount <= 1;
  const countUpDisabled = inputCount >= 50;

  return {
    control,
    output,
    countUp,
    countDown,
    countDownDisabled,
    countUpDisabled,
    numberArray,
    onClickInputClear,
  };
};
