import clsx from 'clsx';
import { useId } from 'react';

import type CheckboxInput from '../CheckboxInput/CheckboxInput';

export type CheckboxListOrientation = 'horizontal' | 'vertical';

type Props = Readonly<{
  children: ReadonlyArray<React.ReactElement<typeof CheckboxInput>>;
  description?: string;
  isLabelHidden?: boolean;
  label: string;
  orientation?: CheckboxListOrientation;
}>;

export default function CheckboxList({
  children,
  description,
  isLabelHidden,
  label,
  orientation = 'vertical',
}: Props) {
  const labelId = useId();
  return (
    <div>
      <div className={clsx(isLabelHidden ? 'sr-only' : 'mb-2')}>
        <label className="text-sm font-medium text-gray-900" id={labelId}>
          {label}
        </label>
        {description && (
          <p className="text-xs leading-5 text-gray-500">{description}</p>
        )}
      </div>
      <div
        aria-labelledby={labelId}
        className={clsx(
          'space-y-2',
          orientation === 'horizontal' &&
            'sm:flex sm:items-center sm:space-y-0 sm:space-x-10',
        )}
        role="group">
        {children}
      </div>
    </div>
  );
}
