import type { FilterChoice } from '~/components/questions/filter/FilterSection';

import useCompanyOptions from '../shared/useCompanyOptions';

export default function useDefaultCompany(): FilterChoice | undefined {
  const { data: companyOptions } = useCompanyOptions('google');
  return companyOptions[0];
}
