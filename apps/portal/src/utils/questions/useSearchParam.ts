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

  const [params, setParams] = useState<Array<Value>>(defaultValues || []);

  useEffect(() => {
    if (router.isReady && !isInitialized) {
      // Initialize from query params
      const query = router.query[name];
      if (query) {
        const queryValues = Array.isArray(query) ? query : [query];
        setParams(
          queryValues
            .map(stringToParam)
            .filter((value) => value !== null) as Array<Value>,
        );
      } else {
        // Try to load from local storage
        const localStorageValue = localStorage.getItem(name);
        if (localStorageValue !== null) {
          const loadedFilters = JSON.parse(localStorageValue) as Array<string>;
          setParams(
            loadedFilters
              .map(stringToParam)
              .filter((value) => value !== null) as Array<Value>,
          );
        }
      }
      setIsInitialized(true);
    }
  }, [isInitialized, name, stringToParam, router]);

  const setParamsCallback = useCallback(
    (newParams: Array<Value>) => {
      setParams(newParams);
      localStorage.setItem(
        name,
        JSON.stringify(
          newParams.map(valueToQueryParam).filter((param) => param !== null),
        ),
      );
    },
    [name, valueToQueryParam],
  );

  return [params, setParamsCallback, isInitialized] as const;
};

export const useSearchParamSingle = <Value = string>(
  name: string,
  opts?: Omit<SearchParamOptions<Value>, 'defaultValues'> & {
    defaultValue?: Value;
  },
) => {
  const { defaultValue, ...restOpts } = opts ?? {};
  const [params, setParams, isInitialized] = useSearchParam<Value>(name, {
    defaultValues: defaultValue !== undefined ? [defaultValue] : undefined,
    ...restOpts,
  } as SearchParamOptions<Value>);

  return [
    params[0],
    (value: Value) => setParams([value]),
    isInitialized,
  ] as const;
};
