import { Spinner } from '@tih/ui';

import ResumseListItem from './ResumeListItem';

import type { Resume } from '~/types/resume';

type Props = Readonly<{
  isLoading: boolean;
  resumes: Array<Resume>;
}>;

export default function ResumeListItems({ isLoading, resumes }: Props) {
  if (isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  return (
    <ul role="list">
      {resumes.map((resumeObj: Resume) => (
        <li key={resumeObj.id}>
          <ResumseListItem
            href={`resumes/${resumeObj.id}`}
            resumeInfo={resumeObj}
          />
        </li>
      ))}
    </ul>
  );
}
