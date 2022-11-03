import clsx from 'clsx';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export type BreadcrumbStep = Readonly<{
  label: string;
  step?: number;
}>;

type BreadcrumbsProps = Readonly<{
  currentStep: number;
  setStep: (nextStep: number) => void;
  steps: ReadonlyArray<BreadcrumbStep>;
}>;

export function Breadcrumbs({ steps, currentStep, setStep }: BreadcrumbsProps) {
  return (
    <nav aria-label="Submit offer stages" className="inline-flex">
      <ol className="mx-auto flex w-full space-x-2 sm:space-x-4" role="list">
        {steps.map(({ label, step }, index) => (
          <li key={step} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-slate-400"
              />
            )}
            <button
              aria-current={step === currentStep ? 'page' : undefined}
              className={clsx(
                'text-xs font-medium text-slate-600 sm:text-sm',
                index > 0 && 'ml-4',
                step != null ? 'hover:text-primary-500' : 'cursor-default',
                step === currentStep && 'text-primary-500',
              )}
              type="button"
              {...(step != null
                ? {
                    onClick: () => {
                      setStep(step);
                    },
                  }
                : {})}>
              {label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
