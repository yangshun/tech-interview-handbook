import type {
  City,
  State,
  Country,
  Company,
  QuestionsQuestion,
  QuestionsQuestionVote,
} from '@prisma/client';
import { Vote } from '@prisma/client';

import type { AggregatedQuestionEncounter, Question, CountryInfo} from '~/types/questions';

type AggregatableEncounters = Array<{
  company: Company | null;
  city: City | null;
  country: Country | null;
  state: State | null;
  role: string;
  seenAt: Date;
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

export function createAggregatedQuestionEncounter(
  encounters: AggregatableEncounters,
): AggregatedQuestionEncounter {
  const countryCounts: Record<string, CountryInfo> = {};
  const companyCounts: Record<string, number> = {};
  const roleCounts: Record<string, number> = {};

  let latestSeenAt = encounters[0].seenAt;

  for (const encounter of encounters) {
    latestSeenAt =
      latestSeenAt < encounter.seenAt ? encounter.seenAt : latestSeenAt;

    if (encounter.company !== null) {
      if (!(encounter.company.name in companyCounts)) {
        companyCounts[encounter.company!.name] = 0;
      }
      companyCounts[encounter.company!.name] += 1;
    }


    if (encounter.country !== null) {
      if (!(encounter.country.name in countryCounts)) {
        countryCounts[encounter.country.name] = {
          total: 0,
          stateInfos: {},
        };
      }
      const countryInfo = countryCounts[encounter.country.name];

      countryInfo.total += 1;

      const countryStateInfo = countryInfo.stateInfos;

      if (encounter.state !== null) {
        if (!(encounter.state.name in countryStateInfo)) {
          countryStateInfo[encounter.state.name] = {
            total: 0,
            cityCounts: {},
          };
        }
        const stateInfo = countryStateInfo[encounter.state.name];

        stateInfo.total += 1;

        const cityCounts = stateInfo.cityCounts;

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
    latestSeenAt,
    countryCounts,
    roleCounts,
  };
}
