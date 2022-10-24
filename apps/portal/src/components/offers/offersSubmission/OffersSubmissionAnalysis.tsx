import { useRouter } from 'next/router';
import { EyeIcon } from '@heroicons/react/24/outline';

import { Button } from '~/../../../packages/ui/dist';
import { getProfilePath } from '~/utils/offers/link';

import OfferAnalysis from '../offerAnalysis/OfferAnalysis';

import type { ProfileAnalysis } from '~/types/offers';

type Props = Readonly<{
  analysis?: ProfileAnalysis | null;
  isError: boolean;
  isLoading: boolean;
  profileId?: string;
  token?: string;
}>;

export default function OffersSubmissionAnalysis({
  analysis,
  isError,
  isLoading,
  profileId = '',
  token = '',
}: Props) {
  const router = useRouter();

  return (
    <div>
      <h5 className="mb-8 text-center text-4xl font-bold text-slate-900">
        Result
      </h5>
      <OfferAnalysis
        key={3}
        allAnalysis={analysis}
        isError={isError}
        isLoading={isLoading}
      />
      <div className="mt-8 text-center">
        <Button
          icon={EyeIcon}
          label="View your profile"
          variant="special"
          onClick={() => router.push(getProfilePath(profileId, token))}
        />
      </div>
    </div>
  );
}
