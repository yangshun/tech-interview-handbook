import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button, TextInput } from '@tih/ui';

import type { SortOptionsSelectProps } from './SortOptionsSelect';
import SortOptionsSelect from './SortOptionsSelect';

export type QuestionSearchBarProps = SortOptionsSelectProps & {
  onFilterOptionsToggle: () => void;
};

export default function QuestionSearchBar({
  onFilterOptionsToggle,
  ...sortOptionsSelectProps
}: QuestionSearchBarProps) {
  return (
    <div className="flex flex-col items-stretch gap-x-4 gap-y-2 lg:flex-row lg:items-end">
      <div className="flex-1 ">
        <TextInput
          isLabelHidden={true}
          label="Search by content"
          placeholder="Search by content"
          startAddOn={MagnifyingGlassIcon}
          startAddOnType="icon"
        />
      </div>
      <div className="flex items-end justify-end gap-4">
        <SortOptionsSelect {...sortOptionsSelectProps} />
        <div className="lg:hidden">
          <Button
            addonPosition="start"
            icon={AdjustmentsHorizontalIcon}
            label="Filter options"
            variant="tertiary"
            onClick={onFilterOptionsToggle}
          />
        </div>
      </div>
    </div>
  );
}
