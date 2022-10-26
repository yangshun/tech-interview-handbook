import type {
  Company,
  QuestionsQuestion,
  QuestionsQuestionVote,
} from '@prisma/client';
import { Vote } from '@prisma/client';

import type { Question } from '~/types/questions';

type QuestionWithAggregatableData = QuestionsQuestion & {
  _count: {
    answers: number;
    comments: number;
  };
  encounters: Array<{
    company: Company | null;
    location: string;
    role: string;
    seenAt: Date;
  }>;
  user: {
    name: string | null;
  } | null;
  votes: Array<QuestionsQuestionVote>;
};

export default function createQuestionWithAggregateData(
  data: QuestionWithAggregatableData,
): Question {
  const votes: number = data.votes.reduce(
    (previousValue: number, currentValue) => {
      let result: number = previousValue;

      switch (currentValue.vote) {
        case Vote.UPVOTE:
          result += 1;
          break;
        case Vote.DOWNVOTE:
          result -= 1;
          break;
      }
      return result;
    },
    0,
  );

  const companyCounts: Record<string, number> = {};
  const locationCounts: Record<string, number> = {};
  const roleCounts: Record<string, number> = {};

  let latestSeenAt = data.encounters[0].seenAt;

  for (const encounter of data.encounters) {
    latestSeenAt =
      latestSeenAt < encounter.seenAt ? encounter.seenAt : latestSeenAt;

    if (!(encounter.company!.name in companyCounts)) {
      companyCounts[encounter.company!.name] = 0;
    }
    companyCounts[encounter.company!.name] += 1;

    if (!(encounter.location in locationCounts)) {
      locationCounts[encounter.location] = 0;
    }
    locationCounts[encounter.location] += 1;

    if (!(encounter.role in roleCounts)) {
      roleCounts[encounter.role] = 0;
    }
    roleCounts[encounter.role] += 1;
  }

  const question: Question = {
    aggregatedQuestionEncounters: {
      companyCounts,
      latestSeenAt,
      locationCounts,
      roleCounts,
    },
    content: data.content,
    id: data.id,
    numAnswers: data._count.answers,
    numComments: data._count.comments,
    numVotes: votes,
    receivedCount: data.encounters.length,
    seenAt: data.encounters[0].seenAt,
    type: data.questionType,
    updatedAt: data.updatedAt,
    user: data.user?.name ?? '',
  };
  return question;
}
