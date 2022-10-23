import type { FilterChoice } from '~/components/questions/filter/FilterSection';

import { LOCATIONS } from './constants';

export default function useDefaultLocation(): FilterChoice | undefined {
  return LOCATIONS[0];
}
