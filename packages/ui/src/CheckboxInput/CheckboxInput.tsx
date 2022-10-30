import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import type { ForwardedRef } from 'react';
import { forwardRef, useId } from 'react';

type Props = Readonly<{
  defaultValue?: boolean;
  description?: string;
  disabled?: boolean;
  errorMessage?: string;
  label: string;
  name?: string;
  onChange?: (
    value: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => undefined | void;
  value?: boolean;
}>;

function CheckboxInput(
  {
    defaultValue,
    description,
    disabled = false,
    errorMessage,
    label,
    name,
    value,
    onChange,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const id = useId();
  const descriptionId = useId();
  const errorId = useId();

  return (
    <div>
      <div
        className={clsx(
          'relative flex',
          // Vertically center only when there's no description.
          description == null && 'items-center',
        )}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            aria-describedby={description != null ? descriptionId : undefined}
            checked={value}
            className={clsx(
              'h-4 w-4 rounded border-slate-300',
              disabled
                ? 'bg-slate-50 text-slate-400'
                : 'text-primary-600 focus:ring-primary-500',
            )}
            defaultChecked={defaultValue}
            disabled={disabled}
            id={id}
            name={name}
            type="checkbox"
            onChange={(event) => {
              if (!onChange) {
                return;
              }

              onChange(event.target.checked, event);
            }}
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
      {errorMessage && (
        <p className="text-danger-600 mt-2 text-sm" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default forwardRef(CheckboxInput);
