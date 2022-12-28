import { useRouter } from 'next/router';
import Script from 'next/script';
import { createContext, useContext, useEffect } from 'react';

type Context = Readonly<{
  event: (payload: GoogleAnalyticsEventPayload) => void;
}>;

const MEASUREMENT_ID = 'G-DBLZDQ2ZZN';

export const GoogleAnalyticsContext = createContext<Context>({
  event,
});

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function pageview(url: string) {
  // Don't log analytics during development.
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: url,
    page_title: document.title,
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
}>;

export function useGoogleAnalytics() {
  return useContext(GoogleAnalyticsContext);
}

export default function GoogleAnalytics({ children }: Props) {
  const router = useRouter();
  useEffect(() => {
    function handleRouteChange(url: string) {
      pageview(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events,]);

  return (
    <GoogleAnalyticsContext.Provider value={{ event }}>
      {children}
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        async={true}
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
        id="google-analytics"
      />
    </GoogleAnalyticsContext.Provider>
  );
}
