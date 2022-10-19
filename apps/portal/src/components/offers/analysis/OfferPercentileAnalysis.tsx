import type { Analysis } from '~/types/offers';

type OfferPercentileAnalysisProps = Readonly<{
  companyName: string;
  offerAnalysis: Analysis;
  tab: string;
}>;

export default function OfferPercentileAnalysis({
  tab,
  companyName,
  offerAnalysis: { noOfOffers, percentile },
}: OfferPercentileAnalysisProps) {
  return tab === 'Overall' ? (
    <p>
      Your highest offer is from {companyName}, which is {percentile} percentile
      out of {noOfOffers} offers received for the same job type, same level, and
      same YOE(+/-1) in the last year.
    </p>
  ) : (
    <p>
      Your offer from {companyName} is {percentile} percentile out of{' '}
      {noOfOffers} offers received in {companyName} for the same job type, same
      level, and same YOE(+/-1) in the last year.
    </p>
  );
}
