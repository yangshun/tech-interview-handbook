import { getMonth, getYear } from 'date-fns';

import type { MonthYear } from '~/components/shared/MonthYearPicker';

export function formatDate(value: Date | number | string) {
  const date = new Date(value);
  //   Const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.toLocaleString('default', { year: 'numeric' });
  return `${month} ${year}`;
}

export function formatMonthYear({ month, year }: MonthYear) {
  const monthString = month < 10 ? month.toString() : `0${month}`;
  const yearString = year.toString();
  return `${monthString}/${yearString}`;
}

export function getCurrentMonth() {
  return getMonth(Date.now());
}

export function getCurrentYear() {
  return getYear(Date.now());
}
