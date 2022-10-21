// API from https://github.com/fawazahmed0/currency-api#readme
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
