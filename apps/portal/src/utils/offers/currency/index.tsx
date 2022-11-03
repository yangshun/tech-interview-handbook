import type { Money } from '~/components/offers/types';

import { Currency } from './CurrencyEnum';

export const baseCurrencyString = Currency.USD.toString();

export function convertMoneyToString(money: Money | undefined) {
  if (!money) {
    return '-';
  }
  const { currency, value } = money;
  if (!value) {
    return '-';
  }
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    maximumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    minimumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    style: 'currency',
  });
  return `${formatter.format(value)}`;
}
