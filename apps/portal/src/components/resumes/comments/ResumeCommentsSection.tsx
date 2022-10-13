import { useState } from 'react';

import ResumeCommentsForm from './ResumeCommentsForm';
import ResumeCommentsList from './ResumeCommentsList';

type CommentsSectionProps = {
  resumeId: string;
};

export default function ResumeCommentsSection({
  resumeId,
}: CommentsSectionProps) {
  const [showCommentsForm, setShowCommentsForm] = useState(false);

  return (
    <>
      <div className="relative p-2 lg:hidden">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 px-3 text-lg font-medium text-gray-900">
            Reviews
          </span>
        </div>
      </div>
      {showCommentsForm ? (
        <ResumeCommentsForm
          resumeId={resumeId}
          setShowCommentsForm={setShowCommentsForm}
        />
      ) : (
        <ResumeCommentsList
          resumeId={resumeId}
          setShowCommentsForm={setShowCommentsForm}
        />
      )}
    </>
  );
}
