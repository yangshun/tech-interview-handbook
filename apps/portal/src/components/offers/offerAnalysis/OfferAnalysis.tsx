import { useEffect } from 'react';
import { useState } from 'react';
import { HorizontalDivider, Spinner, Tabs } from '@tih/ui';

import OfferPercentileAnalysisText from './OfferPercentileAnalysisText';
import OfferProfileCard from './OfferProfileCard';
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
    if (tab === OVERALL_TAB) {
      return (
        <p className="m-10">
          You are the first to submit an offer for your job title and YOE! Check
          back later when there are more submissions.
        </p>
      );
    }
    return (
      <p className="m-10">
        You are the first to submit an offer for this company, job title and
        YOE! Check back later when there are more submissions.
      </p>
    );
  }
  return (
    <>
      <OfferPercentileAnalysisText
        companyName={offer.company.name}
        offerAnalysis={offerAnalysis}
        tab={tab}
      />
      <p className="mt-5">Here are some of the top offers relevant to you:</p>
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
  allAnalysis?: ProfileAnalysis | null;
  isError: boolean;
  isLoading: boolean;
}>;

export default function OfferAnalysis({
  allAnalysis,
  isError,
  isLoading,
}: OfferAnalysisProps) {
  const [tab, setTab] = useState(OVERALL_TAB);
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
    analysis && (
      <div>
        {isError && (
          <p className="m-10 text-center">
            An error occurred while generating profile analysis.
          </p>
        )}
        {isLoading && <Spinner className="m-10" display="block" size="lg" />}
        {!isError && !isLoading && (
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
    )
  );
}
