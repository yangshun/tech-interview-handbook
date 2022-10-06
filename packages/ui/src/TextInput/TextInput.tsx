import clsx from 'clsx';
import type {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  InputHTMLAttributes,
} from 'react';
import React, { forwardRef, useId } from 'react';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoComplete'
  | 'disabled'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'pattern'
  | 'placeholder'
  | 'required'
  | 'type'
>;

type StartAddOnProps =
  | Readonly<{
      startAddOn: React.ComponentType<React.ComponentProps<'svg'>>;
      startAddOnType: 'icon';
    }>
  | Readonly<{
      startAddOn: React.ReactNode;
      startAddOnType: 'element';
    }>
  | Readonly<{
      startAddOn: string;
      startAddOnType: 'label';
    }>
  | Readonly<{
      startAddOn?: undefined;
      startAddOnType?: undefined;
    }>;

type EndAddOnProps =
  | Readonly<{
      endAddOn: React.ComponentType<React.ComponentProps<'svg'>>;
      endAddOnType: 'icon';
    }>
  | Readonly<{
      endAddOn: React.ReactNode;
      endAddOnType: 'element';
    }>
  | Readonly<{
      endAddOn: string;
      endAddOnType: 'label';
    }>
  | Readonly<{
      endAddOn?: undefined;
      endAddOnType?: undefined;
    }>;

type BaseProps = Readonly<{
  defaultValue?: string;
  endIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  errorMessage?: React.ReactNode;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}> &
  Readonly<Attributes>;

type Props = BaseProps & EndAddOnProps & StartAddOnProps;

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

function TextInput(
  {
    defaultValue,
    disabled,
    endAddOn,
    endAddOnType,
    errorMessage,
    id: idParam,
    isLabelHidden = false,
    label,
    required,
    startAddOn,
    startAddOnType,
    type = 'text',
    value,
    onChange,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const hasError = errorMessage != null;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const errorId = useId();
  const state: State = hasError ? 'error' : 'normal';
  const { input: inputClass, container: containerClass } = stateClasses[state];

  return (
    <div>
      <label
        className={clsx(
          isLabelHidden
            ? 'sr-only'
            : 'block text-sm font-medium text-slate-700',
        )}
        htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-danger-500">
            {' '}
            *
          </span>
        )}
      </label>
      <div
        className={clsx(
          'flex w-full overflow-hidden rounded-md border focus-within:ring-1 sm:text-sm',
          !isLabelHidden && 'mt-1',
          disabled && 'pointer-events-none select-none bg-slate-100',
          containerClass,
        )}>
        {(() => {
          if (startAddOnType == null) {
            return;
          }

          switch (startAddOnType) {
            case 'label':
              return (
                <div className="pointer-events-none flex items-center pl-3 text-slate-500">
                  {startAddOn}
                </div>
              );
            case 'icon': {
              const StartAddOn = startAddOn;
              return (
                <div className="pointer-events-none flex items-center pl-3">
                  <StartAddOn
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-400"
                  />
                </div>
              );
            }
            case 'element':
              return startAddOn;
          }
        })()}
        <input
          ref={ref}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError ? true : undefined}
          className={clsx(
            'flex-1 border-none focus:outline-none focus:ring-0 sm:text-sm',
            inputClass,
            disabled && 'bg-transparent',
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          required={required}
          type={type}
          value={value != null ? value : undefined}
          onChange={(event) => {
            if (!onChange) {
              return;
            }

            onChange(event.target.value, event);
          }}
          {...props}
        />
        {(() => {
          if (endAddOnType == null) {
            return;
          }

          switch (endAddOnType) {
            case 'label':
              return (
                <div className="pointer-events-none flex items-center pr-3 text-slate-500">
                  {endAddOn}
                </div>
              );
            case 'icon': {
              const EndAddOn = endAddOn;
              return (
                <div className="pointer-events-none flex items-center pr-3">
                  <EndAddOn
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-400"
                  />
                </div>
              );
            }
            case 'element':
              return endAddOn;
          }
        })()}
      </div>
      {errorMessage && (
        <p className="text-danger-600 mt-2 text-sm" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default forwardRef(TextInput);
