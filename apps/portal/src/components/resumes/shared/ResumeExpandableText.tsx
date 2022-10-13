import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

type ResumeExpandableTextProps = Readonly<{
  children: ReactNode;
}>;

export default function ResumeExpandableText({
  children,
}: ResumeExpandableTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);

  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
      setDescriptionOverflow(true);
    }
  }, [ref]);

  const onSeeActionClicked = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  return (
    <>
      <span
        ref={ref}
        className={clsx(
          'whitespace-pre-wrap text-sm',
          'line-clamp-3',
          descriptionExpanded ? 'line-clamp-none' : '',
        )}>
        {children}
      </span>
      {descriptionOverflow && (
        <div className="flex flex-row">
          <div
            className="text-xs text-indigo-500 hover:text-indigo-300"
            onClick={onSeeActionClicked}>
            {descriptionExpanded ? 'See Less' : 'See More'}
          </div>
        </div>
      )}
    </>
  );
}
