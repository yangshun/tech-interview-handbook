import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  BookmarkIcon as BookmarkIconOutline,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { Button, Dialog, Spinner, Tabs, useToast } from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import type { ProfileDetailTab } from '~/components/offers/constants';
import { JobTypeLabel } from '~/components/offers/constants';
import { profileDetailTabs } from '~/components/offers/constants';
import ProfilePhotoHolder from '~/components/offers/profile/ProfilePhotoHolder';
import type { BackgroundDisplayData } from '~/components/offers/types';
import Tooltip from '~/components/offers/util/Tooltip';

import { getProfileEditPath } from '~/utils/offers/link';
import { trpc } from '~/utils/trpc';

type ProfileHeaderProps = Readonly<{
  background?: BackgroundDisplayData;
  handleDelete: () => void;
  isEditable: boolean;
  isLoading: boolean;
  selectedTab: ProfileDetailTab;
  setSelectedTab: (tab: ProfileDetailTab) => void;
}>;

export default function ProfileHeader({
  background,
  handleDelete,
  isEditable,
  isLoading,
  selectedTab,
  setSelectedTab,
}: ProfileHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const router = useRouter();
  const trpcContext = trpc.useContext();

  const { offerProfileId = '', token = '' } = router.query;
  const { showToast } = useToast();
  const { data: session, status } = useSession();
  const { event: gaEvent } = useGoogleAnalytics();

  const handleEditClick = () => {
    gaEvent({
      action: 'offers.edit_profile',
      category: 'engagement',
      label: 'Edit profile',
    });
    router.push(getProfileEditPath(offerProfileId as string, token as string));
  };

  const isSavedQuery = trpc.useQuery(
    [
      `offers.profile.isSaved`,
      { profileId: offerProfileId as string, userId: session?.user?.id },
    ],
    {
      onSuccess: (res: boolean) => {
        setSaved(res);
      },
    },
  );

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
          {
            profileId: offerProfileId as string,
            userId: session?.user?.id,
          },
        ]);
        showToast({
          title: `Saved to dashboard!`,
          variant: 'success',
        });
      },
    },
  );

  const unsaveMutation = trpc.useMutation(
    ['offers.user.profile.removeFromUserProfile'],
    {
      onError: () => {
        showToast({
          title: `Failed to saved to dashboard!`,
          variant: 'failure',
        });
      },
      onSuccess: () => {
        trpcContext.invalidateQueries([
          'offers.profile.isSaved',
          {
            profileId: offerProfileId as string,
            userId: session?.user?.id,
          },
        ]);
        showToast({
          title: `Removed from dashboard!`,
          variant: 'success',
        });
      },
    },
  );

  const toggleSaved = () => {
    if (status === 'unauthenticated') {
      signIn();
    } else if (saved) {
      unsaveMutation.mutate({ profileId: offerProfileId as string });
    } else {
      saveMutation.mutate({
        profileId: offerProfileId as string,
        token: token as string,
      });
    }
  };

  function renderActionList() {
    return (
      <div className="flex justify-center space-x-2">
        <Tooltip
          tooltipContent={
            saved ? 'Remove from account' : 'Save to your account'
          }>
          <Button
            disabled={
              isLoading ||
              saveMutation.isLoading ||
              unsaveMutation.isLoading ||
              isSavedQuery.isLoading
            }
            icon={saved ? BookmarkIconSolid : BookmarkIconOutline}
            isLabelHidden={true}
            isLoading={
              isSavedQuery.isLoading ||
              saveMutation.isLoading ||
              unsaveMutation.isLoading
            }
            label={saved ? 'Remove from account' : 'Save to your account'}
            size="md"
            variant="tertiary"
            onClick={toggleSaved}
          />
        </Tooltip>
        <Tooltip tooltipContent="Edit profile">
          <Button
            disabled={isLoading}
            icon={PencilSquareIcon}
            isLabelHidden={true}
            label="Edit"
            size="md"
            variant="tertiary"
            onClick={handleEditClick}
          />
        </Tooltip>
        <Tooltip tooltipContent="Delete profile">
          <Button
            disabled={isLoading}
            icon={TrashIcon}
            isLabelHidden={true}
            label="Delete"
            size="md"
            variant="tertiary"
            onClick={() => setIsDialogOpen(true)}
          />
        </Tooltip>
        {isDialogOpen && (
          <Dialog
            isShown={isDialogOpen}
            primaryButton={
              <Button
                display="block"
                label="Delete"
                variant="primary"
                onClick={() => {
                  setIsDialogOpen(false);
                  handleDelete();
                }}
              />
            }
            secondaryButton={
              <Button
                display="block"
                label="Cancel"
                variant="tertiary"
                onClick={() => setIsDialogOpen(false)}
              />
            }
            title="Are you sure you want to delete this offer profile?"
            onClose={() => setIsDialogOpen(false)}>
            <div>
              All information and comments in this offer profile will be
              deleted. You will not be able to access or recover them.
            </div>
          </Dialog>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  if (!background) {
    return null;
  }

  const { experiences, totalYoe, specificYoes, profileName } = background;

  return (
    <div className="grid-rows-2 bg-white">
      <div className="grid grid-cols-5 p-4 md:grid-cols-7">
        <div className="col-span-5 flex justify-start space-x-4">
          <div className="mt-2 h-16 w-16">
            <ProfilePhotoHolder />
          </div>
          <div className="space-y-1">
            <h2 className="flex text-2xl font-bold">
              {profileName ?? 'anonymous'}
            </h2>
            {(experiences[0]?.company?.name ||
              experiences[0]?.jobLevel ||
              experiences[0]?.jobTitle) && (
              <div className="flex items-center text-sm text-slate-600">
                <span>
                  <BuildingOffice2Icon className="mr-2.5 h-5 w-5" />
                </span>
                <p>
                  <span className="mr-2 font-bold">Current:</span>
                  {`${experiences[0].company?.name || ''} ${
                    experiences[0].jobLevel || ''
                  } ${experiences[0].jobTitle || ''} ${
                    experiences[0].jobType
                      ? `(${JobTypeLabel[experiences[0].jobType]})`
                      : ''
                  }`}
                </p>
              </div>
            )}
            <div className="flex items-center text-sm text-slate-600">
              <CalendarDaysIcon className="mr-2.5 h-5" />
              <p>
                <span className="mr-2 font-bold">YOE:</span>
                <span className="mr-4">{totalYoe}</span>
                {specificYoes &&
                  specificYoes.length > 0 &&
                  specificYoes.map(({ domain, yoe }) => {
                    return (
                      <span
                        key={domain}
                        className="mr-4">{`${domain}: ${yoe}`}</span>
                    );
                  })}
              </p>
            </div>
          </div>
        </div>
        {isEditable && (
          <div className="col-span-2 col-end-6 flex h-8 justify-end md:col-end-8 md:pt-0">
            {renderActionList()}
          </div>
        )}
      </div>
      <div className="border-t border-slate-200 p-4">
        <Tabs
          label="Profile Detail Navigation"
          tabs={profileDetailTabs}
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
        />
      </div>
    </div>
  );
}
