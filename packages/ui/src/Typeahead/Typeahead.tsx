import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export type TypeaheadOption = Readonly<{
  // String value to uniquely identify the option.
  id: string;
  label: string;
  value: string;
}>;

type Props = Readonly<{
  disabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  onQueryChange: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onSelectOption: (option: TypeaheadOption) => void;
  options: ReadonlyArray<TypeaheadOption>;
  selectedOption: TypeaheadOption;
}>;

export default function Typeahead({
  disabled = false,
  isLabelHidden,
  label,
  options,
  onQueryChange,
  selectedOption,
  onSelectOption,
}: Props) {
  const [query, setQuery] = useState('');
  return (
    <Combobox
      disabled={disabled}
      value={selectedOption}
      onChange={onSelectOption}>
      <Combobox.Label
        className={clsx(
          isLabelHidden
            ? 'sr-only'
            : 'mb-1 block text-sm font-medium text-slate-700',
        )}>
        {label}
      </Combobox.Label>
      <div className="relative">
        <div className="focus-visible:ring-offset-primary-300 relative w-full cursor-default overflow-hidden rounded-lg border border-slate-300 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
          <Combobox.Input
            className={clsx(
              'w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 focus:ring-0',
              disabled && 'pointer-events-none select-none bg-slate-100',
            )}
            displayValue={(option) =>
              (option as unknown as TypeaheadOption).label
            }
            onChange={(event) => {
              !disabled && onQueryChange(event.target.value, event);
            }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-slate-400"
            />
          </Combobox.Button>
        </div>
        <Transition
          afterLeave={() => setQuery('')}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-slate-700">
                Nothing found.
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
                    <span
                      className={clsx(
                        'block truncate',
                        selected ? 'font-medium' : 'font-normal',
                      )}>
                      {option.label}
                    </span>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
