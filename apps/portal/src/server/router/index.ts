import superjson from 'superjson';

import { createRouter } from './context';
import { protectedExampleRouter } from './protected-example-router';
import { todosRouter } from './todos';
import { todosUserRouter } from './todos-user-router';

export const appRouter = createRouter()
  .transformer(superjson)

  // All keys should be delimited by a period and end with a period.
  // Example routers. Learn more about tRPC routers: https://trpc.io/docs/v9/router
  .merge('auth.', protectedExampleRouter)
  .merge('todos.', todosRouter)
  .merge('todos.user.', todosUserRouter);

// Export type definition of API
export type AppRouter = typeof appRouter;
