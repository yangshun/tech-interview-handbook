import { NoSymbolIcon } from '@heroicons/react/24/outline';

import QuestionListCard from '~/components/questions/card/QuestionListCard';

import { SAMPLE_QUESTION } from '~/utils/questions/constants';
import createSlug from '~/utils/questions/createSlug';

export default function ListPage() {
  const questions = [SAMPLE_QUESTION, SAMPLE_QUESTION, SAMPLE_QUESTION];

  return (
    <main className="flex flex-1 flex-col items-stretch">
      <div>
        {(questions ?? []).map((question) => (
          <QuestionListCard
            key={question.id}
            company={question.company}
            content={question.content}
            href={`/questions/${question.id}/${createSlug(question.content)}`}
            location={question.location}
            questionId={question.id}
            receivedCount={0}
            role={question.role}
            timestamp={question.seenAt.toLocaleDateString(undefined, {
              month: 'short',
              year: 'numeric',
            })}
            type={question.type}
            onDelete={() => {
              // eslint-disable-next-line no-console
              console.log('delete');
            }}
          />
        ))}
        {questions?.length === 0 && (
          <div className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-200 p-4 text-slate-600">
            <NoSymbolIcon className="h-6 w-6" />
            <p>Your list is empty.</p>
          </div>
        )}
      </div>
    </main>
  );
}
