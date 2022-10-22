import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

type SearchParamOptions<Value> = [Value] extends [string]
  ? {
      defaultValues?: Array<Value>;
      paramToString?: (value: Value) => string | null;
      stringToParam?: (param: string) => Value | null;
    }
  : {
      defaultValues?: Array<Value>;
      paramToString: (value: Value) => string | null;
      stringToParam: (param: string) => Value | null;
    };

export const useSearchParam = <Value = string>(
  name: string,
  opts?: SearchParamOptions<Value>,
) => {
  const {
    defaultValues,
    stringToParam = (param: string) => param,
    paramToString: valueToQueryParam = (value: Value) => String(value),
  } = opts ?? {};
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState<Array<Value>>(defaultValues || []);

  useEffect(() => {
    if (router.isReady && !isInitialized) {
      // Initialize from query params
      const query = router.query[name];
      if (query) {
        const queryValues = Array.isArray(query) ? query : [query];
        setFilters(
          queryValues
            .map(stringToParam)
            .filter((value) => value !== null) as Array<Value>,
        );
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
  }, [isInitialized, name, stringToParam, router]);

  const setFiltersCallback = useCallback(
    (newFilters: Array<Value>) => {
      setFilters(newFilters);
      localStorage.setItem(
        name,
        JSON.stringify(
          newFilters.map(valueToQueryParam).filter((param) => param !== null),
        ),
      );
    },
    [name, valueToQueryParam],
  );

  return [filters, setFiltersCallback, isInitialized] as const;
};

export const useSearchParamSingle = <Value = string>(
  name: string,
  opts?: Omit<SearchParamOptions<Value>, 'defaultValues'> & {
    defaultValue?: Value;
  },
) => {
  const { defaultValue, ...restOpts } = opts ?? {};
  const [filters, setFilters, isInitialized] = useSearchParam<Value>(name, {
    defaultValues: defaultValue !== undefined ? [defaultValue] : undefined,
    ...restOpts,
  } as SearchParamOptions<Value>);

  return [
    filters[0],
    (value: Value) => setFilters([value]),
    isInitialized,
  ] as const;
};
