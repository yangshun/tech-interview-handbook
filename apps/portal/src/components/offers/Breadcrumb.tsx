type BreadcrumbsProps = Readonly<{
  currentStep: number;
  stepLabels: Array<string>;
}>;

export function Breadcrumbs({ stepLabels, currentStep }: BreadcrumbsProps) {
  return (
    <div className="flex space-x-1">
      {stepLabels.map((label, index) => (
        <div key={label} className="flex space-x-1">
          {index === currentStep ? (
            <p className="text-primary-700 text-sm">{label}</p>
          ) : (
            <p className="text-sm text-slate-400">{label}</p>
          )}
          {index !== stepLabels.length - 1 && (
            <p className="text-sm text-slate-400">{'>'}</p>
          )}
        </div>
      ))}
    </div>
  );
}
