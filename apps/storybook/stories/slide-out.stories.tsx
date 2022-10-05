import { ComponentMeta } from '@storybook/react';
import { Button, SlideOut, SlideOutEnterFrom, SlideOutSize } from '@tih/ui';
import React, { useState } from 'react';

const slideOutEnterFrom: ReadonlyArray<SlideOutEnterFrom> = ['start', 'end'];
const slideOutSize: ReadonlyArray<SlideOutSize> = ['sm', 'md', 'lg', 'xl'];

export default {
  title: 'SlideOut',
  component: SlideOut,
  argTypes: {
    title: {
      control: 'text',
    },
    enterFrom: {
      options: slideOutEnterFrom,
      control: { type: 'select' },
    },
    size: {
      options: slideOutSize,
      control: { type: 'select' },
    },
  },
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
  title: 'Navigation',
  children: <div className="p-4">Hello World</div>,
  enterFrom: 'end',
  size: 'md',
};
