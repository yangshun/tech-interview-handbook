import OfferAnalysis from '../offerAnalysis/OfferAnalysis';

import type { ProfileAnalysis } from '~/types/offers';
type Props = Readonly<{
  analysis?: ProfileAnalysis | null;
  isError: boolean;
  isLoading: boolean;
}>;

export default function OffersSubmissionAnalysis({
  analysis,
  isError,
  isLoading,
}: Props) {
  return (
    <div className="mb-8">
      <h5 className="mb-8 text-center text-4xl font-bold text-slate-900">
        Offer Analysis
      </h5>
      {!analysis && (
        <p className="text-error-500 mb-8 text-center">
          Error generating analysis.
        </p>
      )}
      {analysis && (
        <OfferAnalysis
          key={3}
          allAnalysis={analysis}
          isError={isError}
          isLoading={isLoading}
          isSubmission={true}
        />
      )}
    </div>
  );
}