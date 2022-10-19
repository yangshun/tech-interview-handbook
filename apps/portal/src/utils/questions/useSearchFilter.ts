import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useSearchFilter = <Value extends string = string>(
  name: string,
  opts: {
    defaultValues?: Array<Value>;
    queryParamToValue?: (param: string) => Value;
  } = {},
) => {
  const { defaultValues, queryParamToValue = (param) => param } = opts;
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState<Array<Value>>(defaultValues || []);

  useEffect(() => {
    if (router.isReady && !isInitialized) {
      // Initialize from query params
      const query = router.query[name];
      if (query) {
        const queryValues = Array.isArray(query) ? query : [query];
        setFilters(queryValues.map(queryParamToValue) as Array<Value>);
      } else {
        // Try to load from local storage
        const localStorageValue = localStorage.getItem(name);
        if (localStorageValue !== null) {
          const loadedFilters = JSON.parse(localStorageValue);
          setFilters(loadedFilters);
        }
      }
      setIsInitialized(true);
    }
  }, [isInitialized, name, queryParamToValue, router]);

  const setFiltersCallback = useCallback(
    (newFilters: Array<Value>) => {
      setFilters(newFilters);
      localStorage.setItem(name, JSON.stringify(newFilters));
    },
    [name],
  );

  return [filters, setFiltersCallback, isInitialized] as const;
};

export const useSearchFilterSingle = <Value extends string = string>(
  name: string,
  opts: {
    defaultValue?: Value;
    queryParamToValue?: (param: string) => Value;
  } = {},
) => {
  const { defaultValue, queryParamToValue } = opts;
  const [filters, setFilters, isInitialized] = useSearchFilter(name, {
    defaultValues: defaultValue !== undefined ? [defaultValue] : undefined,
    queryParamToValue,
  });

  return [
    filters[0],
    (value: Value) => setFilters([value]),
    isInitialized,
  ] as const;
};
