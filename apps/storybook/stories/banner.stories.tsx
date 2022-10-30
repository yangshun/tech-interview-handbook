import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { BannerSize } from '@tih/ui';
import { Banner } from '@tih/ui';

const bannerSizes: ReadonlyArray<BannerSize> = ['xs', 'sm', 'md'];

export default {
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: bannerSizes,
    },
  },
  component: Banner,
  title: 'Banner',
} as ComponentMeta<typeof Banner>;

export const Basic = {
  args: {
    children: 'This notice is going to change your life',
    size: 'md',
  },
};

export function Sizes() {
  const [isShown, setIsShown] = useState(true);
  const [isShown2, setIsShown2] = useState(true);
  const [isShown3, setIsShown3] = useState(true);
  return (
    <div className="space-y-4">
      {isShown && (
        <Banner onHide={() => setIsShown(false)}>
          This notice is going to change your life unless you close it.
        </Banner>
      )}
      {isShown2 && (
        <Banner size="sm" onHide={() => setIsShown2(false)}>
          This smaller notice is going to change your life unless you close it.
        </Banner>
      )}
      {isShown3 && (
        <Banner size="xs" onHide={() => setIsShown3(false)}>
          This even smaller notice is going to change your life unless you close
          it.
        </Banner>
      )}
    </div>
  );
}
