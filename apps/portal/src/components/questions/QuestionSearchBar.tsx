import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button, Select, TextInput } from '@tih/ui';

export type SortOption<Value> = {
  label: string;
  value: Value;
};

type SortOrderProps<SortOrder> = {
  onSortOrderChange?: (sortValue: SortOrder) => void;
  sortOrderOptions: ReadonlyArray<SortOption<SortOrder>>;
  sortOrderValue: SortOrder;
};

type SortTypeProps<SortType> = {
  onSortTypeChange?: (sortType: SortType) => void;
  sortTypeOptions: ReadonlyArray<SortOption<SortType>>;
  sortTypeValue: SortType;
};

export type QuestionSearchBarProps<SortType, SortOrder> =
  SortOrderProps<SortOrder> &
    SortTypeProps<SortType> & {
      onFilterOptionsToggle: () => void;
    };

export default function QuestionSearchBar<SortType, SortOrder>({
  onSortOrderChange,
  sortOrderOptions,
  sortOrderValue,
  onSortTypeChange,
  sortTypeOptions,
  sortTypeValue,
  onFilterOptionsToggle,
}: QuestionSearchBarProps<SortType, SortOrder>) {
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
        <div className="flex items-center gap-2">
          <Select
            display="inline"
            label="Sort by"
            options={sortTypeOptions}
            value={sortTypeValue}
            onChange={(value) => {
              const chosenOption = sortTypeOptions.find(
                (option) => String(option.value) === value,
              );
              if (chosenOption) {
                onSortTypeChange?.(chosenOption.value);
              }
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            display="inline"
            label="Order by"
            options={sortOrderOptions}
            value={sortOrderValue}
            onChange={(value) => {
              const chosenOption = sortOrderOptions.find(
                (option) => String(option.value) === value,
              );
              if (chosenOption) {
                onSortOrderChange?.(chosenOption.value);
              }
            }}
          />
        </div>
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
