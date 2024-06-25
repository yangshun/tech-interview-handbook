import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import superjson from 'superjson';
import { ToastsProvider } from '~/ui';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';

import AppShell from '~/components/global/AppShell';
import ProtectedContextProvider from '~/components/questions/protected/ProtectedContextProvider';

import type { AppRouter } from '~/server/router';

import '~/styles/globals.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastsProvider>
        <ProtectedContextProvider>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </ProtectedContextProvider>
      </ToastsProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  } // Browser should use relative url
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  } // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // Dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx: _ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
      transformer: superjson,
      url,
      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
