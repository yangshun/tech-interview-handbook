import type { ReactNode } from 'react';

type ResumeCommentCardProps = {
  children: ReactNode;
};

export default function ResumeCommentCard({
  children,
}: ResumeCommentCardProps) {
  return (
    <div className="border-primary-300 w-3/4 rounded-md border-2 bg-white p-2 drop-shadow-md">
      {children}
    </div>
  );
}
