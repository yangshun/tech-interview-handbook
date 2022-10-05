import { useState } from 'react';
import { Button, Tabs } from '@tih/ui';

import { COMMENTS_SECTIONS } from './constants';

type CommentsListProps = Readonly<{
  setShowCommentsForm: (show: boolean) => void;
}>;

export default function CommentsList({
  setShowCommentsForm,
}: CommentsListProps) {
  const [tab, setTab] = useState(COMMENTS_SECTIONS[0].value);

  return (
    <>
      <Button
        display="block"
        label="Add your review"
        variant="tertiary"
        onClick={() => setShowCommentsForm(true)}
      />
      <Tabs
        label="comments"
        tabs={COMMENTS_SECTIONS}
        value={tab}
        onChange={(value) => setTab(value)}
      />
      {/* TODO: Add comments lists */}
    </>
  );
}
