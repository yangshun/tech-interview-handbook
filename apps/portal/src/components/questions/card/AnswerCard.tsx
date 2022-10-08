import VotingButtons from '../VotingButtons';

export type AnswerCardProps = {
  author: string;
  content: string;
  upvoteCount: number;
};

export default function AnswerCard({
  author,
  upvoteCount,
  content,
}: AnswerCardProps) {
  return (
    <div className="flex gap-4 rounded-md border p-4">
      <VotingButtons upvoteCount={upvoteCount} />
      <div>
        <h1 className="font-bold">{author}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
}
