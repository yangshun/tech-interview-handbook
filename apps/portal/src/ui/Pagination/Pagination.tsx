import clsx from 'clsx';
import type { ReactElement } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type Props = Readonly<{
  current: number;
  end: number;
  label: string;
  onSelect: (page: number, event: React.MouseEvent<HTMLElement>) => void;
  pagePadding?: number;
  start: number;
}>;

function PaginationPage({
  isCurrent = false,
  label,
  onClick,
}: Readonly<{
  isCurrent?: boolean;
  label: number;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}>) {
  return (
    <button
      aria-current={isCurrent}
      className={clsx(
        'focus:ring-primary-500 focus:border-primary-500 relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 focus:outline-none focus:ring-1',
        isCurrent
          ? 'border-primary-500 bg-primary-50 text-primary-600 z-10'
          : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50',
      )}
      disabled={isCurrent}
      type="button"
      onClick={onClick}>
      {label}
    </button>
  );
}

function PaginationEllipsis() {
  return (
    <span className="relative inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
      ...
    </span>
  );
}

export default function Pagination({
  current,
  end,
  label,
  onSelect,
  pagePadding = 1,
  start = 1,
}: Props) {
  const pageNumberSet = new Set();
  const pageNumberList: Array<number | string> = [];
  const elements: Array<ReactElement> = [];
  let lastAddedPage = 0;

  function addPage(page: number) {
    if (page < start || page > end) {
      return;
    }

    if (!pageNumberSet.has(page)) {
      lastAddedPage = page;
      pageNumberList.push(page);
      pageNumberSet.add(page);
      elements.push(
        <PaginationPage
          key={page}
          isCurrent={current === page}
          label={page}
          onClick={(event) => {
            onSelect(page, event);
          }}
        />,
      );
    }
  }

  for (let i = start; i <= start + pagePadding; i++) {
    addPage(i);
  }

  if (lastAddedPage < current - pagePadding - 1) {
    elements.push(<PaginationEllipsis key="ellipse-1" />);
  }

  for (let i = current - pagePadding; i <= current + pagePadding; i++) {
    addPage(i);
  }

  if (lastAddedPage < end - pagePadding - 1) {
    elements.push(<PaginationEllipsis key="ellipse-2" />);
  }

  for (let i = end - pagePadding; i <= end; i++) {
    addPage(i);
  }

  const isPrevButtonDisabled = current === start;
  const isNextButtonDisabled = current === end;

  return (
    <nav
      aria-label={label}
      className="isolate inline-flex -space-x-px rounded-md shadow-sm">
      <button
        aria-label="Previous"
        className={clsx(
          'relative inline-flex items-center rounded-l-md border border-slate-300 px-2 py-2 text-sm font-medium focus:z-20',
          isPrevButtonDisabled
            ? 'text-slate-300'
            : 'focus:ring-primary-500 focus:border-primary-500 bg-white text-slate-500 hover:bg-slate-50 focus:outline-none focus:ring-1',
        )}
        disabled={isPrevButtonDisabled}
        type="button"
        onClick={(event) => {
          onSelect(current - 1, event);
        }}>
        <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
      </button>
      {elements}
      <button
        aria-label="Next"
        className={clsx(
          'relative inline-flex items-center rounded-r-md border border-slate-300 px-2 py-2 text-sm font-medium focus:z-20',
          isNextButtonDisabled
            ? 'text-slate-300'
            : 'focus:ring-primary-500 focus:border-primary-500 bg-white text-slate-500 hover:bg-slate-50 focus:outline-none focus:ring-1',
        )}
        disabled={isNextButtonDisabled}
        type="button"
        onClick={(event) => {
          onSelect(current + 1, event);
        }}>
        <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
      </button>
    </nav>
  );
}
