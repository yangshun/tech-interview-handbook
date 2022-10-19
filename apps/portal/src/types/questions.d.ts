import type { QuestionsQuestionType } from '@prisma/client';

export type Question = {
  // TODO: company, location, role maps
  company: string;
  content: string;
  id: string;
  location: string;
  numAnswers: number;
  numComments: number;
  numVotes: number;
  role: string;
  seenAt: Date;
  type: QuestionsQuestionType;
  updatedAt: Date;
  user: string;
};

export type AggregatedQuestionEncounter = {
  companyCounts: Record<string, number>;
  locationCounts: Record<string, number>;
  roleCounts: Record<string, number>;
}

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
