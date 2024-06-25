import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button, Tabs, TextInput } from '~/ui';

import { SORT_ORDERS } from '~/utils/questions/constants';

import type { SortOptionsSelectProps } from './SortOptionsSelect';

import { SortOrder, SortType } from '~/types/questions.d';

export type QuestionSearchBarProps = SortOptionsSelectProps & {
  activeFilterCount: number;
  onFilterOptionsToggle: () => void;
  onQueryChange: (query: string) => void;
  query: string;
};

function getSortOrderLabel(sortOrder: SortOrder, sortType: SortType): string {
  switch (sortType) {
    case SortType.NEW:
      return sortOrder === SortOrder.ASC ? 'Oldest first' : 'Newest first';
    case SortType.TOP:
      return sortOrder === SortOrder.ASC
        ? 'Least upvotes first'
        : 'Most upvotes first';
    case SortType.ENCOUNTERS:
      return sortOrder === SortOrder.ASC
        ? 'Least received first'
        : 'Most received first';
  }
  return '';
}

export default function QuestionSearchBar({
  activeFilterCount,
  onFilterOptionsToggle,
  onQueryChange,
  query,
  ...sortOptionsSelectProps
}: QuestionSearchBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-stretch gap-x-2 gap-y-4 lg:flex-row lg:items-end">
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
          <div className="lg:hidden">
            <Button
              addonPosition="start"
              icon={AdjustmentsHorizontalIcon}
              label={
                activeFilterCount > 0
                  ? `Filters (${activeFilterCount})`
                  : 'Filters'
              }
              variant={activeFilterCount > 0 ? 'secondary' : 'tertiary'}
              onClick={onFilterOptionsToggle}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-x-4 gap-y-2 sm:flex-row">
        <div>
          <Tabs
            label="Sort by"
            tabs={sortOptionsSelectProps.sortTypeOptions ?? []}
            value={sortOptionsSelectProps.sortTypeValue}
            onChange={sortOptionsSelectProps.onSortTypeChange}
          />
        </div>
        <div className="border-b border-l" />
        <div>
          <Tabs
            label="Order by"
            tabs={(sortOptionsSelectProps.sortOrderOptions ?? SORT_ORDERS).map(
              (option) => {
                const newLabel = getSortOrderLabel(
                  option.value,
                  sortOptionsSelectProps.sortTypeValue,
                );

                return {
                  ...option,
                  label: newLabel,
                };
              },
            )}
            value={sortOptionsSelectProps.sortOrderValue}
            onChange={sortOptionsSelectProps.onSortOrderChange}
          />
        </div>
      </div>
    </div>
  );
}
