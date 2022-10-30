import type { QuestionsQuestionType } from '@prisma/client';

export type Question = {
  aggregatedQuestionEncounters: AggregatedQuestionEncounter;
  content: string;
  id: string;
  numAnswers: number;
  numComments: number;
  numVotes: number;
  receivedCount: number;
  seenAt: Date;
  type: QuestionsQuestionType;
  updatedAt: Date;
  user: string;
};

export type StateInfo = {
  total: number;
  cityCounts: Record<string, number>;
};

export type CountryInfo = {
  total: number;
  stateInfos: Record<string, StateInfo>;
};

export type AggregatedQuestionEncounter = {
  companyCounts: Record<string, number>;
  latestSeenAt: Date;
  countryCounts: Record<string, CountryInfo>;
  roleCounts: Record<string, number>;
};

export type AnswerComment = {
  content: string;
  createdAt: Date;
  id: string;
  numVotes: number;
  updatedAt: Date;
  user: string;
  userImage: string;
};

export type Answer = {
  content: string;
  createdAt: Date;
  id: string;
  numComments: number;
  numVotes: number;
  user: string;
  userImage: string;
};

export type QuestionComment = {
  content: string;
  createdAt: Date;
  id: string;
  numVotes: number;
  user: string;
  userImage: string;
};

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortType {
  TOP,
  NEW,
}
