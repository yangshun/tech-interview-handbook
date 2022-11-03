import type {
  FilterChoice,
  FilterOption,
} from '~/components/questions/filter/FilterSection';

export function companyOptionToSlug(option: FilterChoice): string {
  return `${option.id}_${option.label}`;
}

export function slugToCompanyOption(slug: string): FilterOption {
  const [id, label] = slug.split('_');
  return {
    checked: true,
    id,
    label,
    value: id,
  };
}
