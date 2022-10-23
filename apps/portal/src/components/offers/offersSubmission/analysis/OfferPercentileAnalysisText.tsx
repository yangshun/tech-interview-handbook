import type { Analysis } from '~/types/offers';

type OfferPercentileAnalysisTextProps = Readonly<{
  companyName: string;
  offerAnalysis: Analysis;
  tab: string;
}>;

export default function OfferPercentileAnalysisText({
  tab,
  companyName,
  offerAnalysis: { noOfOffers, percentile },
}: OfferPercentileAnalysisTextProps) {
  return tab === 'Overall' ? (
    <p>
      Your highest offer is from <b>{companyName}</b>, which is{' '}
      <b>{percentile}</b> percentile out of <b>{noOfOffers}</b> offers received
      for the same job title and YOE(+/-1) in the last year.
    </p>
  ) : (
    <p>
      Your offer from <b>{companyName}</b> is <b>{percentile}</b> percentile out
      of <b>{noOfOffers}</b> offers received in {companyName} for the same job
      title and YOE(+/-1) in the last year.
    </p>
  );
}
