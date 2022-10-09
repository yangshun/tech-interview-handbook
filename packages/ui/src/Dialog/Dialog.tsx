import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';

type Props = Readonly<{
  children: React.ReactNode;
  isShown: boolean;
  onClose: () => void;
  primaryButton: React.ReactNode;
  secondaryButton?: React.ReactNode;
  title: string;
  topIcon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>;

export default function Dialog({
  children,
  isShown,
  primaryButton,
  title,
  topIcon: TopIcon,
  secondaryButton,
  onClose,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root as={Fragment} show={isShown}>
      <HeadlessDialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <HeadlessDialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  {TopIcon != null && (
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <TopIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-green-600"
                      />
                    </div>
                  )}
                  <div>
                    <HeadlessDialog.Title
                      as="h2"
                      className="text-2xl font-bold leading-6 text-slate-900">
                      {title}
                    </HeadlessDialog.Title>
                    <div className="my-4">
                      <div className="text-sm">{children}</div>
                    </div>
                  </div>
                </div>
                <div
                  className={clsx(
                    'mt-5 grid gap-3 sm:mt-6 sm:grid-flow-row-dense',
                    secondaryButton != null && 'sm:grid-cols-2',
                  )}>
                  {secondaryButton}
                  {primaryButton}
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
}
