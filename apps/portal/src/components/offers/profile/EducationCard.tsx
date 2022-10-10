import {
  BuildingLibraryIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

import type { EducationBackgroundType } from '../types';

type EducationEntity = {
  backgroundType?: EducationBackgroundType;
  field?: string;
  fromMonth?: string;
  school?: string;
  toMonth?: string;
};

type Props = Readonly<{
  education: EducationEntity;
}>;

export default function EducationCard({
  education: { backgroundType, field, fromMonth, school, toMonth },
}: Props) {
  return (
    <div className="mx-8 my-4 block rounded-lg bg-white py-4 shadow-md">
      <div className="flex justify-between px-8">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <LightBulbIcon className="mr-1 h-5" />
            <span className="ml-1 font-bold">
              {field
                ? `${backgroundType ?? 'N/A'}, ${field}`
                : backgroundType ?? `N/A`}
            </span>
          </div>
          {school && (
            <div className="flex flex-row">
              <BuildingLibraryIcon className="mr-1 h-5" />
              <span className="ml-1">{school}</span>
            </div>
          )}
        </div>
        {(fromMonth || toMonth) && (
          <div className="font-light text-gray-400">
            <p>{`${fromMonth ?? 'N/A'} - ${toMonth ?? 'N/A'}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
