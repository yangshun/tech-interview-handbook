import { Select } from '~/ui';
import { SORT_ORDERS, SORT_TYPES } from '~/utils/questions/constants';

import type { SortOrder, SortType } from '~/types/questions.d';

export type SortOption<Value> = {
  label: string;
  value: Value;
};

type SortOrderProps<Order> = {
  onSortOrderChange?: (sortValue: Order) => void;
  sortOrderOptions?: Array<SortOption<Order>>;
  sortOrderValue: Order;
};

type SortTypeProps<Type> = {
  onSortTypeChange?: (sortType: Type) => void;
  sortTypeOptions?: Array<SortOption<Type>>;
  sortTypeValue: Type;
};

export type SortOptionsSelectProps = SortOrderProps<SortOrder> &
  SortTypeProps<SortType>;

export default function SortOptionsSelect({
  onSortOrderChange,
  sortOrderValue,
  onSortTypeChange,
  sortTypeValue,
  sortOrderOptions,
  sortTypeOptions,
}: SortOptionsSelectProps) {
  const sortTypes = sortTypeOptions ?? SORT_TYPES;
  const sortOrders = sortOrderOptions ?? SORT_ORDERS;

  return (
    <div className="flex items-end justify-end gap-2">
      <div className="flex items-center">
        <Select
          display="inline"
          label="Sort by"
          options={sortTypes}
          value={sortTypeValue}
          onChange={(value) => {
            const chosenOption = sortTypes.find(
              (option) => String(option.value) === value,
            );
            if (chosenOption) {
              onSortTypeChange?.(chosenOption.value);
            }
          }}
        />
      </div>
      <div className="flex items-center">
        <Select
          display="inline"
          label="Order by"
          options={sortOrders}
          value={sortOrderValue}
          onChange={(value) => {
            const chosenOption = sortOrders.find(
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
