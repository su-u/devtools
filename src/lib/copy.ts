import { Alert } from 'rsuite';

export const copy = (text?: string) => async () => {
  try {
    if (text) {
      await navigator.clipboard.writeText(text);
      Alert.success('コピーしました。');
    }
  } catch (e) {
    Alert.error('コピー出来ませんでした。');
  }
}