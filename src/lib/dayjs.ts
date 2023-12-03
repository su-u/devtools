import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };
