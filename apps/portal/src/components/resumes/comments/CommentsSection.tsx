import { useState } from 'react';

import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

type ICommentsSectionProps = {
  resumeId: string;
};

export default function CommentsSection({ resumeId }: ICommentsSectionProps) {
  const [showCommentsForm, setShowCommentsForm] = useState(false);

  return showCommentsForm ? (
    <CommentsForm
      resumeId={resumeId}
      setShowCommentsForm={setShowCommentsForm}
    />
  ) : (
    <CommentsList
      resumeId={resumeId}
      setShowCommentsForm={setShowCommentsForm}
    />
  );
}
