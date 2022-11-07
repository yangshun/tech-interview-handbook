import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button, TextInput } from '@tih/ui';

import type { SortOptionsSelectProps } from './SortOptionsSelect';
import SortOptionsSelect from './SortOptionsSelect';

export type QuestionSearchBarProps = SortOptionsSelectProps & {
  onFilterOptionsToggle: () => void;
  onQueryChange: (query: string) => void;
  query: string;
};

export default function QuestionSearchBar({
  onFilterOptionsToggle,
  onQueryChange,
  query,
  ...sortOptionsSelectProps
}: QuestionSearchBarProps) {
  return (
    <div className="flex flex-col items-stretch gap-x-4 gap-y-4 lg:flex-row lg:items-end">
      <div className="flex flex-1 gap-2">
        <div className="flex-1">
          <TextInput
            isLabelHidden={true}
            label="Search by content"
            placeholder="Search by content"
            startAddOn={MagnifyingGlassIcon}
            startAddOnType="icon"
            value={query}
            onChange={(value) => {
              onQueryChange(value);
            }}
          />
        </div>
        <div className="sm:hidden">
          <Button
            addonPosition="start"
            icon={AdjustmentsHorizontalIcon}
            isLabelHidden={true}
            label="Filters"
            variant="tertiary"
            onClick={onFilterOptionsToggle}
          />
        </div>
        <div className="hidden sm:block lg:hidden">
          <Button
            addonPosition="start"
            icon={AdjustmentsHorizontalIcon}
            label="Filters"
            variant="tertiary"
            onClick={onFilterOptionsToggle}
          />
        </div>
      </div>
      <div className="flex items-end justify-end gap-4">
        <SortOptionsSelect {...sortOptionsSelectProps} />
      </div>
    </div>
  );
}
