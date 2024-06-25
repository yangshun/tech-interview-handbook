import { useEffect } from 'react';
import { useState } from 'react';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { JobType } from '@prisma/client';
import { Alert, Button, HorizontalDivider, Spinner, Tabs } from '~/ui';

import OfferPercentileAnalysisText from './OfferPercentileAnalysisText';
import OfferProfileCard from './OfferProfileCard';
import { OVERALL_TAB } from '../constants';
import { YOE_CATEGORY } from '../table/types';

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
  const { companyId, companyName, title, totalYoe, jobType } = analysis;
  const yoeCategory =
    jobType === JobType.INTERN
      ? ''
      : totalYoe <= 2
      ? YOE_CATEGORY.ENTRY
      : totalYoe <= 5
      ? YOE_CATEGORY.MID
      : YOE_CATEGORY.SENIOR;

  if (!analysis || analysis.noOfOffers === 0) {
    if (tab === OVERALL_TAB) {
      return (
        <Alert title="Insufficient data to compare with" variant="info">
          You are among the first to submit an offer for your job title and
          years of experience in your location! Check back later when there are
          more submissions.
        </Alert>
      );
    }

    return (
      <Alert title="Insufficient data to compare with" variant="info">
        You are among the first to submit an offer for this company, job title
        and years of experience in your location! Check back later when there
        are more submissions.
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
        {tab === OVERALL_TAB
          ? 'Here are some of the highest offers with the same job title and YOE(±1):'
          : 'Here are some of the highest offers with the same company, job title and YOE(±1):'}
      </p>
      {analysis.topPercentileOffers.map((topPercentileOffer) => (
        <OfferProfileCard
          key={topPercentileOffer.id}
          offerProfile={topPercentileOffer}
        />
      ))}
      {analysis.topPercentileOffers.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Button
            href={
              tab === OVERALL_TAB
                ? `/offers?jobTitleId=${title}&sortDirection=-&sortType=totalCompensation&yoeCategory=${yoeCategory}`
                : `/offers?companyId=${companyId}&companyName=${companyName}&jobTitleId=${title}&sortDirection=-&sortType=totalCompensation&yoeCategory=${yoeCategory}`
            }
            icon={ArrowUpRightIcon}
            label="View more offers"
            rel="noreferrer"
            target="_blank"
            variant="tertiary"
          />
        </div>
      )}
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
