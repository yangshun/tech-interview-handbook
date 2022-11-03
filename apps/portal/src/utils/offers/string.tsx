import type { JobType } from '@prisma/client';

import { JobTypeLabel } from '~/components/offers/constants';

import type { Location } from '~/types/offers';

export function joinWithComma(...strings: Array<string | null | undefined>) {
  return strings.filter((value) => !!value).join(', ');
}

export function getLocationDisplayText({ cityName, countryName }: Location) {
  return cityName === countryName
    ? cityName
    : joinWithComma(cityName, countryName);
}

export function getCompanyDisplayText(
  companyName?: string | null,
  location?: Location | null,
) {
  if (!location) {
    return companyName;
  }
  return joinWithComma(companyName, getLocationDisplayText(location));
}

export function getJobDisplayText(
  jobTitle?: string | null,
  jobLevel?: string | null,
  jobType?: JobType | null,
) {
  let jobDisplay = joinWithComma(jobTitle, jobLevel);
  if (jobType) {
    jobDisplay = jobDisplay.concat(` (${JobTypeLabel[jobType]})`);
  }
  return jobDisplay;
}
