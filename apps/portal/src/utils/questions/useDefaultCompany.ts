import type { FilterChoice } from '~/components/questions/filter/FilterSection';

import { trpc } from '../trpc';

export default function useDefaultCompany(): FilterChoice | undefined {
  const { data: companies } = trpc.useQuery([
    'companies.list',
    {
      name: '',
    },
  ]);

  const company = companies?.[0];
  if (company === undefined) {
    return company;
  }
  return {
    id: company.id,
    label: company.name,
    value: company.id,
  };
}
