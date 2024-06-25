import { Fragment, useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

type ToastVariant = 'failure' | 'success';

export type ToastMessage = {
  duration?: number;
  subtitle?: string;
  title: string;
  variant: ToastVariant;
};

type Props = Readonly<{
  duration?: number;
  onClose: () => void;
  subtitle?: string;
  title: string;
  variant: ToastVariant;
}>;

const DEFAULT_DURATION = 5000;

function ToastIcon({ variant }: Readonly<{ variant: ToastVariant }>) {
  switch (variant) {
    case 'success':
      return (
        <CheckIcon aria-hidden="true" className="text-success-500 h-6 w-6" />
      );
    case 'failure':
      return (
        <XMarkIcon aria-hidden="true" className="text-error-500 h-6 w-6" />
      );
  }
}

export default function Toast({
  duration = DEFAULT_DURATION,
  title,
  subtitle,
  variant,
  onClose,
}: Props) {
  const timer = useRef<number | null>(null);

  function clearTimer() {
    if (timer.current == null) {
      return;
    }

    window.clearTimeout(timer.current);
    timer.current = null;
  }

  function close() {
    onClose();
    clearTimer();
  }

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      close();
    }, duration);

    return () => {
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-2 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={true}>
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ToastIcon variant={variant} />
            </div>
            <div className="ml-3 w-0 flex-1 space-y-1 pt-0.5">
              <p className="text-sm font-medium text-slate-900">{title}</p>
              {subtitle && (
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                className="focus:ring-brand-500 inline-flex rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                type="button"
                onClick={close}>
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
