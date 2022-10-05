import clsx from 'clsx';
import type { ForwardedRef, SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useId } from 'react';

type Attributes = Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  'disabled' | 'name' | 'onBlur' | 'onFocus' | 'required'
>;

export type SelectItem<T> = Readonly<{
  label: string;
  value: T;
}>;

export type SelectDisplay = 'block' | 'inline';

type Props<T> = Readonly<{
  defaultValue?: T;
  display?: SelectDisplay;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange?: (value: string) => void;
  options: ReadonlyArray<SelectItem<T>>;
  value?: T;
}> &
  Readonly<Attributes>;

function Select<T>(
  {
    defaultValue,
    display,
    disabled,
    label,
    isLabelHidden,
    options,
    value,
    onChange,
    ...props
  }: Props<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) {
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
        ref={ref}
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'focus:border-primary-500 focus:ring-primary-500 rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm',
          disabled && 'bg-slate-100',
        )}
        defaultValue={defaultValue != null ? String(defaultValue) : undefined}
        disabled={disabled}
        id={id}
        value={value != null ? String(value) : undefined}
        onChange={(event) => {
          onChange?.(event.target.value);
        }}
        {...props}>
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option key={String(optionValue)} value={String(optionValue)}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
