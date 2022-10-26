export type BreadcrumbStep = {
  label: string;
  step?: number;
};

type BreadcrumbsProps = Readonly<{
  currentStep: number;
  setStep: (nextStep: number) => void;
  steps: Array<BreadcrumbStep>;
}>;

function getPrimaryText(text: string) {
  return <p className="text-primary-700 text-sm">{text}</p>;
}

function getSlateText(text: string) {
  return <p className="text-sm text-slate-400">{text}</p>;
}

function getTextWithLink(text: string, onClickHandler: () => void) {
  return (
    <p
      className="hover:text-primary-700 cursor-pointer text-sm text-slate-400 hover:underline hover:underline-offset-2"
      onClick={onClickHandler}>
      {text}
    </p>
  );
}

export function Breadcrumbs({ steps, currentStep, setStep }: BreadcrumbsProps) {
  return (
    <div className="flex space-x-1">
      {steps.map(({ label, step }, index) => (
        <div key={label} className="flex space-x-1">
          {step === currentStep
            ? getPrimaryText(label)
            : step !== undefined
            ? getTextWithLink(label, () => setStep(step))
            : getSlateText(label)}
          {index !== steps.length - 1 && getSlateText('>')}
        </div>
      ))}
    </div>
  );
}
