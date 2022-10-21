import { getMonth, getYear } from 'date-fns';

import type { MonthYear } from '~/components/shared/MonthYearPicker';

export function timeSinceNow(date: Date | number | string) {
  const seconds = Math.floor(
    new Date().getTime() / 1000 - new Date(date).getTime() / 1000,
  );
  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(interval)} seconds`;
}

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
