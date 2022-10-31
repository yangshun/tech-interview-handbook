import { PrismaClient } from '@prisma/client';

import { JobTitleLabels } from '../src/components/shared/JobTitles';

const prisma = new PrismaClient();

type QuestionCreateData = Parameters<
  typeof prisma.questionsQuestion.create
>[0]['data'];

function selectRandomRole() {
  const roles = Object.keys(JobTitleLabels);
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}

function generateRandomDate() {
  // Return a date between 2020 and 2022.
  const start = new Date(2020, 0, 1);
  const end = new Date(2022, 0, 1);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function generateRandomCodingAnswer() {
  return CODING_ANSWER_CONTENT[
    Math.floor(Math.random() * CODING_ANSWER_CONTENT.length)
  ];
}

function generateRandomBehavioralAnswer() {
  return BEHAVIORAL_ANSWER_CONTENT[
    Math.floor(Math.random() * BEHAVIORAL_ANSWER_CONTENT.length)
  ];
}

const CODING_QUESTION_CONTENT = [
  'Given a string, find the length of the longest substring without repeating characters.',
  'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
  'Given a contiguous sequence of numbers in which each number repeats thrice, there is exactly one missing number. Find the missing number.',
  'Find the contiguous subarray within an array (containing at least one number) which has the largest product.',
  'Find a contiguous subarray which has the largest sum.',
];

const BEHAVIORAL_QUESTION_CONTENT = [
  'Tell me about a time you had to work with a difficult person.',
  'Rate your communication skills on a scale of 1 to 10.',
  'Are you a team player?',
  'What is your greatest weakness?',
  'What is your greatest strength?',
  'What is your biggest accomplishment?',
  'What is your biggest failure?',
  'Be honest, how would your friends describe you?',
  'How do you handle stress?',
  'Let’s say you have a deadline to meet. How do you prioritize your work?',
];

const CODING_ANSWER_CONTENT = [
  'This question is easy. Just use a hash map.',
  'This question is hard. I have no idea how to solve it.',
  'This question is medium. I can solve it in 30 minutes.',
  'Can be done with a simple for loop.',
  'Simple recursion can solve this.',
  'Please explain the question again.',
  'Question is not clear.',
  'Brute force solution is the best.',
];

const BEHAVIORAL_ANSWER_CONTENT = [
  'This is a very common question. I have a lot of experience with this.',
  "I don't think this is a good question to ask. However, I can answer it.",
  'Most companies ask this question. I think you should ask something else.',
  'I try to take a step back and assess the situation. I figure out what is the most important thing to do and what can wait. I also try to delegate or ask for help when needed.',
  'I try to have a discussion with my manager or the person who I feel is not valuing my work. I try to explain how I feel and what I would like to see change.',
  'I try to have a discussion with the coworker. I try to understand their perspective and see if there is a way to resolve the issue.',
];

const CODING_QUESTIONS: Array<QuestionCreateData> = CODING_QUESTION_CONTENT.map(
  (content) => ({
    content,
    questionType: 'CODING',
    userId: null,
    encounters: {
      create: {
        role: selectRandomRole(),
        seenAt: generateRandomDate(),
      },
    },
  }),
);

const BEHAVIORAL_QUESTIONS: Array<QuestionCreateData> =
  BEHAVIORAL_QUESTION_CONTENT.map((content) => ({
    content,
    questionType: 'BEHAVIORAL',
    userId: null,
    encounters: {
      create: {
        role: selectRandomRole(),
        seenAt: generateRandomDate(),
      },
    },
  }));

const QUESTIONS: Array<QuestionCreateData> = [
  ...CODING_QUESTIONS,
  ...BEHAVIORAL_QUESTIONS,
];

async function main() {
  console.log('Performing preliminary checks...');

  const firstCompany = await prisma.company.findFirst();
  if (!firstCompany) {
    throw new Error(
      'No company found. Please seed db with some companies first.',
    );
  }

  const firstCity = await prisma.city.findFirst({
    include: {
      state: true,
    },
  });
  if (!firstCity) {
    throw new Error('No city found. Please seed db with some cities first.');
  }

  // Generate random answers to the questions
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    throw new Error('No users found. Please seed db with some users first.');
  }

  console.log('Seeding started...');

  console.log('Creating coding and behavioral questions...');
  await Promise.all([
    QUESTIONS.map(async (question) => {
      await prisma.questionsQuestion.create({
        data: {
          ...question,
          encounters: {
            create: {
              ...question.encounters!.create,
              companyId: firstCompany.id,
              stateId: firstCity.stateId,
              cityId: firstCity.id,
              countryId: firstCity.state.countryId,
            } as any,
          },
        },
      });
    }),
  ]);

  console.log('Creating answers to coding questions...');
  const codingQuestions = await prisma.questionsQuestion.findMany({
    where: {
      questionType: 'CODING',
    },
  });
  await Promise.all(
    codingQuestions.map(async (question) => {
      const answers = Array.from(
        { length: Math.floor(Math.random() * 5) },
        () => ({
          content: generateRandomCodingAnswer(),
          userId: users[Math.floor(Math.random() * users.length)].id,
          questionId: question.id,
        }),
      );

      await prisma.questionsAnswer.createMany({
        data: answers,
      });
    }),
  );

  console.log('Creating answers to behavioral questions...');
  const behavioralQuestions = await prisma.questionsQuestion.findMany({
    where: {
      questionType: 'BEHAVIORAL',
    },
  });

  await Promise.all(
    behavioralQuestions.map(async (question) => {
      const answers = Array.from(
        { length: Math.floor(Math.random() * 5) },

        () => ({
          content: generateRandomBehavioralAnswer(),
          userId: users[Math.floor(Math.random() * users.length)].id,
          questionId: question.id,
        }),
      );

      await prisma.questionsAnswer.createMany({
        data: answers,
      });
    }),
  );

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
