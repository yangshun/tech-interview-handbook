import { Select } from '@tih/ui';

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthYear = Readonly<{
  month: Month;
  year: number;
}>;

type Props = Readonly<{
  onChange: (value: MonthYear) => void;
  value: MonthYear;
}>;

const MONTH_OPTIONS = [
  {
    label: 'January',
    value: 1,
  },
  {
    label: 'February',
    value: 2,
  },
  {
    label: 'March',
    value: 3,
  },
  {
    label: 'April',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'June',
    value: 6,
  },
  {
    label: 'July',
    value: 7,
  },
  {
    label: 'August',
    value: 8,
  },
  {
    label: 'September',
    value: 9,
  },
  {
    label: 'October',
    value: 10,
  },
  {
    label: 'November',
    value: 11,
  },
  {
    label: 'December',
    value: 12,
  },
];

const NUM_YEARS = 5;
const YEAR_OPTIONS = Array.from({ length: NUM_YEARS }, (_, i) => {
  const year = new Date().getFullYear() - NUM_YEARS + i + 1;
  return {
    label: String(year),
    value: year,
  };
});

export default function MonthYearPicker({ value, onChange }: Props) {
  return (
    <div className="flex space-x-4">
      <Select
        label="Month"
        options={MONTH_OPTIONS}
        value={value.month}
        onChange={(newMonth) =>
          onChange({ month: Number(newMonth) as Month, year: value.year })
        }
      />
      <Select
        label="Year"
        options={YEAR_OPTIONS}
        value={value.year}
        onChange={(newYear) =>
          onChange({ month: value.month, year: Number(newYear) })
        }
      />
    </div>
  );
}
