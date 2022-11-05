import { getMonth, getYear } from 'date-fns';

import type { MonthYear } from '~/components/shared/MonthYearPicker';

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

export function getDurationDisplayText(months: number) {
  const years = Math.floor(months / 12);
  const monthsRemainder = months % 12;
  let durationDisplay = '';
  if (years > 0) {
    durationDisplay = `${years} year${years > 1 ? 's' : ''}`;
  }
  if (monthsRemainder > 0) {
    durationDisplay = durationDisplay.concat(
      ` ${monthsRemainder} month${monthsRemainder > 1 ? 's' : ''}`,
    );
  }
  return durationDisplay;
}
