import { useToaster, Message } from 'rsuite';

export const useCopy = () => {
  const toaster = useToaster();
  const PLACEMENT = 'bottomStart';

  const copy = (text?: string) => async () => {
    if (text.trim() === '') {
      toaster.push(
        <Message showIcon type="warning">
          コピーする内容がありません。
        </Message>,
        {
          placement: PLACEMENT,
        },
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toaster.push(
        <Message showIcon type="success">
          コピーしました。
        </Message>,
        {
          placement: PLACEMENT,
          duration: 1000,
        },
      );
    } catch (e) {
      toaster.push(
        <Message showIcon type="error">
          コピーに失敗しました。
        </Message>,
        {
          placement: PLACEMENT,
        },
      );
    }
  };

  return {
    copy,
  };
};
