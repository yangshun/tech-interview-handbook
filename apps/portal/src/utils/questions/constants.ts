import type { QuestionsQuestionType } from '@prisma/client';

import type { FilterChoices } from '~/components/questions/filter/FilterSection';

export const COMPANIES: FilterChoices = [
  {
    label: 'Google',
    value: 'Google',
  },
  {
    label: 'Meta',
    value: 'Meta',
  },
] as const;

// Code, design, behavioral
export const QUESTION_TYPES: FilterChoices<QuestionsQuestionType> = [
  {
    label: 'Coding',
    value: 'CODING',
  },
  {
    label: 'Design',
    value: 'SYSTEM_DESIGN',
  },
  {
    label: 'Behavioral',
    value: 'BEHAVIORAL',
  },
] as const;

export type QuestionAge = 'all' | 'last-6-months' | 'last-month' | 'last-year';

export const QUESTION_AGES: FilterChoices<QuestionAge> = [
  {
    label: 'Last month',
    value: 'last-month',
  },
  {
    label: 'Last 6 months',
    value: 'last-6-months',
  },
  {
    label: 'Last year',
    value: 'last-year',
  },
  {
    label: 'All',
    value: 'all',
  },
] as const;

export const LOCATIONS: FilterChoices = [
  {
    label: 'Singapore',
    value: 'Singapore',
  },
  {
    label: 'Menlo Park',
    value: 'Menlo Park',
  },
  {
    label: 'California',
    value: 'california',
  },
  {
    label: 'Hong Kong',
    value: 'Hong Kong',
  },
  {
    label: 'Taiwan',
    value: 'Taiwan',
  },
] as const;

export const SAMPLE_QUESTION = {
  answerCount: 10,
  commentCount: 10,
  company: 'Google',
  content:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums andiven an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and',
  location: 'Menlo Park, CA',
  receivedCount: 12,
  role: 'Software Engineer',
  timestamp: 'Last month',
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
