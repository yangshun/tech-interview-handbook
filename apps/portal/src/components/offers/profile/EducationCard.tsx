import {
  BuildingLibraryIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

import type { EducationDisplayData } from '~/components/offers/types';

type Props = Readonly<{
  education: EducationDisplayData;
}>;

export default function EducationCard({
  education: { type, field, startDate, endDate, school },
}: Props) {
  return (
    <div className="mx-8 my-4 block rounded-lg bg-white py-4 shadow-md">
      <div className="flex justify-between px-8">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <LightBulbIcon className="mr-1 h-5" />
            <span className="ml-1 font-bold">
              {field ? `${type ?? 'N/A'}, ${field}` : type ?? `N/A`}
            </span>
          </div>
          {school && (
            <div className="flex flex-row">
              <BuildingLibraryIcon className="mr-1 h-5" />
              <span className="ml-1">{school}</span>
            </div>
          )}
        </div>
        {(startDate || endDate) && (
          <div className="font-light text-gray-400">
            <p>{`${startDate || 'N/A'} - ${endDate || 'N/A'}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
