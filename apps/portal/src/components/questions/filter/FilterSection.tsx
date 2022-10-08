import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Collapsible, TextInput } from '@tih/ui';

import Checkbox from '../ui-patch/Checkbox';

export type FilterOptions = {
  checked: boolean;
  label: string;
  value: string;
};

export type FilterSectionProps = {
  label: string;
  onOptionChange: (optionValue: string, checked: boolean) => void;
  options: Array<FilterOptions>;
} & (
  | {
      searchPlaceholder: string;
      showAll?: never;
    }
  | {
      searchPlaceholder?: never;
      showAll: true;
    }
);

export default function FilterSection({
  label,
  options,
  searchPlaceholder,
  showAll,
  onOptionChange,
}: FilterSectionProps) {
  return (
    <div className="mx-2">
      <Collapsible defaultOpen={true} label={label}>
        <div className="-mx-2 flex flex-col items-stretch gap-2">
          {!showAll && (
            <TextInput
              isLabelHidden={true}
              label={label}
              placeholder={searchPlaceholder}
              startAddOn={MagnifyingGlassIcon}
              startAddOnType="icon"
            />
          )}
          <div className="mx-1">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                {...option}
                onChange={(checked) => {
                  onOptionChange(option.value, checked);
                }}
              />
            ))}
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
