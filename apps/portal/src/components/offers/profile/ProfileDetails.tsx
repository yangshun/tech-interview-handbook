import { useState } from 'react';
import {
  AcademicCapIcon,
  ArrowPathIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { Button, Spinner } from '~/ui';

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
  if (offers.length === 0) {
    return (
      <div className="p-4">
        <p className="font-semibold">No offers are attached.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      <div className="mt-1 text-end">
        <a
          className="text-xs text-slate-500"
          href="https://clearbit.com"
          rel="noreferrer"
          target="_blank">
          Logos provided by Clearbit
        </a>
      </div>
    </div>
  );
}

type ProfileBackgroundProps = Readonly<{
  background?: BackgroundDisplayData;
}>;

function ProfileBackground({ background }: ProfileBackgroundProps) {
  if (!background?.experiences?.length && !background?.educations?.length) {
    return (
      <div className="flex items-center justify-center p-8 text-slate-500">
        <p>Creator has not filled in background information.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {background?.experiences?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-500">
            <BriefcaseIcon className="h-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Work Experience
            </h3>
          </div>
          <OfferCard offer={background.experiences[0]} />
        </div>
      )}
      {background?.educations?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-500">
            <AcademicCapIcon className="h-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Education
            </h3>
          </div>
          <EducationCard education={background.educations[0]} />
        </div>
      )}
    </div>
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
    <div className="space-y-4 p-4">
      {!analysis ? (
        <div className="flex items-center justify-center p-4 text-slate-500">
          <p>This profile has no analysis yet.</p>
        </div>
      ) : (
        <OfferAnalysis
          allAnalysis={analysis}
          isError={false}
          isLoading={false}
        />
      )}
      {isEditable && (
        <div className="flex justify-end">
          <Button
            icon={ArrowPathIcon}
            label="Regenerate analysis"
            variant="secondary"
            onClick={() => generateAnalysisMutation.mutate({ profileId })}
          />
        </div>
      )}
      <div className="text-end">
        <a
          className="text-xs text-slate-500"
          href="https://clearbit.com"
          rel="noreferrer"
          target="_blank">
          Logos provided by Clearbit
        </a>
      </div>
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
