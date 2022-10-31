import { useSession } from 'next-auth/react';
import { useCallback, useContext } from 'react';

import { ProtectedContext } from '~/components/questions/protected/ProtectedContextProvider';

export const useProtectedCallback = <T extends Array<unknown>, U>(
  callback: (...args: T) => U,
) => {
  const { showDialog } = useContext(ProtectedContext);
  const { status } = useSession();

  const protectedCallback = useCallback(
    (...args: T) => {
      if (status === 'authenticated') {
        return callback(...args);
      }
      showDialog();
    },
    [callback, showDialog, status],
  );
  return protectedCallback;
};
