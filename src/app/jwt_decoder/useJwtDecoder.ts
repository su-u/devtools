import { decodeJwt, JwtResult } from '@/app/jwt_decoder/jwtDecoderLib';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type JwtForm = {
  input: string;
};

// jwt.io のサンプルトークン（初期表示用）
export const DEFAULT_VALUES: JwtForm = {
  input:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
    'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};

const EMPTY_RESULT: JwtResult = { header: '', payload: '', signature: '', timeClaims: [] };

export const useJwtDecoder = () => {
  const methods = useCustomForm<JwtForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, setValue } = methods;
  useFormPersistence('jwt_decoder', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
  });

  const input = watch('input', DEFAULT_VALUES.input);

  let result = EMPTY_RESULT;
  let error = '';
  if (input.trim() !== '') {
    try {
      result = decodeJwt(input);
    } catch (e) {
      error = e instanceof Error ? e.message : 'デコードに失敗しました。';
    }
  }

  return {
    methods,
    result,
    error,
  };
};
