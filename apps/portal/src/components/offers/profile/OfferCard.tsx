import {
  BuildingOffice2Icon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyDollarIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
import { HorizontalDivider } from '@tih/ui';

import type { OfferDisplayData } from '~/components/offers/types';

import {
  getCompanyDisplayText,
  getJobDisplayText,
} from '~/utils/offers/string';

type Props = Readonly<{
  offer: OfferDisplayData;
}>;

export default function OfferCard({
  offer: {
    base,
    bonus,
    companyName,
    duration,
    jobTitle,
    jobLevel,
    jobType,
    location,
    receivedMonth,
    totalCompensation,
    stocks,
    monthlySalary,
    negotiationStrategy,
    otherComment,
  },
}: Props) {
  function UpperSection() {
    return (
      <div className="flex justify-between px-8">
        <div className="flex flex-col">
          {(companyName || location) && (
            <div className="flex flex-row">
              <span>
                <BuildingOffice2Icon className="mr-3 h-5" />
              </span>
              <span className="font-bold">
                {getCompanyDisplayText(companyName, location)}
              </span>
            </div>
          )}
          <div className="ml-8 flex flex-row">
            <p>{getJobDisplayText(jobTitle, jobLevel, jobType)}</p>
          </div>
        </div>
        {!duration && receivedMonth && (
          <div className="font-light text-slate-400">
            <p>{receivedMonth}</p>
          </div>
        )}
        {duration && (
          <div className="font-light text-slate-400">
            <p>{`${duration} months`}</p>
          </div>
        )}
      </div>
    );
  }

  function BottomSection() {
    if (
      !totalCompensation &&
      !monthlySalary &&
      !negotiationStrategy &&
      !otherComment
    ) {
      return null;
    }

    return (
      <>
        <HorizontalDivider />
        <div className="px-8">
          <div className="flex flex-col py-2">
            {(totalCompensation || monthlySalary) && (
              <div className="flex flex-row">
                <span>
                  <CurrencyDollarIcon className="mr-3 h-5" />
                </span>
                <span>
                  <p>
                    {totalCompensation && `TC: ${totalCompensation}`}
                    {monthlySalary && `Monthly Salary: ${monthlySalary}`}
                  </p>
                </span>
              </div>
            )}
            {(base || stocks || bonus) && totalCompensation && (
              <div className="ml-8 flex flex-row font-light">
                <p>
                  Base / year: {base ?? 'N/A'} ⋅ Stocks / year:{' '}
                  {stocks ?? 'N/A'} ⋅ Bonus / year: {bonus ?? 'N/A'}
                </p>
              </div>
            )}
          </div>
          {negotiationStrategy && (
            <div className="flex flex-col py-2">
              <div className="flex flex-row">
                <span>
                  <ScaleIcon className="h-5 w-5" />
                </span>
                <span className="overflow-wrap ml-2">
                  "{negotiationStrategy}"
                </span>
              </div>
            </div>
          )}
          {otherComment && (
            <div className="flex flex-col py-2">
              <div className="flex flex-row">
                <span>
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                </span>
                <span className="overflow-wrap ml-2">"{otherComment}"</span>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <div className="mx-8 my-4 block rounded-md border-b border-gray-300 bg-white py-4">
      <UpperSection />
      <BottomSection />
    </div>
  );
}
