import { useState } from 'react';
import { Button, Tabs } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import { COMMENTS_SECTIONS } from './constants';

type CommentsListProps = Readonly<{
  resumeId: string;
  setShowCommentsForm: (show: boolean) => void;
}>;

export default function CommentsList({
  resumeId,
  setShowCommentsForm,
}: CommentsListProps) {
  const [tab, setTab] = useState(COMMENTS_SECTIONS[0].value);

  const commentsQuery = trpc.useQuery(['resumes.reviews.list', { resumeId }]);

  /* eslint-disable no-console */
  console.log(commentsQuery.data);
  /* eslint-enable no-console */

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
