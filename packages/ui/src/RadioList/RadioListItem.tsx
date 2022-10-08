import { useId } from 'react';

import { useRadioListContext } from './RadioListContext';

type Props<T> = Readonly<{
  label?: string;
  value: T;
}>;

export default function RadioListItem<T>({ label, value }: Props<T>) {
  const id = useId();
  const context = useRadioListContext();

  return (
    <div className="flex items-center">
      <input
        checked={context?.value != null ? value === context?.value : undefined}
        className="text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300"
        defaultChecked={
          context?.defaultValue != null
            ? value === context?.defaultValue
            : undefined
        }
        id={id}
        name={context?.name}
        type="radio"
        onChange={
          context?.onChange != null
            ? (event) => {
                context?.onChange?.(value, event);
              }
            : undefined
        }
      />
      <label
        className="ml-3 block text-sm font-medium text-gray-700"
        htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
