import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button, DropdownMenu, TextInput } from '@tih/ui';

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
        <div className="flex flex-1 items-center gap-4">
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
          <DropdownMenu align="end" label="Sort by">
            {(sortOptionsSelectProps.sortTypeOptions ?? []).map(
              ({ value: sortTypeValue }) =>
                (sortOptionsSelectProps?.sortOrderOptions ?? SORT_ORDERS).map(
                  ({ value: sortOrderValue }) => (
                    <DropdownMenu.Item
                      key={`${sortTypeValue}/${sortOrderValue}`}
                      isSelected={
                        sortOptionsSelectProps.sortTypeValue ===
                          sortTypeValue &&
                        sortOptionsSelectProps.sortOrderValue === sortOrderValue
                      }
                      label={getSortOrderLabel(sortOrderValue, sortTypeValue)}
                      onClick={() => {
                        sortOptionsSelectProps.onSortTypeChange?.(
                          sortTypeValue,
                        );
                        sortOptionsSelectProps.onSortOrderChange?.(
                          sortOrderValue,
                        );
                      }}
                    />
                  ),
                ),
            )}
          </DropdownMenu>
          <div className="lg:hidden">
            <Button
              addonPosition="start"
              aria-label={
                activeFilterCount > 0
                  ? `Filters (${activeFilterCount})`
                  : 'Filters'
              }
              icon={AdjustmentsHorizontalIcon}
              label={`(${activeFilterCount})`}
              variant={activeFilterCount > 0 ? 'secondary' : 'tertiary'}
              onClick={onFilterOptionsToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
