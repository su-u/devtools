import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);

export { dayjs };
