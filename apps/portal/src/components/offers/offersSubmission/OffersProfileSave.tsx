// Import { useState } from 'react';
// import { setTimeout } from 'timers';
import { useState } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid';
import { BookmarkSquareIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Button, TextInput, useToast } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';

import { copyProfileLink, getProfileLink } from '~/utils/offers/link';
import { trpc } from '~/utils/trpc';

type OfferProfileSaveProps = Readonly<{
  profileId: string;
  token?: string;
}>;

export default function OffersProfileSave({
  profileId,
  token,
}: OfferProfileSaveProps) {
  const { showToast } = useToast();
  const { event: gaEvent } = useGoogleAnalytics();
  const [isSaved, setSaved] = useState(false);

  const saveMutation = trpc.useMutation(
    ['offers.user.profile.addToUserProfile'],
    {
      onError: () => {
        showToast({
          title: `Failed to saved to dashboard!`,
          variant: 'failure',
        });
      },
      onSuccess: () => {
        showToast({
          title: `Saved to your repository!`,
          variant: 'success',
        });
      },
    },
  );

  const handleSave = () => {
    saveMutation.mutate({
      profileId,
      token: token as string,
    });
    setSaved(true);
    gaEvent({
      action: 'offers.profile_submission_save_to_profile',
      category: 'engagement',
      label: 'Save to profile in profile submission',
    });
  };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-2xl text-center">
        <h5 className="mb-6 text-4xl font-bold text-slate-900">
          Save for future edits
        </h5>
        <p className="mb-2 text-slate-900">We value your privacy.</p>
        <p className="mb-5 text-slate-900">
          To keep you offer profile strictly anonymous, only people who have the
          link below can edit it.
        </p>
        <div className="mb-20 grid grid-cols-12 gap-4">
          <div className="col-span-11">
            <TextInput
              disabled={true}
              isLabelHidden={true}
              label="Edit link"
              value={getProfileLink(profileId, token)}
            />
          </div>
          <Button
            icon={DocumentDuplicateIcon}
            isLabelHidden={true}
            label="Copy"
            variant="primary"
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
        <p className="mb-5 text-slate-900">
          If you do not want to keep the edit link, you can opt to save this
          profile under your account's respository. It will still only be
          editable by you.
        </p>
        <div className="mb-20">
          <Button
            disabled={isSaved}
            icon={isSaved ? CheckIcon : BookmarkSquareIcon}
            isLoading={saveMutation.isLoading}
            label={isSaved ? 'Saved to user profile' : 'Save to user profile'}
            variant="primary"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
