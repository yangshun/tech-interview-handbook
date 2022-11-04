// API from https://github.com/fawazahmed0/currency-api#readme
import fetch from 'cross-fetch';

export const convert = async (
  value: number,
  fromCurrency: string,
  toCurrency: string,
) => {
  fromCurrency = fromCurrency.trim().toLowerCase();
  toCurrency = toCurrency.trim().toLowerCase();
  const url = [
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies',
    fromCurrency,
    toCurrency,
  ].join('/');

  return await fetch(url + '.json')
    .then((res) => res.json())
    .then((data) => value * data[toCurrency]);
};
// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@{apiVersion}/{date}/{endpoint}

export const convertWithDate = async (
  value: number,
  fromCurrency: string,
  toCurrency: string,
  date: Date,
) => {
  if (new Date().toDateString === date.toDateString) {
    return await convert(value, fromCurrency, toCurrency);
  }

  fromCurrency = fromCurrency.trim().toLowerCase();
  toCurrency = toCurrency.trim().toLowerCase();

  // Format date to YYYY-MM-DD
  const formattedDate = date.toJSON().substring(0, 10);

  const url = [
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1',
    formattedDate,
    'currencies',
    fromCurrency,
    toCurrency,
  ].join('/');

  return await fetch(url + '.json')
    .then((res) => res.json())
    .then((data) => value * data[toCurrency]);
};
