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
  errorMessage?: string;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange?: (value: string) => void;
  options: ReadonlyArray<SelectItem<T>>;
  placeholder?: string;
  value?: T;
}> &
  Readonly<Attributes>;

const borderClasses: Record<SelectBorderStyle, string> = {
  bordered: 'border-slate-300',
  borderless: 'border-transparent bg-transparent',
};

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error:
    'border-danger-300 text-danger-900 placeholder-danger-300 focus:outline-none focus:ring-danger-500 focus:border-danger-500',
  normal: 'focus:border-primary-500 focus:ring-primary-500',
};

function Select<T>(
  {
    borderStyle = 'bordered',
    defaultValue,
    display,
    disabled,
    errorMessage,
    label,
    isLabelHidden,
    options,
    placeholder,
    required,
    value,
    onChange,
    ...props
  }: Props<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const hasError = errorMessage != null;
  const id = useId();
  const errorId = useId();
  const state: State = hasError ? 'error' : 'normal';

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
        aria-describedby={hasError ? errorId : undefined}
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none disabled:bg-slate-50 disabled:text-slate-500',
          stateClasses[state],
          borderClasses[borderStyle],
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
        {placeholder && (
          <option disabled={true} hidden={true} selected={true} value="">
            {placeholder}
          </option>
        )}
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option key={String(optionValue)} value={String(optionValue)}>
            {optionLabel}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="text-danger-600 mt-2 text-sm" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default forwardRef(Select);
