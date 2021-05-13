import dayjs from 'dayjs';

const dateRange = [{
  start: '2018-12-31',
  end: '2019-12-31'
},
  {
    start: '2019-12-31',
    end: '2020-12-31'
  },
  {
    start: '2020-12-31',
    end: '2021-12-31'
  }
];

export const entaiCalculate = (yen: string, d1, d2) => {
  const cheep = daysPerYear(d1, dayjs(d1).add(2, 'month'))
  const high = daysPerYear(dayjs(d1).add(2, 'month'), d2);

  console.log(cheep);
  console.log(high);

  return (parseInt(yen, 10) + 1100).toString();
};

const daysPerYear = (d1, d2) => {
  const daysPerYear = {};
  for (const d of dateRange) {
    const diffFrom = dayjs(d1).isAfter(d.start) ? dayjs(d1) : dayjs(d.start);
    const diffTo = dayjs(d2).isAfter(d.end) ? dayjs(d.end) : dayjs(d2);
    const da = diffTo.diff(diffFrom, 'days');
    daysPerYear[dayjs(d.start).add(1, 'year').format('YYYY')] = da > 0 ? da : 0;
    // console.log(`${diffFrom.format()} - ${diffTo.format()} = ${da}`);
  }
  return daysPerYear;
}
