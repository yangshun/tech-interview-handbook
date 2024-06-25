import { useRouter } from 'next/router';
import { BookmarkSlashIcon } from '@heroicons/react/20/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button, useToast } from '~/ui';

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
    // TODO(offers): Confirm before removal.
    removeSavedProfileMutation.mutate({ profileId: id });
  }

  return (
    <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ProfilePhotoHolder size="sm" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium leading-6 text-slate-900">
                  {profileName}
                </h2>
                <p className="text-sm text-slate-500">
                  <span>Created in {formatDate(createdAt)}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="ml-4 mt-4 flex flex-shrink-0">
            <Button
              disabled={removeSavedProfileMutation.isLoading}
              icon={BookmarkSlashIcon}
              isLabelHidden={true}
              label="Remove Profile"
              size="md"
              variant="tertiary"
              onClick={handleRemoveProfile}
            />
          </div>
        </div>
      </div>
      {/* List of Offers */}
      <ul className="divide-y divide-slate-200" role="list">
        {offers.map((offer: UserProfileOffer) => (
          <li key={offer.id}>
            <DashboardOfferCard offer={offer} />
          </li>
        ))}
      </ul>
      <div className="flex justify-end border-t border-slate-200 px-4 py-5 sm:px-6">
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
