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
    <div className="block rounded-lg border border-slate-200 bg-white p-4 text-sm ">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center">
            <LightBulbIcon className="mr-1 h-5" />
            <span className="text-semibold ml-1">
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
          <div className="font-light text-slate-400">
            <p>{`${startDate || 'N/A'} - ${endDate || 'N/A'}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
