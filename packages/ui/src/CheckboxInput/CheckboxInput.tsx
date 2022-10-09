import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useId } from 'react';

type Props = Readonly<{
  defaultValue?: boolean;
  description?: string;
  disabled?: boolean;
  label: string;
  name?: string;
  onChange?: (
    value: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => undefined | void;
  value?: boolean;
}>;

export default function CheckboxInput({
  defaultValue,
  description,
  disabled = false,
  label,
  name,
  value,
  onChange,
}: Props) {
  const id = useId();
  const descriptionId = useId();

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
          checked={value}
          className={clsx(
            'h-4 w-4 rounded border-slate-300',
            disabled
              ? 'bg-slate-100 text-slate-400'
              : 'text-primary-600 focus:ring-primary-500',
          )}
          defaultChecked={defaultValue}
          disabled={disabled}
          id={id}
          name={name}
          type="checkbox"
          onChange={
            onChange != null
              ? (event) => {
                  onChange?.(event.target.checked, event);
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
