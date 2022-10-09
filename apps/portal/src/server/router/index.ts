import superjson from 'superjson';

import { createRouter } from './context';
import { protectedExampleRouter } from './protected-example-router';
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
  .merge('resumes.resume.', resumesRouter)
  .merge('resumes.resume.user.', resumesResumeUserRouter)
  .merge('resumes.star.user.', resumesStarUserRouter)
  .merge('resumes.reviews.', resumeReviewsRouter)
  .merge('resumes.reviews.user.', resumesReviewsUserRouter)
  .merge('questions.questions.', questionsQuestionRouter);

// Export type definition of API
export type AppRouter = typeof appRouter;
