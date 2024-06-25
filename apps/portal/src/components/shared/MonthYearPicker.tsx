import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import { Select } from '~/ui';

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthYear = Readonly<{
  month: Month;
  year: number;
}>;

export type MonthYearOptional = Readonly<{
  month: Month | null;
  year: number | null;
}>;

type Props = Readonly<{
  className?: string;
  errorMessage?: string;
  monthLabel?: string;
  monthRequired?: boolean;
  onChange: (value: MonthYearOptional) => void;
  value: MonthYearOptional;
  yearLabel?: string;
  yearRequired?: boolean;
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

export default function MonthYearPicker({
  className,
  errorMessage,
  monthLabel = 'Month',
  value,
  onChange,
  yearLabel = 'Year',
  monthRequired = false,
  yearRequired = false,
}: Props) {
  const hasError = errorMessage != null;
  const errorId = useId();
  const [monthCounter, setMonthCounter] = useState<number>(0);
  const [yearCounter, setYearCounter] = useState<number>(0);

  useEffect(() => {
    if (value.month == null) {
      setMonthCounter((val) => val + 1);
    }

    if (value.year == null) {
      setYearCounter((val) => val + 1);
    }
  }, [value.month, value.year]);

  return (
    <div aria-describedby={hasError ? errorId : undefined}>
      <div className={clsx('flex items-end', className)}>
        <div className="grow">
          <Select
            key={`month:${monthCounter}`}
            display="block"
            label={monthLabel}
            options={MONTH_OPTIONS}
            placeholder="Select month"
            required={monthRequired}
            value={value.month}
            onChange={(newMonth) =>
              onChange({ month: Number(newMonth) as Month, year: value.year })
            }
          />
        </div>
        <div className="grow">
          <Select
            key={`year:${yearCounter}`}
            display="block"
            label={yearLabel}
            options={YEAR_OPTIONS}
            placeholder="Select year"
            required={yearRequired}
            value={value.year}
            onChange={(newYear) =>
              onChange({ month: value.month, year: Number(newYear) })
            }
          />
        </div>
      </div>
      {errorMessage && (
        <p className="text-danger-600 mt-2 text-sm" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
