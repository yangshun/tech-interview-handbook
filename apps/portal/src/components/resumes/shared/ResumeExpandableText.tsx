import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';

type ResumeExpandableTextProps = Readonly<{
  text: string;
}>;

export default function ResumeExpandableText({
  text,
}: ResumeExpandableTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);

  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
      setDescriptionOverflow(true);
    } else {
      setDescriptionOverflow(false);
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
          'line-clamp-3 whitespace-pre-wrap text-sm',
          isExpanded ? 'line-clamp-none' : '',
        )}>
        {text}
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
