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
  isSubmission: boolean;
  tab: string;
}>;

function OfferAnalysisContent({
  analysis: { offer, offerAnalysis },
  tab,
  isSubmission,
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
        isSubmission={isSubmission}
        offerAnalysis={offerAnalysis}
        tab={tab}
      />
      <p className="mt-5">
        {isSubmission
          ? 'Here are some of the top offers relevant to you:'
          : 'Relevant top offers:'}
      </p>
      {offerAnalysis.topPercentileOffers.map((topPercentileOffer) => (
        <OfferProfileCard
          key={topPercentileOffer.id}
          offerProfile={topPercentileOffer}
        />
      ))}
      {/* {offerAnalysis.topPercentileOffers.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Button
            icon={EllipsisHorizontalIcon}
            label="View more offers"
            variant="tertiary"
          />
        </div>
      )} */}
    </>
  );
}

type OfferAnalysisProps = Readonly<{
  allAnalysis?: ProfileAnalysis | null;
  isError: boolean;
  isLoading: boolean;
  isSubmission?: boolean;
}>;

export default function OfferAnalysis({
  allAnalysis,
  isError,
  isLoading,
  isSubmission = false,
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
    <>
      {isLoading && <Spinner className="m-10" display="block" size="lg" />}
      {analysis && (
        <div>
          {isError && (
            <p className="m-10 text-center">
              An error occurred while generating profile analysis.
            </p>
          )}
          {!isError && !isLoading && (
            <div>
              <Tabs
                label="Result Navigation"
                tabs={tabOptions}
                value={tab}
                onChange={setTab}
              />
              <HorizontalDivider className="mb-5" />
              <OfferAnalysisContent
                analysis={analysis}
                isSubmission={isSubmission}
                tab={tab}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
