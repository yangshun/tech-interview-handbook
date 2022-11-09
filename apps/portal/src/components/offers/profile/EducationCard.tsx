import { BuildingLibraryIcon, LightBulbIcon } from '@heroicons/react/20/solid';

import type { EducationType } from '~/components/offers/EducationFields';
import { getLabelForEducationFieldType } from '~/components/offers/EducationFields';
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
          <div className="mb-2 flex items-center">
            <LightBulbIcon className="mr-1 h-5 text-slate-400" />
            <span className="ml-1 font-semibold">
              {field
                ? `${
                    type ? type.charAt(0).toUpperCase() + type.slice(1) : 'N/A'
                  }, ${
                    getLabelForEducationFieldType(field as EducationType) ??
                    'N/A'
                  }`
                : type
                ? type.charAt(0).toUpperCase() + type.slice(1)
                : `N/A`}
            </span>
          </div>
          {school && (
            <div className="flex flex-row">
              <BuildingLibraryIcon className="mr-1 h-5 text-slate-400" />
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
