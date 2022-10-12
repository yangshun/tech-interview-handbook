import { ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Button, Spinner } from '@tih/ui';

type ProfileHeaderProps = Readonly<{
  handleCopyEditLink: () => void;
  handleCopyPublicLink: () => void;
  isDisabled: boolean;
  isEditable: boolean;
  isLoading: boolean;
}>;

export default function ProfileComments({
  handleCopyEditLink,
  handleCopyPublicLink,
  isDisabled,
  isEditable,
  isLoading,
}: ProfileHeaderProps) {
  if (isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }
  return (
    <div className="m-4">
      <div className="flex-end flex justify-end space-x-4">
        {isEditable && (
          <Button
            addonPosition="start"
            disabled={isDisabled}
            icon={ClipboardDocumentIcon}
            isLabelHidden={false}
            label="Copy profile edit link"
            size="sm"
            variant="secondary"
            onClick={handleCopyEditLink}
          />
        )}
        <Button
          addonPosition="start"
          disabled={isDisabled}
          icon={ShareIcon}
          isLabelHidden={false}
          label="Copy public link"
          size="sm"
          variant="secondary"
          onClick={handleCopyPublicLink}
        />
      </div>
      <h2 className="mt-2 text-2xl font-bold">
        Discussions feature coming soon
      </h2>
      {/* <TextArea label="Comment" placeholder="Type your comment here" /> */}
    </div>
  );
}
