import superjson from 'superjson';

import { companiesRouter } from './companies-router';
import { createRouter } from './context';
import { offersRouter } from './offers';
import { offersProfileRouter } from './offers-profile-router';
import { protectedExampleRouter } from './protected-example-router';
import { questionsAnswerCommentRouter } from './questions-answer-comment-router';
import { questionsAnswerRouter } from './questions-answer-router';
import { questionsQuestionCommentRouter } from './questions-question-comment-router';
import { questionsQuestionRouter } from './questions-question-router';
import { resumesRouter } from './resumes/resumes-resume-router';
import { resumesResumeUserRouter } from './resumes/resumes-resume-user-router';
import { resumeReviewsRouter } from './resumes/resumes-reviews-router';
import { resumesReviewsUserRouter } from './resumes/resumes-reviews-user-router';
import { resumesStarUserRouter } from './resumes/resumes-star-user-router';
import { todosRouter } from './todos';
import { todosUserRouter } from './todos-user-router';

export const appRouter = createRouter()
  .transformer(superjson)

  // All keys should be delimited by a period and end with a period.
  // Example routers. Learn more about tRPC routers: https://trpc.io/docs/v9/router
  .merge('auth.', protectedExampleRouter)
  .merge('todos.', todosRouter)
  .merge('todos.user.', todosUserRouter)
  .merge('companies.', companiesRouter)
  .merge('resumes.resume.', resumesRouter)
  .merge('resumes.resume.user.', resumesResumeUserRouter)
  .merge('resumes.resume.', resumesStarUserRouter)
  .merge('resumes.reviews.', resumeReviewsRouter)
  .merge('resumes.reviews.user.', resumesReviewsUserRouter)
  .merge('questions.answers.comments.', questionsAnswerCommentRouter)
  .merge('questions.answers.', questionsAnswerRouter)
  .merge('questions.questions.comments.', questionsQuestionCommentRouter)
  .merge('questions.questions.', questionsQuestionRouter)
  .merge('offers.', offersRouter)
  .merge('offers.profile.', offersProfileRouter);

// Export type definition of API
export type AppRouter = typeof appRouter;
