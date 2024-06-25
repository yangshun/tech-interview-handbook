import { Select } from '~/ui';

import { Currency } from '~/utils/offers/currency/CurrencyEnum';

const currencyOptions = Object.entries(Currency).map(([key, value]) => ({
  label: key,
  value,
}));

type Props = Readonly<{
  handleCurrencyChange: (currency: string) => void;
  selectedCurrency: string;
}>;

export default function CurrencySelector({
  selectedCurrency,
  handleCurrencyChange,
}: Props) {
  return (
    <Select
      display="inline"
      isLabelHidden={true}
      label="Currency"
      name=""
      options={currencyOptions}
      value={selectedCurrency}
      onChange={(currency: string) => handleCurrencyChange(currency)}
    />
  );
}
