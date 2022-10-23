import ResumeListItem from './ResumeListItem';

import type { Resume } from '~/types/resume';

type Props = Readonly<{
  resumes: Array<Resume>;
}>;

export default function ResumeListItems({ resumes }: Props) {
  return (
    <ul role="list">
      {resumes.map((resumeObj: Resume) => (
        <li key={resumeObj.id}>
          <ResumeListItem
            href={`/resumes/${resumeObj.id}`}
            resumeInfo={resumeObj}
          />
        </li>
      ))}
    </ul>
  );
}
