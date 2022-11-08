import superjson from 'superjson';

import { companiesRouter } from './companies-router';
import { createRouter } from './context';
import { locationsRouter } from './locations-router';
import { offersRouter } from './offers/offers';
import { offerAdminRouter } from './offers/offers-admin-router';
import { offersAnalysisRouter } from './offers/offers-analysis-router';
import { offersCommentsRouter } from './offers/offers-comments-router';
import { offersProfileRouter } from './offers/offers-profile-router';
import { offersUserProfileRouter } from './offers/offers-user-profile-router';
import { protectedExampleRouter } from './protected-example-router';
import { questionsAnswerCommentRouter } from './questions/questions-answer-comment-router';
import { questionsAnswerCommentUserRouter } from './questions/questions-answer-comment-user-router';
import { questionsAnswerRouter } from './questions/questions-answer-router';
import { questionsAnswerUserRouter } from './questions/questions-answer-user-router';
import { questionsListRouter } from './questions/questions-list-router';
import { questionsQuestionCommentRouter } from './questions/questions-question-comment-router';
import { questionsQuestionCommentUserRouter } from './questions/questions-question-comment-user-router';
import { questionsQuestionEncounterRouter } from './questions/questions-question-encounter-router';
import { questionsQuestionEncounterUserRouter } from './questions/questions-question-encounter-user-router';
import { questionsQuestionRouter } from './questions/questions-question-router';
import { questionsQuestionUserRouter } from './questions/questions-question-user-router';
import { resumeCommentsRouter } from './resumes/resumes-comments-router';
import { resumesCommentsUserRouter } from './resumes/resumes-comments-user-router';
import { resumesCommentsVotesRouter } from './resumes/resumes-comments-votes-router';
import { resumesCommentsVotesUserRouter } from './resumes/resumes-comments-votes-user-router';
import { resumesRouter } from './resumes/resumes-resume-router';
import { resumesResumeUserRouter } from './resumes/resumes-resume-user-router';
import { resumesStarUserRouter } from './resumes/resumes-star-user-router';
import { todosRouter } from './todos';
import { todosUserRouter } from './todos-user-router';
import { userRouter } from './user-router';

export const appRouter = createRouter()
  .transformer(superjson)

  // All keys should be delimited by a period and end with a period.
  // Example routers. Learn more about tRPC routers: https://trpc.io/docs/v9/router
  .merge('auth.', protectedExampleRouter)
  .merge('user.', userRouter)
  .merge('todos.', todosRouter)
  .merge('todos.user.', todosUserRouter)
  .merge('companies.', companiesRouter)
  .merge('locations.', locationsRouter)
  .merge('resumes.resume.', resumesRouter)
  .merge('resumes.resume.user.', resumesResumeUserRouter)
  .merge('resumes.resume.', resumesStarUserRouter)
  .merge('resumes.comments.', resumeCommentsRouter)
  .merge('resumes.comments.user.', resumesCommentsUserRouter)
  .merge('resumes.comments.votes.', resumesCommentsVotesRouter)
  .merge('resumes.comments.votes.user.', resumesCommentsVotesUserRouter)
  .merge('questions.answers.comments.', questionsAnswerCommentRouter)
  .merge('questions.answers.comments.user.', questionsAnswerCommentUserRouter)
  .merge('questions.answers.', questionsAnswerRouter)
  .merge('questions.answers.user.', questionsAnswerUserRouter)
  .merge('questions.lists.', questionsListRouter)
  .merge('questions.questions.comments.', questionsQuestionCommentRouter)
  .merge(
    'questions.questions.comments.user.',
    questionsQuestionCommentUserRouter,
  )
  .merge('questions.questions.encounters.', questionsQuestionEncounterRouter)
  .merge(
    'questions.questions.encounters.user.',
    questionsQuestionEncounterUserRouter,
  )
  .merge('questions.questions.', questionsQuestionRouter)
  .merge('questions.questions.user.', questionsQuestionUserRouter)
  .merge('offers.', offersRouter)
  .merge('offers.profile.', offersProfileRouter)
  .merge('offers.analysis.', offersAnalysisRouter)
  .merge('offers.comments.', offersCommentsRouter)
  .merge('offers.user.profile.', offersUserProfileRouter)
  .merge('offers.admin.', offerAdminRouter);

// Export type definition of API
export type AppRouter = typeof appRouter;
