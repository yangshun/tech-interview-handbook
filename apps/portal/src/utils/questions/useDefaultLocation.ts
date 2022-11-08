import type { FilterChoice } from '~/components/questions/filter/FilterSection';

import useLocationOptions from './useLocationOptions';

import type { Location } from '~/types/questions';

export default function useDefaultLocation():
  | (FilterChoice & Location)
  | undefined {
  const { data: locationOptions } = useLocationOptions('singapore');
  return locationOptions[0];
}
