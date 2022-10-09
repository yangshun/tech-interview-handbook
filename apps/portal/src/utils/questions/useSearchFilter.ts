import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useSearchFilter = (
  name: string,
  defaultValues?: Array<string>,
) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState<Array<string>>(defaultValues || []);

  useEffect(() => {
    if (router.isReady && !isInitialized) {
      // Initialize from query params
      const query = router.query[name];
      if (query) {
        const queryValues = Array.isArray(query) ? query : [query];
        setFilters(queryValues);
      } else {
        // Try to load from local storage
        const localStorageValue = localStorage.getItem(name);
        if (localStorageValue !== null) {
          const loadedFilters = JSON.parse(localStorageValue);
          setFilters(loadedFilters);
          router.replace({
            pathname: router.pathname,
            query: {
              ...router.query,
              [name]: loadedFilters,
            },
          });
        }
      }
      setIsInitialized(true);
    }
  }, [isInitialized, name, router]);

  const setFiltersCallback = useCallback(
    (newFilters: Array<string>) => {
      setFilters(newFilters);
      localStorage.setItem(name, JSON.stringify(newFilters));
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          [name]: newFilters,
        },
      });
    },
    [name, router],
  );

  return [filters, setFiltersCallback, isInitialized] as const;
};

export const useSearchFilterSingle = (name: string, defaultValue: string) => {
  const [filters, setFilters, isInitialized] = useSearchFilter(name, [
    defaultValue,
  ]);

  return [
    filters[0],
    (value: string) => {
      setFilters([value]);
    },
    isInitialized,
  ] as const;
};
