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
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.toLocaleString('default', { year: 'numeric' });
  return `${month} ${year}`;
}

export function getCurrentMonth() {
  // `getMonth` returns a zero-based month index
  return getMonth(Date.now()) + 1;
}

export function getCurrentYear() {
  return getYear(Date.now());
}

export function convertToMonthYear(date: Date) {
  return { month: date.getMonth() + 1, year: date.getFullYear() } as MonthYear;
}
