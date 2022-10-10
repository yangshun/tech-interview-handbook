import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useSearchFilter = <Value extends string = string>(
  name: string,
  defaultValues?: Array<Value>,
) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState<Array<Value>>(defaultValues || []);

  useEffect(() => {
    if (router.isReady && !isInitialized) {
      // Initialize from query params
      const query = router.query[name];
      if (query) {
        const queryValues = Array.isArray(query) ? query : [query];
        setFilters(queryValues as Array<Value>);
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
    (newFilters: Array<Value>) => {
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

export const useSearchFilterSingle = <Value extends string = string>(
  name: string,
  defaultValue: Value,
) => {
  const [filters, setFilters, isInitialized] = useSearchFilter(name, [
    defaultValue,
  ]);

  return [
    filters[0],
    (value: Value) => {
      setFilters([value]);
    },
    isInitialized,
  ] as const;
};
