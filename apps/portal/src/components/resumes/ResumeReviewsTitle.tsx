import { Badge } from '@tih/ui';

export default function ResumeReviewsTitle() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Resume Reviews</h1>
      <Badge
        label="Check out reviewed resumes or look for resumes to review"
        variant="info"
      />
    </div>
  );
}
