import { useState } from 'react';
import { Tabs } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import CommentListItems from './CommentListItems';
import CommentsListButton from './CommentsListButton';
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

  return (
    <div className="space-y-3">
      <CommentsListButton setShowCommentsForm={setShowCommentsForm} />
      <Tabs
        label="comments"
        tabs={COMMENTS_SECTIONS}
        value={tab}
        onChange={(value) => setTab(value)}
      />
      <CommentListItems
        comments={commentsQuery.data?.filter((c) => c.section === tab) ?? []}
        isLoading={commentsQuery.isFetching}
      />
    </div>
  );
}
