import { useState } from 'react';

import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

export default function CommentsSection() {
  const [showCommentsForm, setShowCommentsForm] = useState(false);

  return showCommentsForm ? (
    <CommentsForm setShowCommentsForm={setShowCommentsForm} />
  ) : (
    <CommentsList setShowCommentsForm={setShowCommentsForm} />
  );
}
