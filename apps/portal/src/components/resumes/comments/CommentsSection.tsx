import { useState } from 'react';

import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

type ICommentsSectionProps = {
  resumeId: string;
};

export default function CommentsSection({ resumeId }: ICommentsSectionProps) {
  const [showCommentsForm, setShowCommentsForm] = useState(false);

  return (
    <>
      <div className="relative p-2 lg:hidden">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 px-3 text-lg font-medium text-gray-900">
            Comments
          </span>
        </div>
      </div>
      {showCommentsForm ? (
        <CommentsForm
          resumeId={resumeId}
          setShowCommentsForm={setShowCommentsForm}
        />
      ) : (
        <CommentsList
          resumeId={resumeId}
          setShowCommentsForm={setShowCommentsForm}
        />
      )}
    </>
  );
}
