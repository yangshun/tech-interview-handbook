import type { ComponentMeta } from '@storybook/react';
import { Collapsible } from '@tih/ui';

export default {
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
  },
  component: Collapsible,
  title: 'Collapsible',
} as ComponentMeta<typeof Collapsible>;

export const Basic = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    label: 'Reveal more content below',
  },
};

export function AccordionLayout() {
  return (
    <div className="divide-y divide-slate-200">
      <div className="py-2">
        <Collapsible label="What is your name?">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Collapsible>
      </div>
      <div className="py-2">
        <Collapsible label="What is your age?">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Collapsible>
      </div>
    </div>
  );
}
