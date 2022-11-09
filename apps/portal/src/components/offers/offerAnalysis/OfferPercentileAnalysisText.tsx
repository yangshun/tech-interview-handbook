import { OVERALL_TAB } from '../constants';

import type { AnalysisUnit } from '~/types/offers';

type OfferPercentileAnalysisTextProps = Readonly<{
  analysis: AnalysisUnit;
  isSubmission: boolean;
  tab: string;
}>;

export default function OfferPercentileAnalysisText({
  tab,
  analysis: { noOfOffers, percentile, companyName },
  isSubmission,
}: OfferPercentileAnalysisTextProps) {
  return tab === OVERALL_TAB ? (
    <p>
      {isSubmission ? 'Your' : "This profile's"} highest offer is from{' '}
      <b>{companyName}</b>, which is <b>{percentile.toFixed(1)}</b> percentile
      out of <b>{noOfOffers}</b> offers received for the same job title and
      YOE(±1) in the last year in the same location.
    </p>
  ) : (
    <p>
      {isSubmission ? 'Your' : 'The'} offer from <b>{companyName}</b> is{' '}
      <b>{percentile.toFixed(1)}</b> percentile out of <b>{noOfOffers}</b>{' '}
      offers received in {companyName} for the same job title and YOE(±1) in the
      last year in the same location.
    </p>
  );
}
