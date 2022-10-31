import { JobType } from '@prisma/client';
import { HorizontalDivider } from '@tih/ui';

import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import type { UserProfileOffer } from '~/types/offers';

type Props = Readonly<{
  disableTopDivider?: boolean;
  offer: UserProfileOffer;
}>;

export default function DashboardProfileCard({
  disableTopDivider,
  offer: {
    company,
    income,
    jobType,
    level,
    location,
    monthYearReceived,
    title,
  },
}: Props) {
  return (
    <>
      {!disableTopDivider && <HorizontalDivider />}
      <div className="flex items-end justify-between">
        <div className="col-span-1 row-span-3">
          <p className="font-bold">
            {getLabelForJobTitleType(title as JobTitleType)}
          </p>
          <p>
            {location
              ? `Company: ${company.name}, ${location}`
              : `Company: ${company.name}`}
          </p>
          {level && <p>Level: {level}</p>}
        </div>
        <div className="col-span-1 row-span-3">
          <p className="text-end">{formatDate(monthYearReceived)}</p>
          <p className="text-end text-xl">
            {jobType === JobType.FULLTIME
              ? `${convertMoneyToString(income)} / year`
              : `${convertMoneyToString(income)} / month`}
          </p>
        </div>
      </div>
    </>
  );
}
