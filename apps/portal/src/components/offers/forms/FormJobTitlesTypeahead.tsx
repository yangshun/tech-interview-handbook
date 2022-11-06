import type { ComponentProps } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypeahead';

type Props = Omit<
  ComponentProps<typeof JobTitlesTypeahead>,
  'onSelect' | 'value'
> & {
  name: string;
};

export default function FormJobTitlesTypeahead({ name, ...props }: Props) {
  const { setValue } = useFormContext();
  const watchJobTitle = useWatch({
    name,
  });

  return (
    <JobTitlesTypeahead
      {...props}
      value={
        watchJobTitle
          ? {
              id: watchJobTitle,
              label: getLabelForJobTitleType(watchJobTitle as JobTitleType),
              value: watchJobTitle,
            }
          : null
      }
      onSelect={(option) => {
        setValue(name, option?.value);
      }}
    />
  );
}
