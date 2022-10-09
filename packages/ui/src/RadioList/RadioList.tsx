import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useId } from 'react';

import { RadioListContext } from './RadioListContext';
import RadioListItem from './RadioListItem';

export type RadioListOrientation = 'horizontal' | 'vertical';

type Props<T> = Readonly<{
  children: ReadonlyArray<React.ReactElement<typeof RadioListItem>>;
  defaultValue?: T;
  description?: string;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void;
  orientation?: RadioListOrientation;
  required?: boolean;
  value?: T;
}>;

RadioList.Item = RadioListItem;

export default function RadioList<T>({
  children,
  defaultValue,
  description,
  isLabelHidden,
  name,
  orientation = 'vertical',
  label,
  required,
  value,
  onChange,
}: Props<T>) {
  const labelId = useId();
  return (
    <RadioListContext.Provider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO: Figure out how to type the onChange.
      value={{ defaultValue, name, onChange, value }}>
      <div>
        <div className={clsx(isLabelHidden ? 'sr-only' : 'mb-2')}>
          <label className="text-sm font-medium text-gray-900" id={labelId}>
            {label}
            {required && (
              <span aria-hidden="true" className="text-danger-500">
                {' '}
                *
              </span>
            )}
          </label>
          {description && (
            <p className="text-xs leading-5 text-gray-500">{description}</p>
          )}
        </div>
        <div
          aria-labelledby={labelId}
          aria-required={required != null ? required : undefined}
          className={clsx(
            'space-y-2',
            orientation === 'horizontal' &&
              'sm:flex sm:items-center sm:space-y-0 sm:space-x-10',
          )}
          role="radiogroup">
          {children}
        </div>
      </div>
    </RadioListContext.Provider>
  );
}
