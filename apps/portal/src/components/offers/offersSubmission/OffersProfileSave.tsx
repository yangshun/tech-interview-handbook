import { signIn, useSession } from 'next-auth/react';
import type { UseQueryResult } from 'react-query';
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid';
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { Button, TextInput, useToast } from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';

import { copyProfileLink, getProfileLink } from '~/utils/offers/link';
import { trpc } from '~/utils/trpc';

type OfferProfileSaveProps = Readonly<{
  isSavedQuery: UseQueryResult<boolean>;
  profileId: string;
  token?: string;
}>;

export default function OffersProfileSave({
  profileId,
  token,
  isSavedQuery: { data: isSaved, isLoading },
}: OfferProfileSaveProps) {
  const { showToast } = useToast();
  const { event: gaEvent } = useGoogleAnalytics();
  const { data: session, status } = useSession();

  const saveMutation = trpc.useMutation(
    ['offers.user.profile.addToUserProfile'],
    {
      onError: () => {
        showToast({
          subtitle: 'Please check that you are logged in.',
          title: `Failed to saved to dashboard!`,
          variant: 'failure',
        });
      },
      onSuccess: () => {
        trpcContext.invalidateQueries([
          'offers.profile.isSaved',
          { profileId, userId: session?.user?.id },
        ]);
        showToast({
          title: `Saved to your dashboard!`,
          variant: 'success',
        });
      },
    },
  );

  const trpcContext = trpc.useContext();
  const handleSave = () => {
    if (status === 'unauthenticated') {
      signIn();
    } else {
      saveMutation.mutate({
        profileId,
        token: token as string,
      });
      gaEvent({
        action: 'offers.profile_submission_save_to_profile',
        category: 'engagement',
        label: 'Save to profile in profile submission',
      });
    }
  };

  return (
    <div className="flex w-full justify-center pb-10">
      <div className="max-w-2xl text-center">
        <h2 className="block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Save for future edits
        </h2>
        <p className="mt-4 text-xl leading-8 text-slate-500">
          We value your privacy
        </p>
        <div className="mt-6 max-w-md text-slate-500">
          <div className="bg-info-50 rounded-lg p-6">
            <p className="sm:tex-base text-sm">
              To keep your offer profile strictly anonymous, it is not linked to
              your user account. Only people who have the link below can edit
              it. If you want to edit the profile in future, store the link
              somewhere.
            </p>
            <div className="mt-4 flex gap-4">
              <div className="grow">
                <TextInput
                  isLabelHidden={true}
                  label="Edit link"
                  value={getProfileLink(profileId, token)}
                />
              </div>
              <Button
                icon={DocumentDuplicateIcon}
                isLabelHidden={true}
                label="Copy"
                variant="info"
                onClick={() => {
                  copyProfileLink(profileId, token);
                  showToast({
                    title: `Profile edit link copied to clipboard!`,
                    variant: 'success',
                  });
                  gaEvent({
                    action: 'offers.profile_submission_copy_edit_profile_link',
                    category: 'engagement',
                    label: 'Copy Edit Profile Link in Profile Submission',
                  });
                }}
              />
            </div>
          </div>
          <p className="mt-6 text-xs sm:text-sm">
            If you do not want to manually store the link somewhere else, you
            can add this offers profile to your user account by clicking the
            button below. It will still only be editable by you.
          </p>
          <div className="mt-6">
            <Button
              disabled={isLoading || isSaved}
              icon={isSaved ? BookmarkSolidIcon : BookmarkOutlineIcon}
              isLoading={saveMutation.isLoading}
              label={isSaved ? 'Added to account' : 'Add to your account'}
              size="sm"
              variant="secondary"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
