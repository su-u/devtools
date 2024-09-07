import { useCallback, useState } from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type CharacterReplaceForm = {
  input: string;
  [key: string]: string;
};

const DEFAULT_VALUES: CharacterReplaceForm = {
  input: '',
};
const INPUT_LIMIT = {
  MIN: 1,
  MAX: 10,
};

export const useCharacterReplace = () => {
  const methods = useCustomForm<CharacterReplaceForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, setValue } = methods;
  const [inputCount, setInputCount] = useState(3);

  useFormPersistence('character_replace', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
  });

  // @ts-ignore
  const numberArray = [...Array(inputCount).keys()].map((i) => ++i);

  const input = watch('input', DEFAULT_VALUES.input);
  const output = numberArray.reduce((a, b) => {
    const targetRegex = watch(`target_${b}`)?.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&') ?? '';
    const replace = watch(`replace_${b}`)?.replace('\\n', '\n') ?? '';
    if (targetRegex === '') return a;

    return a?.replace(new RegExp(targetRegex, 'gm'), replace);
  }, input);

  const countUp = useCallback(() => {
    setInputCount((prev) => prev + 1);
  }, [setInputCount]);

  const countDown = useCallback(() => {
    setInputCount((prev) => prev - 1);
  }, [setInputCount]);

  const countDownDisabled = inputCount <= INPUT_LIMIT.MIN;
  const countUpDisabled = inputCount >= INPUT_LIMIT.MAX;

  return {
    methods,
    output,
    countUp,
    countDown,
    countDownDisabled,
    countUpDisabled,
    numberArray,
  };
};
