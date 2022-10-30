import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, HorizontalDivider, Spinner, Tabs } from '@tih/ui';

import OfferPercentileAnalysisText from './OfferPercentileAnalysisText';
import OfferProfileCard from './OfferProfileCard';
import { OVERALL_TAB } from '../constants';

import type { AnalysisUnit, ProfileAnalysis } from '~/types/offers';

type OfferAnalysisContentProps = Readonly<{
  analysis: AnalysisUnit;
  isSubmission: boolean;
  tab: string;
}>;

function OfferAnalysisContent({
  analysis,
  tab,
  isSubmission,
}: OfferAnalysisContentProps) {
  if (!analysis || analysis.noOfOffers === 0) {
    if (tab === OVERALL_TAB) {
      return (
        <Alert title="Insufficient data to compare with" variant="info">
          You are among the first to submit an offer for your job title and
          years of experience! Check back later when there are more submissions.
        </Alert>
      );
    }

    return (
      <Alert title="Insufficient data to compare with" variant="info">
        You are among the first to submit an offer for this company, job title
        and years of experience! Check back later when there are more
        submissions.
      </Alert>
    );
  }
  return (
    <>
      <OfferPercentileAnalysisText
        analysis={analysis}
        isSubmission={isSubmission}
        tab={tab}
      />
      <p className="mt-5">
        {isSubmission
          ? 'Here are some of the top offers relevant to you:'
          : 'Relevant top offers:'}
      </p>
      {analysis.topPercentileOffers.map((topPercentileOffer) => (
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
  allAnalysis: ProfileAnalysis;
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
  const [analysis, setAnalysis] = useState<AnalysisUnit>(
    allAnalysis.overallAnalysis,
  );

  useEffect(() => {
    if (tab === OVERALL_TAB) {
      setAnalysis(allAnalysis.overallAnalysis);
    } else {
      setAnalysis(allAnalysis.companyAnalysis[parseInt(tab, 10)]);
    }
  }, [tab, allAnalysis]);

  const companyTabs = allAnalysis.companyAnalysis.map((value, index) => ({
    label: value.companyName,
    value: `${index}`,
  }));

  let tabOptions = [
    {
      label: OVERALL_TAB,
      value: OVERALL_TAB,
    },
  ];
  tabOptions = tabOptions.concat(companyTabs);

  return (
    <div>
      {isError ? (
        <p className="m-10 text-center">
          An error occurred while generating profile analysis.
        </p>
      ) : isLoading ? (
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
          <OfferAnalysisContent
            analysis={analysis}
            isSubmission={isSubmission}
            tab={tab}
          />
        </div>
      )}
    </div>
  );
}