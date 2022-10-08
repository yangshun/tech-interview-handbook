import type { ChangeEvent } from 'react';
import { createContext, useContext } from 'react';

type RadioListContextValue<T = unknown> = {
  defaultValue?: T;
  name?: string;
  onChange?: (
    value: T,
    event: ChangeEvent<HTMLInputElement>,
  ) => undefined | void;
  value?: T;
};

export const RadioListContext =
  createContext<RadioListContextValue<unknown> | null>(null);
export function useRadioListContext<T>(): RadioListContextValue<T> | null {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore TODO: Figure out how to type useContext with generics.
  return useContext<T>(RadioListContext);
}
