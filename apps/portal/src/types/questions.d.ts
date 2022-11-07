import type { QuestionsQuestionType } from '@prisma/client';

export type Question = {
  aggregatedQuestionEncounters: AggregatedQuestionEncounter;
  content: string;
  id: string;
  lastSeenAt: Date | null;
  numAnswers: number;
  numComments: number;
  numVotes: number;
  receivedCount: number;
  type: QuestionsQuestionType;
  updatedAt: Date;
  user: string;
};

export type StateInfo = {
  cityCounts: Record<string, number>;
  total: number;
};

export type CountryInfo = {
  stateInfos: Record<string, StateInfo>;
  total: number;
};

export type CityLocation = {
  cityId: string;
  countryId: string;
  stateId: string;
};

export type StateLocation = {
  cityId?: never;
  countryId: string;
  stateId: string;
};

export type CountryLocation = {
  cityId?: never;
  countryId: string;
  stateId?: never;
};

export type Location = CityLocation | CountryLocation | StateLocation;

export type AggregatedQuestionEncounter = {
  companyCounts: Record<string, number>;
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
  ENCOUNTERS,
}
