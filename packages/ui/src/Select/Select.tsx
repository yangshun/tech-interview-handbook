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
export type SelectBorderStyle = 'bordered' | 'borderless';

type Props<T> = Readonly<{
  borderStyle?: SelectBorderStyle;
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

const borderClasses: Record<SelectBorderStyle, string> = {
  bordered: 'border-slate-300',
  borderless: 'border-transparent bg-transparent',
};

function Select<T>(
  {
    borderStyle = 'bordered',
    defaultValue,
    display,
    disabled,
    label,
    isLabelHidden,
    options,
    required,
    value,
    onChange,
    ...props
  }: Props<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const id = useId();

  return (
    <div>
      {!isLabelHidden && (
        <label
          className={clsx('mb-1 block text-sm font-medium text-slate-700')}
          htmlFor={id ?? undefined}>
          {label}
          {required && (
            <span aria-hidden="true" className="text-danger-500">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      <select
        ref={ref}
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'focus:border-primary-500 focus:ring-primary-500 rounded-md py-2 pl-3 pr-8 text-base focus:outline-none sm:text-sm',
          borderClasses[borderStyle],
          disabled && 'bg-slate-100',
        )}
        defaultValue={defaultValue != null ? String(defaultValue) : undefined}
        disabled={disabled}
        id={id}
        required={required}
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
