import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { Spinner } from '@tih/ui';

import EducationCard from '~/components/offers/profile/EducationCard';
import OfferCard from '~/components/offers/profile/OfferCard';
import type { BackgroundCard, OfferEntity } from '~/components/offers/types';
import { EducationBackgroundType } from '~/components/offers/types';

type ProfileHeaderProps = Readonly<{
  background?: BackgroundCard;
  isLoading: boolean;
  offers: Array<OfferEntity>;
  selectedTab: string;
}>;

export default function ProfileDetails({
  background,
  isLoading,
  offers,
  selectedTab,
}: ProfileHeaderProps) {
  if (isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }
  if (selectedTab === 'offers') {
    if (offers && offers.length !== 0) {
      return (
        <>
          {[...offers].map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </>
      );
    }
    return (
      <div className="mx-8 my-4 flex flex-row">
        <BriefcaseIcon className="mr-1 h-5" />
        <span className="font-bold">No offer is attached.</span>
      </div>
    );
  }
  if (selectedTab === 'background') {
    return (
      <>
        {background?.experiences && background?.experiences.length > 0 && (
          <>
            <div className="mx-8 my-4 flex flex-row">
              <BriefcaseIcon className="mr-1 h-5" />
              <span className="font-bold">Work Experience</span>
            </div>
            <OfferCard offer={background?.experiences[0]} />
          </>
        )}
        {background?.educations && background?.educations.length > 0 && (
          <>
            <div className="mx-8 my-4 flex flex-row">
              <AcademicCapIcon className="mr-1 h-5" />
              <span className="font-bold">Education</span>
            </div>
            <EducationCard
              education={{
                endDate: background.educations[0].endDate,
                field: background.educations[0].field,
                school: background.educations[0].school,
                startDate: background.educations[0].startDate,
                type: EducationBackgroundType.Bachelor,
              }}
            />
          </>
        )}
      </>
    );
  }
  return <div>Detail page for {selectedTab}</div>;
}
