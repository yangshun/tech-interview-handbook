import clsx from 'clsx';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export type SlideOutSize = 'lg' | 'md' | 'sm' | 'xl';
export type SlideOutEnterFrom = 'end' | 'start';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  enterFrom?: SlideOutEnterFrom;
  isShown?: boolean;
  onClose?: () => void;
  size: SlideOutSize;
  title?: string;
}>;

const sizeClasses: Record<SlideOutSize, string> = {
  lg: 'max-w-lg',
  md: 'max-w-md',
  sm: 'max-w-sm',
  xl: 'max-w-xl',
};

const enterFromClasses: Record<
  SlideOutEnterFrom,
  Readonly<{ hidden: string; position: string; shown: string }>
> = {
  end: {
    hidden: 'translate-x-full',
    position: 'ml-auto',
    shown: 'translate-x-0',
  },
  start: {
    hidden: '-translate-x-full',
    position: 'mr-auto',
    shown: 'translate-x-0',
  },
};

export default function SlideOut({
  children,
  className,
  enterFrom = 'end',
  isShown = false,
  size,
  title,
  onClose,
}: Props) {
  const enterFromClass = enterFromClasses[enterFrom];

  return (
    <Transition.Root as={Fragment} show={isShown}>
      <Dialog
        as="div"
        className={clsx('relative z-40', className)}
        onClose={() => onClose?.()}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={enterFromClass.hidden}
            enterTo={enterFromClass.shown}
            leave="transition ease-in-out duration-300 transform"
            leaveFrom={enterFromClass.shown}
            leaveTo={enterFromClass.hidden}>
            <Dialog.Panel
              className={clsx(
                'relative flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl',
                enterFromClass.position,
                sizeClasses[size],
              )}>
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-slate-900">{title}</h2>
                <button
                  className="focus:ring-primary-500 -mr-2 flex h-10 w-10 items-center justify-center rounded-full p-2 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset"
                  type="button"
                  onClick={() => onClose?.()}>
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
