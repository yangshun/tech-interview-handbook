import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { SlideOutEnterFrom, SlideOutSize } from '@tih/ui';
import { Button, SlideOut } from '@tih/ui';

const slideOutEnterFrom: ReadonlyArray<SlideOutEnterFrom> = ['start', 'end'];
const slideOutSize: ReadonlyArray<SlideOutSize> = ['sm', 'md', 'lg', 'xl'];

export default {
  argTypes: {
    enterFrom: {
      control: { type: 'select' },
      options: slideOutEnterFrom,
    },
    size: {
      control: { type: 'select' },
      options: slideOutSize,
    },
    title: {
      control: 'text',
    },
  },
  component: SlideOut,
  title: 'SlideOut',
} as ComponentMeta<typeof SlideOut>;

export function Basic({
  children,
  enterFrom,
  size,
  title,
}: Pick<
  React.ComponentProps<typeof SlideOut>,
  'children' | 'enterFrom' | 'size' | 'title'
>) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <Button label="Open" variant="primary" onClick={() => setIsShown(true)} />
      <SlideOut
        enterFrom={enterFrom}
        isShown={isShown}
        size={size}
        title={title}
        onClose={() => setIsShown(false)}>
        {children}
      </SlideOut>
    </div>
  );
}

Basic.args = {
  children: <div className="p-4">Hello World</div>,
  enterFrom: 'end',
  size: 'md',
  title: 'Navigation',
};
