// API from https://github.com/fawazahmed0/currency-api#readme
import fetch from 'cross-fetch';

export const convert = async (
  value: number,
  fromCurrency: string,
  toCurrency: string,
) => {
  fromCurrency = fromCurrency.trim().toLowerCase();
  toCurrency = toCurrency.trim().toLowerCase();

  return await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`,
  )
    .then((res) => res.json())
    .then((data) => value * data[fromCurrency][toCurrency]);
};

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

  // https://github.com/fawazahmed0/exchange-api
  // Format date to YYYY.M.D
  // const formattedDate = date.toJSON().substring(0, 10).replaceAll('-', '.');
  // TODO: Migrated API does not work with historical API yet, so we use latest for now.
  const formattedDate = 'latest';

  return await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/${fromCurrency}.json`,
  )
    .then((res) => res.json())
    .then((data) => value * data[toCurrency]);
};
