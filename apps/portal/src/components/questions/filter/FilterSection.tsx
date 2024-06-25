import { useMemo } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { CheckboxInput, CheckboxList, Collapsible, RadioList } from '~/ui';

export type FilterChoice<V extends string = string> = {
  id: string;
  label: string;
  value: V;
};

export type FilterOption<V extends string = string> = FilterChoice<V> & {
  checked: boolean;
};

export type FilterChoices<V extends string = string> = ReadonlyArray<
  FilterChoice<V>
>;

type FilterSectionType<V extends string> =
  | {
      isSingleSelect: true;
      onOptionChange: (option: FilterOption<V>) => void;
    }
  | {
      isSingleSelect?: false;
      onOptionChange: (option: FilterOption<V>) => void;
    };

export type FilterSectionProps<V extends string = string> =
  FilterSectionType<V> & {
    label: string;
    options: Array<FilterOption<V>>;
  } & (
      | {
          renderInput: (props: {
            field: UseFormRegisterReturn<'search'>;
            onOptionChange: FilterSectionType<V>['onOptionChange'];
            options: Array<FilterOption<V>>;
          }) => React.ReactNode;
          showAll?: never;
        }
      | {
          renderInput?: never;
          showAll: true;
        }
    );

export type FilterSectionFormData = {
  search: string;
};

export default function FilterSection<V extends string>({
  label,
  options,
  showAll,
  onOptionChange,
  isSingleSelect,
  renderInput,
}: FilterSectionProps<V>) {
  const { register, reset } = useForm<FilterSectionFormData>();

  const registerSearch = register('search');

  const field: UseFormRegisterReturn<'search'> = {
    ...registerSearch,
    onChange: async (event) => {
      await registerSearch.onChange(event);
      reset();
    },
  };

  const autocompleteOptions = useMemo(() => {
    return options.filter((option) => !option.checked) as Array<
      FilterOption<V>
    >;
  }, [options]);

  const selectedCount = useMemo(() => {
    return options.filter((option) => option.checked).length;
  }, [options]);

  const collapsibleLabel = useMemo(() => {
    if (isSingleSelect) {
      return label;
    }
    if (selectedCount === 0) {
      return `${label} (all)`;
    }

    return `${label} (${selectedCount})`;
  }, [label, selectedCount, isSingleSelect]);

  return (
    <div className="mx-2 py-2">
      <Collapsible defaultOpen={true} label={collapsibleLabel}>
        <div className="-mx-2 flex flex-col items-stretch gap-2">
          {!showAll && (
            <div>
              {renderInput({
                field,
                onOptionChange: async (option: FilterOption<V>) => {
                  reset();
                  return onOptionChange({
                    ...option,
                    checked: true,
                  });
                },
                options: autocompleteOptions,
              })}
            </div>
          )}
          <div className="px-1.5">
            {isSingleSelect ? (
              <RadioList
                isLabelHidden={true}
                label={label}
                value={options.find((option) => option.checked)?.value}
                onChange={(value) => {
                  const changedOption = options.find(
                    (option) => option.value === value,
                  )!;
                  onOptionChange({
                    ...changedOption,
                    checked: !changedOption.checked,
                  });
                }}>
                {options.map((option) => (
                  <RadioList.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </RadioList>
            ) : (
              <CheckboxList isLabelHidden={true} label={label}>
                {options
                  .filter((option) => showAll || option.checked)
                  .map((option) => (
                    <CheckboxInput
                      key={option.value}
                      label={option.label}
                      value={option.checked}
                      onChange={(checked) => {
                        onOptionChange({
                          ...option,
                          checked,
                        });
                      }}
                    />
                  ))}
              </CheckboxList>
            )}
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
