import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

import ProtectedDialog from './ProtectedDialog';

export type ProtectedContextData = {
  showDialog: () => void;
};

export const ProtectedContext = createContext<ProtectedContextData>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showDialog: () => {},
});

export type ProtectedContextProviderProps = PropsWithChildren<
  Record<string, unknown>
>;

export default function ProtectedContextProvider({
  children,
}: ProtectedContextProviderProps) {
  const [show, setShow] = useState(false);

  return (
    <ProtectedContext.Provider
      value={{
        showDialog: () => {
          setShow(true);
        },
      }}>
      {children}
      <ProtectedDialog
        show={show}
        onClose={() => {
          setShow(false);
        }}
      />
    </ProtectedContext.Provider>
  );
}
