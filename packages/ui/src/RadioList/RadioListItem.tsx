import clsx from 'clsx';
import { useId } from 'react';

import { useRadioListContext } from './RadioListContext';

type Props<T> = Readonly<{
  description?: string;
  disabled?: boolean;
  label: string;
  value: T;
}>;

export default function RadioListItem<T>({
  description,
  disabled = false,
  label,
  value,
}: Props<T>) {
  const id = useId();
  const descriptionId = useId();
  const context = useRadioListContext();

  return (
    <div
      className={clsx(
        'relative flex',
        // Vertically center only when there's no description.
        description == null && 'items-center',
      )}>
      <div className="flex h-5 items-center">
        <input
          aria-describedby={description != null ? descriptionId : undefined}
          checked={
            context?.value != null ? value === context?.value : undefined
          }
          className={clsx(
            'text-primary-600 focus:ring-primary-500 h-4 w-4 border-slate-300',
            disabled && 'bg-slate-100',
          )}
          defaultChecked={
            context?.defaultValue != null
              ? value === context?.defaultValue
              : undefined
          }
          disabled={disabled}
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
      </div>
      <div className="ml-3 text-sm">
        <label
          className={clsx(
            'block font-medium',
            disabled ? 'text-slate-400' : 'text-slate-700',
          )}
          htmlFor={id}>
          {label}
        </label>
        {description && (
          <p
            className={clsx(
              'text-xs',
              disabled ? 'text-slate-400' : 'text-slate-500',
            )}
            id={descriptionId}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
