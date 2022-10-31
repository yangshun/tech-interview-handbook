import { Select } from '~/../../../packages/ui/dist';
import { SORT_ORDERS, SORT_TYPES } from '~/utils/questions/constants';

import type { SortOrder, SortType } from '~/types/questions.d';

export type SortOption<Value> = {
  label: string;
  value: Value;
};

const sortTypeOptions = SORT_TYPES;
const sortOrderOptions = SORT_ORDERS;

type SortOrderProps<Order> = {
  onSortOrderChange?: (sortValue: Order) => void;
  sortOrderValue: Order;
};

type SortTypeProps<Type> = {
  onSortTypeChange?: (sortType: Type) => void;
  sortTypeValue: Type;
};

export type SortOptionsSelectProps = SortOrderProps<SortOrder> &
  SortTypeProps<SortType>;

export default function SortOptionsSelect({
  onSortOrderChange,
  sortOrderValue,
  onSortTypeChange,
  sortTypeValue,
}: SortOptionsSelectProps) {
  return (
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
    </div>
  );
}
