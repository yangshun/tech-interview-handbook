import React, { createContext, useContext, useState } from 'react';

import type { ToastMessage } from './Toast';
import Toast from './Toast';

type Context = Readonly<{
  showToast: (message: ToastMessage) => void;
}>;

export const ToastContext = createContext<Context>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showToast: (_: ToastMessage) => {},
});

const getID = (() => {
  let id = 0;

  return () => {
    return id++;
  };
})();

type ToastData = ToastMessage & {
  id: number;
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastsProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Array<ToastData>>([]);

  function showToast({ title, subtitle, variant }: ToastMessage) {
    setToasts([{ id: getID(), subtitle, title, variant }, ...toasts]);
  }

  function closeToast(id: number) {
    setToasts((oldToasts) => {
      const newToasts = oldToasts.filter((toast) => toast.id !== id);
      return newToasts;
    });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-10 flex items-end px-4 py-6 sm:p-6">
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {toasts.map(({ id, title, subtitle, variant }) => (
            <Toast
              key={id}
              subtitle={subtitle}
              title={title}
              variant={variant}
              onClose={() => {
                closeToast(id);
              }}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
