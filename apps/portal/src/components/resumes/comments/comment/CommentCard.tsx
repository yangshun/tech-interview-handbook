import type { ReactNode } from 'react';

type CommentCardProps = {
  children: ReactNode;
  isCommentOwner?: boolean;
};

export default function CommentCard({
  isCommentOwner,
  children,
}: CommentCardProps) {
  // Used two different <div> to allow customisation of owner comments
  return isCommentOwner ? (
    <div className="border-primary-300 float-right w-3/4 rounded-md border-2 bg-white p-2 drop-shadow-md">
      {children}
    </div>
  ) : (
    <div className="border-primary-300 float-left w-3/4 rounded-md border-2 bg-white p-2 drop-shadow-md">
      {children}
    </div>
  );
}
