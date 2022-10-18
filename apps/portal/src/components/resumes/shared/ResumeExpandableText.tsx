import clsx from 'clsx';
import { useEffect, useState } from 'react';

type ResumeExpandableTextProps = Readonly<{
  text: string;
}>;

export default function ResumeExpandableText({
  text,
}: ResumeExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);

  useEffect(() => {
    const lines = text.split(/\r\n|\r|\n/);
    if (lines.length > 3) {
      setDescriptionOverflow(true);
    } else {
      setDescriptionOverflow(false);
    }
  }, [text]);

  const onSeeActionClicked = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <span
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
