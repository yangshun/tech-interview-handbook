import { QuestionsQuestionType } from '@prisma/client';

import type { FilterChoices } from '~/components/questions/filter/FilterSection';

import { SortOrder, SortType } from '~/types/questions.d';

export const APP_TITLE = 'Questions Bank';

export const COMPANIES: FilterChoices = [
  {
    id: 'Google',
    label: 'Google',
    value: 'Google',
  },
  {
    id: 'Meta',
    label: 'Meta',
    value: 'Meta',
  },
] as const;

// Code, design, behavioral
export const QUESTION_TYPES: FilterChoices<QuestionsQuestionType> = [
  {
    id: 'CODING',
    label: 'Coding',
    value: 'CODING',
  },
  {
    id: 'SYSTEM_DESIGN',
    label: 'System Design',
    value: 'SYSTEM_DESIGN',
  },
  {
    id: 'BEHAVIORAL',
    label: 'Behavioral',
    value: 'BEHAVIORAL',
  },
  {
    id: 'THEORY',
    label: 'Theory',
    value: 'THEORY',
  },
] as const;

export type QuestionAge = 'all' | 'last-6-months' | 'last-month' | 'last-year';

export const QUESTION_AGES: FilterChoices<QuestionAge> = [
  {
    id: 'last-month',
    label: 'Last month',
    value: 'last-month',
  },
  {
    id: 'last-6-months',
    label: 'Last 6 months',
    value: 'last-6-months',
  },
  {
    id: 'last-year',
    label: 'Last year',
    value: 'last-year',
  },
  {
    id: 'all',
    label: 'All',
    value: 'all',
  },
] as const;

export const SORT_ORDERS = [
  {
    label: 'Descending',
    value: SortOrder.DESC,
  },
  {
    label: 'Ascending',
    value: SortOrder.ASC,
  },
];

export const SORT_TYPES = [
  {
    label: 'Upvotes',
    value: SortType.TOP,
  },
  {
    label: 'Date',
    value: SortType.NEW,
  },
];

export const QUESTION_SORT_TYPES = [
  {
    label: 'Upvotes',
    value: SortType.TOP,
  },
  {
    label: 'Age',
    value: SortType.NEW,
  },
  {
    label: 'Received',
    value: SortType.ENCOUNTERS,
  },
];

export const SAMPLE_QUESTION = {
  answerCount: 10,
  commentCount: 10,
  companies: { Google: 1 },
  content:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and',
  createdAt: new Date(2014, 8, 1, 11, 30, 40),
  id: '1',
  locations: { 'Menlo Park, CA': 1 },
  receivedCount: 12,
  roles: { 'Software Engineer': 1 },
  seenAt: new Date(2014, 8, 1, 11, 30, 40),
  timestamp: 'Last month',

  type: QuestionsQuestionType.CODING,
  upvoteCount: 5,
};

export const SAMPLE_ANSWER = {
  authorImageUrl: 'https://avatars.githubusercontent.com/u/66356390?v=4',
  authorName: 'Jeff Sieu',
  commentCount: 10,
  content: 'This is a sample answer',
  createdAt: new Date(2014, 8, 1, 11, 30, 40),
  upvoteCount: 10,
};

export const SAMPLE_QUESTION_COMMENT = {
  authorImageUrl: 'https://avatars.githubusercontent.com/u/66356390?v=4',
  authorName: 'Jeff Sieu',
  content: 'This is a sample question comment',
  createdAt: new Date(2014, 8, 1, 11, 30, 40),
  upvoteCount: 10,
};

export const SAMPLE_ANSWER_COMMENT = {
  authorImageUrl: 'https://avatars.githubusercontent.com/u/66356390?v=4',
  authorName: 'Jeff Sieu',
  content: 'This is an sample answer comment',
  createdAt: new Date(2014, 8, 1, 11, 30, 40),
  upvoteCount: 10,
};
