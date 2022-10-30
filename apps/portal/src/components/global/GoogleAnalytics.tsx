import Head from 'next/head';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect } from 'react';

type Context = Readonly<{
  event: (payload: GoogleAnalyticsEventPayload) => void;
}>;

export const GoogleAnalyticsContext = createContext<Context>({
  event,
});

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function pageview(measurementID: string, url: string) {
  // Don't log analytics during development.
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  window.gtag('config', measurementID, {
    page_path: url,
  });

  window.gtag('event', url, {
    event_category: 'pageview',
    event_label: document.title,
  });
}

type GoogleAnalyticsEventPayload = Readonly<{
  action: string;
  category: string;
  label: string;
  value?: number;
}>;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({
  action,
  category,
  label,
  value,
}: GoogleAnalyticsEventPayload) {
  // Don't log analytics during development.
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

type Props = Readonly<{
  children: React.ReactNode;
  measurementID: string;
}>;

export function useGoogleAnalytics() {
  return useContext(GoogleAnalyticsContext);
}

export default function GoogleAnalytics({ children, measurementID }: Props) {
  const router = useRouter();
  useEffect(() => {
    function handleRouteChange(url: string) {
      pageview(measurementID, url);
    }

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, measurementID]);

  return (
    <GoogleAnalyticsContext.Provider value={{ event }}>
      {children}
      <Head>
        {/* TODO(yangshun): Change back to next/script in future. */}
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async={true}
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
    </GoogleAnalyticsContext.Provider>
  );
}
