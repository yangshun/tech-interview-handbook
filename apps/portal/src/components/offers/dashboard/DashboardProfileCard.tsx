import { useRouter } from 'next/router';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, useToast } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import DashboardOfferCard from '~/components/offers/dashboard/DashboardOfferCard';

import { formatDate } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';

import ProfilePhotoHolder from '../profile/ProfilePhotoHolder';

import type { UserProfile, UserProfileOffer } from '~/types/offers';
type Props = Readonly<{
  profile: UserProfile;
}>;

export default function DashboardProfileCard({
  profile: { createdAt, id, offers, profileName, token },
}: Props) {
  const { showToast } = useToast();
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const PROFILE_URL = `/offers/profile/${id}?token=${token}`;
  const { event: gaEvent } = useGoogleAnalytics();
  const removeSavedProfileMutation = trpc.useMutation(
    'offers.user.profile.removeFromUserProfile',
    {
      onError: () => {
        showToast({
          title: `Server error.`,
          variant: 'failure',
        });
      },
      onSuccess: () => {
        trpcContext.invalidateQueries(['offers.user.profile.getUserProfiles']);
        showToast({
          title: `Profile removed from your dashboard successfully!`,
          variant: 'success',
        });
      },
    },
  );

  function handleRemoveProfile() {
    removeSavedProfileMutation.mutate({ profileId: id });
  }

  return (
    <div className="space-y-4 bg-white px-4 pt-5 sm:px-4">
      {/* Header */}
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between border-b border-gray-300 pb-4 sm:flex-nowrap">
        <div className="flex items-center gap-x-5">
          <div>
            <ProfilePhotoHolder size="sm" />
          </div>
          <div className="col-span-10">
            <p className="text-xl font-bold">{profileName}</p>

            <div className="flex flex-row">
              <span>Created at {formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex self-start">
          <Button
            disabled={removeSavedProfileMutation.isLoading}
            icon={XMarkIcon}
            isLabelHidden={true}
            label="Remove Profile"
            size="md"
            variant="tertiary"
            onClick={handleRemoveProfile}
          />
        </div>
      </div>

      {/* Offers */}
      <div>
        {offers.map((offer: UserProfileOffer, index) =>
          index === 0 ? (
            <DashboardOfferCard
              key={offer.id}
              disableTopDivider={true}
              offer={offer}
            />
          ) : (
            <DashboardOfferCard key={offer.id} offer={offer} />
          ),
        )}
      </div>
      <div className="flex justify-end pt-1">
        <Button
          disabled={removeSavedProfileMutation.isLoading}
          icon={ArrowRightIcon}
          isLabelHidden={false}
          label="Read full profile"
          size="md"
          variant="secondary"
          onClick={() => {
            gaEvent({
              action: 'offers.view_profile_from_dashboard',
              category: 'engagement',
              label: 'View profile from dashboard',
            });
            router.push(PROFILE_URL);
          }}
        />
      </div>
    </div>
  );
}
