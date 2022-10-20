import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  BookmarkSquareIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button, Dialog, Spinner, Tabs } from '@tih/ui';

import ProfilePhotoHolder from '~/components/offers/profile/ProfilePhotoHolder';
import type { BackgroundCard } from '~/components/offers/types';

import { getProfileEditPath } from '~/utils/offers/link';

type ProfileHeaderProps = Readonly<{
  background?: BackgroundCard;
  handleDelete: () => void;
  isEditable: boolean;
  isLoading: boolean;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
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
  const router = useRouter();
  const { offerProfileId = '', token = '' } = router.query;

  const handleEditClick = () => {
    router.push(getProfileEditPath(offerProfileId as string, token as string));
  };

  function renderActionList() {
    return (
      <div className="space-x-2">
        <Button
          disabled={isLoading}
          icon={BookmarkSquareIcon}
          isLabelHidden={true}
          label="Save to user account"
          size="md"
          variant="tertiary"
        />
        <Button
          disabled={isLoading}
          icon={PencilSquareIcon}
          isLabelHidden={true}
          label="Edit"
          size="md"
          variant="tertiary"
          onClick={handleEditClick}
        />
        <Button
          disabled={isLoading}
          icon={TrashIcon}
          isLabelHidden={true}
          label="Delete"
          size="md"
          variant="tertiary"
          onClick={() => setIsDialogOpen(true)}
        />
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
              All comments will be gone. You will not be able to access or
              recover it.
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
  return (
    <div className="h-40 bg-white p-4">
      <div className="justify-left flex h-1/2">
        <div className="mx-4 mt-2">
          <ProfilePhotoHolder />
        </div>
        <div className="w-full">
          <div className="justify-left flex flex-1">
            <h2 className="flex w-4/5 text-2xl font-bold">
              {background?.profileName ?? 'anonymous'}
            </h2>
            {isEditable && (
              <div className="flex h-8 w-1/5 justify-end">
                {renderActionList()}
              </div>
            )}
          </div>
          <div className="flex flex-row">
            <BuildingOffice2Icon className="mr-2.5 h-5" />
            <span className="mr-2 font-bold">Current:</span>
            <span>
              {`${background?.experiences[0]?.companyName ?? '-'} ${
                background?.experiences[0]?.jobLevel || ''
              } ${background?.experiences[0]?.jobTitle || ''}`}
            </span>
          </div>
          <div className="flex flex-row">
            <CalendarDaysIcon className="mr-2.5 h-5" />
            <span className="mr-2 font-bold">YOE:</span>
            <span className="mr-4">{background?.totalYoe}</span>
            {background?.specificYoes &&
              background?.specificYoes.length > 0 &&
              background?.specificYoes.map(({ domain, yoe }) => {
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
          tabs={[
            {
              label: 'Offers',
              value: 'offers',
            },
            {
              label: 'Background',
              value: 'background',
            },
            {
              label: 'Offer Engine Analysis',
              value: 'offerEngineAnalysis',
            },
          ]}
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
        />
      </div>
    </div>
  );
}
