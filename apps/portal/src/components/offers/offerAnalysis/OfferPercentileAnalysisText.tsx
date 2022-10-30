import { OVERALL_TAB } from '../constants';

import type { Analysis } from '~/types/offers';

type OfferPercentileAnalysisTextProps = Readonly<{
  companyName: string;
  isSubmission: boolean;
  offerAnalysis: Analysis;
  tab: string;
}>;

export default function OfferPercentileAnalysisText({
  tab,
  companyName,
  offerAnalysis: { noOfOffers, percentile },
  isSubmission,
}: OfferPercentileAnalysisTextProps) {
  return tab === OVERALL_TAB ? (
    <p>
      {isSubmission ? 'Your' : "This profile's"} highest offer is from{' '}
      <b>{companyName}</b>, which is <b>{percentile.toFixed(1)}</b> percentile
      out of <b>{noOfOffers}</b> offers received for the same job title and
      YOE(±1) in the last year.
    </p>
  ) : (
    <p>
      {isSubmission ? 'Your' : 'The'} offer from <b>{companyName}</b> is{' '}
      <b>{percentile.toFixed(1)}</b> percentile out of <b>{noOfOffers}</b>{' '}
      offers received in {companyName} for the same job title and YOE(±1) in the
      last year.
    </p>
  );
}
