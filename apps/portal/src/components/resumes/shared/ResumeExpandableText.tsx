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
  const [isExpanded, setIsExpanded] = useState(false);
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);

  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
      setDescriptionOverflow(true);
    }
  }, [ref]);

  const onSeeActionClicked = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <span
        ref={ref}
        className={clsx(
          'whitespace-pre-wrap text-sm',
          'line-clamp-3',
          isExpanded ? 'line-clamp-none' : '',
        )}>
        {children}
      </span>
      {descriptionOverflow && (
        <p
          className="mt-1 cursor-pointer text-xs text-indigo-500 hover:text-indigo-300"
          onClick={onSeeActionClicked}>
          {isExpanded ? 'See Less' : 'See More'}
        </p>
      )}
    </div>
  );
}
