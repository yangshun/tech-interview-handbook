import { useState } from 'react';
import {
  AcademicCapIcon,
  ArrowPathIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { Button, Spinner } from '@tih/ui';

import EducationCard from '~/components/offers/profile/EducationCard';
import OfferCard from '~/components/offers/profile/OfferCard';
import type {
  BackgroundDisplayData,
  OfferDisplayData,
} from '~/components/offers/types';

import { trpc } from '~/utils/trpc';

import { ProfileDetailTab } from '../constants';
import OfferAnalysis from '../offerAnalysis/OfferAnalysis';

import { ProfileAnalysis } from '~/types/offers';

type ProfileOffersProps = Readonly<{
  offers: Array<OfferDisplayData>;
}>;

function ProfileOffers({ offers }: ProfileOffersProps) {
  if (offers.length !== 0) {
    return (
      <>
        {offers.map((offer) => (
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

type ProfileBackgroundProps = Readonly<{
  background?: BackgroundDisplayData;
}>;

function ProfileBackground({ background }: ProfileBackgroundProps) {
  if (!background?.experiences?.length && !background?.educations?.length) {
    return (
      <div className="mx-8 my-4">
        <p>No background information available.</p>
      </div>
    );
  }

  return (
    <>
      {background?.experiences?.length > 0 && (
        <>
          <div className="mx-8 my-4 flex flex-row">
            <BriefcaseIcon className="mr-1 h-5" />
            <span className="font-bold">Work Experience</span>
          </div>
          <OfferCard offer={background.experiences[0]} />
        </>
      )}
      {background?.educations?.length > 0 && (
        <>
          <div className="mx-8 my-4 flex flex-row">
            <AcademicCapIcon className="mr-1 h-5" />
            <span className="font-bold">Education</span>
          </div>
          <EducationCard education={background.educations[0]} />
        </>
      )}
    </>
  );
}

type ProfileAnalysisProps = Readonly<{
  analysis?: ProfileAnalysis;
  isEditable: boolean;
  profileId: string;
}>;

function ProfileAnalysis({
  analysis: profileAnalysis,
  profileId,
  isEditable,
}: ProfileAnalysisProps) {
  const [analysis, setAnalysis] = useState(profileAnalysis);
  const generateAnalysisMutation = trpc.useMutation(
    ['offers.analysis.generate'],
    {
      onError(error) {
        console.error(error.message);
      },
      onSuccess(data) {
        if (data) {
          setAnalysis(data);
        }
      },
    },
  );

  if (generateAnalysisMutation.isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-8 my-4">
      <OfferAnalysis allAnalysis={analysis} isError={false} isLoading={false} />
      {isEditable && (
        <div className="flex justify-end">
          <Button
            addonPosition="start"
            icon={ArrowPathIcon}
            label="Regenerate Analysis"
            variant="secondary"
            onClick={() => generateAnalysisMutation.mutate({ profileId })}
          />
        </div>
      )}
    </div>
  );
}

type ProfileDetailsProps = Readonly<{
  analysis?: ProfileAnalysis;
  background?: BackgroundDisplayData;
  isEditable: boolean;
  isLoading: boolean;
  offers: Array<OfferDisplayData>;
  profileId: string;
  selectedTab: ProfileDetailTab;
}>;

export default function ProfileDetails({
  analysis,
  background,
  isLoading,
  offers,
  selectedTab,
  profileId,
  isEditable,
}: ProfileDetailsProps) {
  if (isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }
  if (selectedTab === ProfileDetailTab.OFFERS) {
    return <ProfileOffers offers={offers} />;
  }
  if (selectedTab === ProfileDetailTab.BACKGROUND) {
    return <ProfileBackground background={background} />;
  }
  if (selectedTab === ProfileDetailTab.ANALYSIS) {
    return (
      <ProfileAnalysis
        analysis={analysis}
        isEditable={isEditable}
        profileId={profileId}
      />
    );
  }
  return null;
}
