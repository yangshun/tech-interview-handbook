import type {
  City,
  Company,
  Country,
  QuestionsQuestion,
  QuestionsQuestionVote,
  State,
} from '@prisma/client';
import { Vote } from '@prisma/client';

import type {
  AggregatedQuestionEncounter,
  CountryInfo,
  Question,
} from '~/types/questions';

type AggregatableEncounters = Array<{
  city: City | null;
  company: Company | null;
  country: Country | null;
  role: string;
  seenAt: Date;
  state: State | null;
}>;

type QuestionWithAggregatableData = QuestionsQuestion & {
  _count: {
    answers: number;
    comments: number;
  };
  encounters: AggregatableEncounters;
  user: {
    name: string | null;
  } | null;
  votes: Array<QuestionsQuestionVote>;
};

export function createQuestionWithAggregateData(
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

  const question: Question = {
    aggregatedQuestionEncounters: createAggregatedQuestionEncounter(
      data.encounters,
    ),
    content: data.content,
    id: data.id,
    lastSeenAt: data.lastSeenAt,
    numAnswers: data._count.answers,
    numComments: data._count.comments,
    numVotes: votes,
    receivedCount: data.encounters.length,
    type: data.questionType,
    updatedAt: data.updatedAt,
    user: data.user?.name ?? '',
  };
  return question;
}

export function createAggregatedQuestionEncounter(
  encounters: AggregatableEncounters,
): AggregatedQuestionEncounter {
  const countryCounts: Record<string, CountryInfo> = {};
  const companyCounts: Record<string, number> = {};
  const roleCounts: Record<string, number> = {};

  for (const encounter of encounters) {
    if (encounter.company !== null) {
      if (!(encounter.company.name in companyCounts)) {
        companyCounts[encounter.company!.name] = 0;
      }
      companyCounts[encounter.company!.name] += 1;
    }

    if (encounter.country !== null) {
      if (!(encounter.country.name in countryCounts)) {
        countryCounts[encounter.country.name] = {
          stateInfos: {},
          total: 0,
        };
      }
      const countryInfo = countryCounts[encounter.country.name];

      countryInfo.total += 1;

      const countryStateInfo = countryInfo.stateInfos;

      if (encounter.state !== null) {
        if (!(encounter.state.name in countryStateInfo)) {
          countryStateInfo[encounter.state.name] = {
            cityCounts: {},
            total: 0,
          };
        }
        const stateInfo = countryStateInfo[encounter.state.name];

        stateInfo.total += 1;

        const { cityCounts } = stateInfo;

        if (encounter.city !== null) {
          if (!(encounter.city.name in cityCounts)) {
            cityCounts[encounter.city.name] = 0;
          }
          cityCounts[encounter.city.name] += 1;
        }
      }
    }

    if (!(encounter.role in roleCounts)) {
      roleCounts[encounter.role] = 0;
    }
    roleCounts[encounter.role] += 1;
  }

  return {
    companyCounts,
    countryCounts,
    roleCounts,
  };
}
