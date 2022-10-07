import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import { Pagination } from '@tih/ui';

export default {
  argTypes: {},
  component: Pagination,
  title: 'Pagination',
} as ComponentMeta<typeof Pagination>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function emptyFunction() {}

export function Basic({
  current,
  end,
  start,
  pagePadding,
}: Pick<
  React.ComponentProps<typeof Pagination>,
  'current' | 'end' | 'pagePadding' | 'start'
>) {
  return (
    <div className="space-y-4">
      <Pagination
        current={current}
        end={end}
        label="Pagination"
        pagePadding={pagePadding}
        start={start}
        onSelect={emptyFunction}
      />
    </div>
  );
}

Basic.args = {
  current: 3,
  end: 10,
  pagePadding: 1,
  start: 1,
};

export function Interaction() {
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <div className="space-y-4">
      <div>
        <Pagination
          current={currentPage}
          end={10}
          label="Pagination"
          start={1}
          onSelect={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export function PageRanges() {
  return (
    <div className="space-y-4">
      <div>
        <Pagination
          current={5}
          end={10}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={1}
          end={10}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={2}
          end={10}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={9}
          end={10}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={10}
          end={10}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={1}
          end={1}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={1}
          end={1}
          label="Pagination"
          pagePadding={2}
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={1}
          end={2}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={2}
          end={2}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={1}
          end={3}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={2}
          end={3}
          label="Pagination"
          start={1}
          onSelect={emptyFunction}
        />
      </div>
    </div>
  );
}

export function PagePadding() {
  return (
    <div className="space-y-4">
      <div>
        <Pagination
          current={5}
          end={10}
          label="Pagination"
          pagePadding={2}
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={5}
          end={20}
          label="Pagination"
          pagePadding={2}
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={10}
          end={20}
          label="Pagination"
          pagePadding={2}
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={10}
          end={20}
          label="Pagination"
          pagePadding={3}
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={5}
          end={10}
          label="Pagination"
          pagePadding={3}
          start={1}
          onSelect={emptyFunction}
        />
      </div>
      <div>
        <Pagination
          current={1}
          end={1}
          label="Pagination"
          pagePadding={2}
          start={1}
          onSelect={emptyFunction}
        />
      </div>
    </div>
  );
}
