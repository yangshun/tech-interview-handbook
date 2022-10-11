type BreadcrumbsProps = Readonly<{
  currentStep: number;
  stepLabels: Array<string>;
}>;

export function Breadcrumbs({ stepLabels, currentStep }: BreadcrumbsProps) {
  return (
    <div className="flex space-x-1">
      {stepLabels.map((label, index) => (
        <>
          {index === currentStep ? (
            <p className="text-sm text-purple-700">{label}</p>
          ) : (
            <p className="text-sm text-gray-400">{label}</p>
          )}
          {index !== stepLabels.length - 1 && (
            <p className="text-sm text-gray-400">{'>'}</p>
          )}
        </>
      ))}
    </div>
  );
}
