import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };