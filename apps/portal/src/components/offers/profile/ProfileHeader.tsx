import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  BookmarkIcon as BookmarkIconOutline,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { Button, Dialog, Spinner, Tabs, useToast } from '@tih/ui';

import ProfilePhotoHolder from '~/components/offers/profile/ProfilePhotoHolder';
import type { BackgroundDisplayData } from '~/components/offers/types';
import { JobTypeLabel } from '~/components/offers/types';

import { getProfileEditPath } from '~/utils/offers/link';
import { trpc } from '~/utils/trpc';

import type { ProfileDetailTab } from '../constants';
import { profileDetailTabs } from '../constants';
import Tooltip from '../util/Tooltip';

type ProfileHeaderProps = Readonly<{
  background?: BackgroundDisplayData;
  handleDelete: () => void;
  isEditable: boolean;
  isLoading: boolean;
  isSaved?: boolean;
  selectedTab: ProfileDetailTab;
  setSelectedTab: (tab: ProfileDetailTab) => void;
}>;

export default function ProfileHeader({
  background,
  handleDelete,
  isEditable,
  isLoading,
  isSaved = false,
  selectedTab,
  setSelectedTab,
}: ProfileHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Const [saved, setSaved] = useState(isSaved);
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const { offerProfileId = '', token = '' } = router.query;
  const { showToast } = useToast();
  const handleEditClick = () => {
    router.push(getProfileEditPath(offerProfileId as string, token as string));
  };

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
        // SetSaved(true);
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
        // SetSaved(false);
        showToast({
          title: `Removed from dashboard!`,
          variant: 'success',
        });
        trpcContext.invalidateQueries(['offers.profile.listOne']);
      },
    },
  );

  const toggleSaved = () => {
    if (isSaved) {
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
            isSaved ? 'Remove from account' : 'Save to your account'
          }>
          <Button
            disabled={
              isLoading || saveMutation.isLoading || unsaveMutation.isLoading
            }
            icon={isSaved ? BookmarkIconSolid : BookmarkIconOutline}
            isLabelHidden={true}
            isLoading={saveMutation.isLoading || unsaveMutation.isLoading}
            label={isSaved ? 'Remove from account' : 'Save to your account'}
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
    <div className="h-40 bg-white p-4">
      <div className="justify-left flex h-1/2">
        <div className="mx-4 mt-2">
          <ProfilePhotoHolder />
        </div>
        <div className="w-full">
          <div className="justify-left flex flex-1">
            <h2 className="flex w-4/5 text-2xl font-bold">
              {profileName ?? 'anonymous'}
            </h2>
            {isEditable && (
              <div className="flex h-8 w-1/5 justify-end">
                {renderActionList()}
              </div>
            )}
          </div>
          {(experiences[0]?.companyName ||
            experiences[0]?.jobLevel ||
            experiences[0]?.jobTitle) && (
            <div className="flex flex-row">
              <BuildingOffice2Icon className="mr-2.5 h-5" />
              <span className="mr-2 font-bold">Current:</span>
              <span>
                {`${experiences[0].companyName || ''} ${
                  experiences[0].jobLevel || ''
                } ${experiences[0].jobTitle || ''} ${
                  experiences[0].jobType
                    ? `(${JobTypeLabel[experiences[0].jobType]})`
                    : ''
                }`}
              </span>
            </div>
          )}
          <div className="flex flex-row">
            <CalendarDaysIcon className="mr-2.5 h-5" />
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
          </div>
        </div>
      </div>

      <div className="mt-8">
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
