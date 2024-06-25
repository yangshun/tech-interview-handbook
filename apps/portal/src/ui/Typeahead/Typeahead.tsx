import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

import { Spinner } from '..';

export type TypeaheadOption = Readonly<{
  // String value to uniquely identify the option.
  id: string;
  label: string;
  value: string;
}>;
export type TypeaheadTextSize = 'default' | 'inherit';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'pattern'
  | 'placeholder'
  | 'required'
>;

type Props = Readonly<{
  errorMessage?: React.ReactNode;
  isLabelHidden?: boolean;
  isLoading?: boolean;
  label: string;
  // Minimum query length before any results will be shown.
  minQueryLength?: number;
  noResultsMessage?: string;
  onQueryChange: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  options: ReadonlyArray<TypeaheadOption>;
  textSize?: TypeaheadTextSize;
  value?: TypeaheadOption | null;
}> &
  Readonly<Attributes> &
  (
    | {
        nullable: true;
        onSelect: (option: TypeaheadOption | null) => void;
      }
    | {
        nullable?: false;
        onSelect: (option: TypeaheadOption) => void;
      }
  );

type State = 'error' | 'normal';

const stateClasses: Record<
  State,
  Readonly<{
    container: string;
    input: string;
  }>
> = {
  error: {
    container:
      'border-danger-300 focus-within:outline-none focus-within:ring-danger-500 focus-within:border-danger-500',
    input: 'text-danger-900 placeholder-danger-300',
  },
  normal: {
    container:
      'focus-within:ring-primary-500 focus-within:border-primary-500 border-slate-300',
    input: 'placeholder:text-slate-400',
  },
};

const textSizes: Record<TypeaheadTextSize, string> = {
  default: 'text-sm',
  inherit: '',
};

export default function Typeahead({
  disabled = false,
  errorMessage,
  isLabelHidden,
  isLoading = false,
  label,
  minQueryLength = 0,
  noResultsMessage = 'No results',
  nullable = false,
  options,
  onQueryChange,
  required,
  textSize = 'default',
  value,
  onSelect,
  ...props
}: Props) {
  const hasError = errorMessage != null;
  const errorId = useId();
  const state: State = hasError ? 'error' : 'normal';
  const [query, setQuery] = useState('');

  return (
    <div>
      <Combobox
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        by="id"
        disabled={disabled}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        multiple={false}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nullable={nullable}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={value}
        onChange={(newValue) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onSelect(newValue as TypeaheadOption | null);
        }}>
        <Combobox.Label
          className={clsx(
            isLabelHidden
              ? 'sr-only'
              : clsx(
                  'mb-1 block font-medium text-slate-700',
                  textSizes[textSize],
                ),
          )}>
          {label}
          {required && (
            <span aria-hidden="true" className="text-danger-500">
              {' '}
              *
            </span>
          )}
        </Combobox.Label>
        <div className="relative">
          <div
            className={clsx(
              'relative w-full cursor-default overflow-hidden rounded-md border text-left focus-within:ring-1',
              disabled && 'pointer-events-none select-none bg-slate-50',
              stateClasses[state].container,
              textSizes[textSize],
            )}>
            <Combobox.Input
              aria-describedby={hasError ? errorId : undefined}
              autoComplete="nope" // "off" doesn't work as intended sometimes, so we use a random string.
              className={clsx(
                'w-full border-none py-2 pl-3 pr-10 text-[length:inherit] leading-5 focus:ring-0',
                stateClasses[state].input,
                textSizes[textSize],
                'disabled:cursor-not-allowed disabled:bg-transparent disabled:text-slate-500',
              )}
              displayValue={(option) =>
                (option as unknown as TypeaheadOption)?.label
              }
              required={required}
              onChange={(event) => {
                setQuery(event.target.value);
                onQueryChange(event.target.value, event);
              }}
              {...props}
            />
            {isLoading ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Spinner size="xs" />
              </div>
            ) : (
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-slate-400"
                />
              </Combobox.Button>
            )}
          </div>
          {query.length >= minQueryLength && !isLoading && (
            <Transition
              afterLeave={() => setQuery('')}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Combobox.Options
                className={clsx(
                  'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                  textSizes[textSize],
                )}>
                {options.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-slate-700">
                    {noResultsMessage}
                  </div>
                ) : (
                  options.map((option) => (
                    <Combobox.Option
                      key={option.id}
                      className={({ active }) =>
                        clsx(
                          'relative cursor-default select-none py-2 px-4 text-slate-500',
                          active && 'bg-slate-100',
                        )
                      }
                      value={option}>
                      {({ selected }) => (
                        <>
                          <span
                            className={clsx(
                              'block truncate',
                              selected && 'font-medium',
                            )}>
                            {option.label}
                          </span>
                          {selected && (
                            <span
                              className={clsx(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}>
                              <CheckIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          )}
        </div>
      </Combobox>
      {errorMessage && (
        <p className="text-danger-600 mt-2 text-sm" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
