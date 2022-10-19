import { useState } from 'react';
import { setTimeout } from 'timers';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/20/solid';
import { BookmarkSquareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Button, TextInput } from '@tih/ui';

export default function OfferProfileSave() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const saveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 5);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-2xl text-center">
        <h5 className="mb-6 text-4xl font-bold text-gray-900">
          Save for future edits
        </h5>
        <p className="mb-2 text-gray-900">We value your privacy.</p>
        <p className="mb-5 text-gray-900">
          To keep you offer profile strictly anonymous, only people who have the
          link below can edit it.
        </p>
        <div className="mb-20 grid grid-cols-12 gap-4">
          <div className="col-span-11">
            <TextInput
              disabled={true}
              isLabelHidden={true}
              label="Edit link"
              value="link.myprofile-auto-generate..."
            />
          </div>
          <Button
            icon={DocumentDuplicateIcon}
            isLabelHidden={true}
            label="Copy"
            variant="primary"
            onClick={() => setLinkCopied(true)}
          />
        </div>
        <div className="mb-5">
          {linkCopied && (
            <p className="text-purple-700">Link copied to clipboard!</p>
          )}
        </div>

        <p className="mb-5 text-gray-900">
          If you do not want to keep the edit link, you can opt to save this
          profile under your user account. It will still only be editable by
          you.
        </p>
        <div className="mb-20">
          <Button
            disabled={isSaved}
            icon={isSaved ? CheckIcon : BookmarkSquareIcon}
            isLoading={isSaving}
            label="Save to user profile"
            variant="primary"
            onClick={saveProfile}
          />
        </div>
        <div className="mb-10">
          <Button icon={EyeIcon} label="View your profile" variant="special" />
        </div>
      </div>
    </div>
  );
}
