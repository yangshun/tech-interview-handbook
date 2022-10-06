import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Select, TextInput } from '@tih/ui';

export type SortOption = {
  label: string;
  value: string;
};

export type QuestionSearchBarProps<SortOptions extends Array<SortOption>> = {
  onSortChange?: (sortValue: SortOptions[number]['value']) => void;
  sortOptions: SortOptions;
  sortValue: SortOptions[number]['value'];
};

export default function QuestionSearchBar<
  SortOptions extends Array<SortOption>,
>({
  onSortChange,
  sortOptions,
  sortValue,
}: QuestionSearchBarProps<SortOptions>) {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-1">
        <TextInput
          isLabelHidden={true}
          label="Search by content"
          placeholder="Search by content"
          startIcon={MagnifyingGlassIcon}
        />
      </div>
      <Select
        display="inline"
        label="Sort by"
        options={sortOptions}
        value={sortValue}
        onChange={onSortChange}></Select>
    </div>
  );
}
