import Error from 'next/error';
import { useEffect } from 'react';
import { useState } from 'react';
import { HorizontalDivider, Spinner, Tabs } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import OfferPercentileAnalysis from '../analysis/OfferPercentileAnalysis';
import OfferProfileCard from '../analysis/OfferProfileCard';
import { OVERALL_TAB } from '../constants';

import type {
  Analysis,
  AnalysisHighestOffer,
  ProfileAnalysis,
} from '~/types/offers';

type OfferAnalysisData = {
  offer?: AnalysisHighestOffer;
  offerAnalysis?: Analysis;
};

type OfferAnalysisContentProps = Readonly<{
  analysis: OfferAnalysisData;
  tab: string;
}>;

function OfferAnalysisContent({
  analysis: { offer, offerAnalysis },
  tab,
}: OfferAnalysisContentProps) {
  if (!offerAnalysis || !offer || offerAnalysis.noOfOffers === 0) {
    return (
      <p className="m-10">
        You are the first to submit an offer for these companies! Check back
        later when there are more submissions.
      </p>
    );
  }
  return (
    <>
      <OfferPercentileAnalysis
        companyName={offer.company.name}
        offerAnalysis={offerAnalysis}
        tab={tab}
      />
      {offerAnalysis.topPercentileOffers.map((topPercentileOffer) => (
        <OfferProfileCard
          key={topPercentileOffer.id}
          offerProfile={topPercentileOffer}
        />
      ))}
    </>
  );
}

type OfferAnalysisProps = Readonly<{
  profileId?: string;
}>;

export default function OfferAnalysis({ profileId }: OfferAnalysisProps) {
  const [tab, setTab] = useState(OVERALL_TAB);
  const [allAnalysis, setAllAnalysis] = useState<ProfileAnalysis | null>(null);
  const [analysis, setAnalysis] = useState<OfferAnalysisData | null>(null);

  useEffect(() => {
    if (tab === OVERALL_TAB) {
      setAnalysis({
        offer: allAnalysis?.overallHighestOffer,
        offerAnalysis: allAnalysis?.overallAnalysis,
      });
    } else {
      setAnalysis({
        offer: allAnalysis?.overallHighestOffer,
        offerAnalysis: allAnalysis?.companyAnalysis[0],
      });
    }
  }, [tab, allAnalysis]);

  if (!profileId) {
    return null;
  }

  const getAnalysisResult = trpc.useQuery(
    ['offers.analysis.get', { profileId }],
    {
      onError(error) {
        console.error(error.message);
      },
      onSuccess(data) {
        setAllAnalysis(data);
      },
    },
  );

  const tabOptions = [
    {
      label: OVERALL_TAB,
      value: OVERALL_TAB,
    },
    {
      label: allAnalysis?.overallHighestOffer.company.name || '',
      value: allAnalysis?.overallHighestOffer.company.id || '',
    },
  ];

  return (
    <>
      {getAnalysisResult.isError && (
        <Error
          statusCode={404}
          title="An error occurred while generating profile analysis."
        />
      )}
      {!getAnalysisResult.isError && analysis && (
        <div>
          <h5 className="mb-2 text-center text-4xl font-bold text-gray-900">
            Result
          </h5>
          {getAnalysisResult.isLoading ? (
            <Spinner className="m-10" display="block" size="lg" />
          ) : (
            <div>
              <Tabs
                label="Result Navigation"
                tabs={tabOptions}
                value={tab}
                onChange={setTab}
              />
              <HorizontalDivider className="mb-5" />
              <OfferAnalysisContent analysis={analysis} tab={tab} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
