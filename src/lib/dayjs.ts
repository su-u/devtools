import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import timezone from 'dayjs/plugin/timezone';
dayjs.locale(ja);
dayjs.extend(timezone);

export { dayjs };