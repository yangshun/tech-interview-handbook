import clsx from 'clsx';
import { useId } from 'react';

export type SelectItem<T> = Readonly<{
  label: string;
  value: T;
}>;

export type SelectDisplay = 'block' | 'inline';

type Props<T> = Readonly<{
  display?: SelectDisplay;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<SelectItem<T>>;
  value: T;
}>;

export default function Select<T>({
  display,
  label,
  isLabelHidden,
  name,
  options,
  value,
  onChange,
}: Props<T>) {
  const id = useId();

  return (
    <div>
      <label
        className={clsx(
          'mb-1 block text-sm font-medium text-slate-700',
          isLabelHidden && 'sr-only',
        )}
        htmlFor={id ?? undefined}>
        {label}
      </label>
      <select
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'focus:border-primary-500 focus:ring-primary-500 rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm',
        )}
        id={id}
        name={name ?? undefined}
        value={String(value)}
        onChange={(event) => {
          onChange(event.target.value);
        }}>
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option key={String(optionValue)} value={String(optionValue)}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
