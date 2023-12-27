import { message } from 'antd';

export const useCopy = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const DURATION = 1;

  const copy = (text?: string) => async () => {
    if (!text || text.trim() === '') {
      messageApi.open({
        type: 'warning',
        content: 'コピーする内容がありません。',
        duration: DURATION,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      messageApi.open({
        type: 'success',
        content: 'コピーしました。',
        duration: DURATION,
      });
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'コピーに失敗しました。',
        duration: DURATION,
      });
    }
  };

  return {
    copy,
    contextHolder,
  };
};
