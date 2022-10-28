import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSearchParams = <T>(name: string, defaultValue: T) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState(defaultValue);

  useEffect(() => {
    if (router.isReady && !isInitialized) {
      // Initialize from url query params
      const query = router.query[name];
      if (query) {
        const parsedQuery =
          typeof query === 'string' ? JSON.parse(query) : query;
        setFilters(parsedQuery);
      }
      setIsInitialized(true);
    }
  }, [isInitialized, name, router]);

  return [filters, setFilters, isInitialized] as const;
};

export default useSearchParams;
