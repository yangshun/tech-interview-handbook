import clsx from 'clsx';
import type { ChangeEvent } from 'react';

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
  value?: T;
}>;

RadioList.Item = RadioListItem;

export default function RadioList<T>({
  children,
  defaultValue,
  description,
  orientation = 'vertical',
  isLabelHidden,
  name,
  label,
  value,
  onChange,
}: Props<T>) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO: Figure out how to type the onChange.
    <RadioListContext.Provider value={{ defaultValue, name, onChange, value }}>
      <div>
        <div className={clsx(isLabelHidden ? 'sr-only' : 'mb-4')}>
          <label className="text-base font-medium text-gray-900">{label}</label>
          {description && (
            <p className="text-sm leading-5 text-gray-500">{description}</p>
          )}
        </div>
        <fieldset>
          <legend className="sr-only">TODO</legend>
          <div
            className={clsx(
              'space-y-4',
              orientation === 'horizontal' &&
                'sm:flex sm:items-center sm:space-y-0 sm:space-x-10',
            )}>
            {children}
          </div>
        </fieldset>
      </div>
    </RadioListContext.Provider>
  );
}
