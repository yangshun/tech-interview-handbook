import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Collapsible, TextInput } from '@tih/ui';

import Checkbox from '../ui-patch/Checkbox';
import RadioGroup from '../ui-patch/RadioGroup';

export type FilterOption<V extends string = string> = {
  checked: boolean;
  label: string;
  value: V;
};

export type FilterChoices<V extends string = string> = ReadonlyArray<
  Omit<FilterOption<V>, 'checked'>
>;

type FilterSectionType<FilterOptions extends Array<FilterOption>> =
  | {
      isSingleSelect: true;
      onOptionChange: (optionValue: FilterOptions[number]['value']) => void;
    }
  | {
      isSingleSelect?: false;
      onOptionChange: (
        optionValue: FilterOptions[number]['value'],
        checked: boolean,
      ) => void;
    };

export type FilterSectionProps<FilterOptions extends Array<FilterOption>> =
  FilterSectionType<FilterOptions> & {
    label: string;
    options: FilterOptions;
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

export default function FilterSection<
  FilterOptions extends Array<FilterOption>,
>({
  label,
  options,
  searchPlaceholder,
  showAll,
  onOptionChange,
  isSingleSelect,
}: FilterSectionProps<FilterOptions>) {
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
          {isSingleSelect ? (
            <RadioGroup
              radioData={options}
              onChange={(value) => {
                onOptionChange(value);
              }}></RadioGroup>
          ) : (
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
          )}
        </div>
      </Collapsible>
    </div>
  );
}
