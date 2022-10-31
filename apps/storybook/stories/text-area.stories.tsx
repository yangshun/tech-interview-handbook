import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { TextAreaResize } from '@tih/ui';
import { TextArea } from '@tih/ui';

const textAreaResize: ReadonlyArray<TextAreaResize> = [
  'vertical',
  'horizontal',
  'none',
  'both',
];

export default {
  argTypes: {
    autoComplete: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    errorMessage: {
      control: 'text',
    },
    isLabelHidden: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    readOnly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    resize: {
      control: { type: 'select' },
      options: textAreaResize,
    },
    rows: {
      control: 'number',
    },
  },
  component: TextArea,
  title: 'TextArea',
} as ComponentMeta<typeof TextArea>;

export const Basic = {
  args: {
    label: 'Comment',
    placeholder: 'Type your comment here',
  },
};

export function HiddenLabel() {
  const [value, setValue] = useState('');

  return (
    <TextArea
      isLabelHidden={true}
      label="Name"
      placeholder="John Doe"
      value={value}
      onChange={setValue}
    />
  );
}

export function Disabled() {
  return (
    <div className="space-y-4">
      <TextArea
        disabled={true}
        label="Comment"
        placeholder="You can't type here, it's disabled. (Placeholder)"
      />
      <TextArea
        disabled={true}
        label="Comment"
        value="You can't type here, it's disabled. (Value)"
      />
    </div>
  );
}

export function Required() {
  return (
    <TextArea label="Required input" placeholder="John Doe" required={true} />
  );
}

export function Error() {
  const [value, setValue] = useState('1234');

  return (
    <TextArea
      errorMessage={value.length < 6 ? 'Your comment is too short' : undefined}
      label="Leave a reply"
      value={value}
      onChange={setValue}
    />
  );
}

export function Description() {
  const [value, setValue] = useState('Some comment');

  return (
    <TextArea
      description="Your message must be at least 6 characters"
      errorMessage={value.length < 6 ? 'Your comment is too short' : undefined}
      label="Leave a reply"
      value={value}
      onChange={setValue}
    />
  );
}

export function ReadOnly() {
  return (
    <TextArea
      label="Leave a reply"
      readOnly={true}
      value="But you can't change this"
    />
  );
}

export function Rows() {
  return (
    <div className="space-y-4">
      <TextArea label="Reply" placeholder="Leave a reply" rows={4} />
      <TextArea label="Reply" placeholder="Leave a reply" rows={10} />
    </div>
  );
}

export function Resize() {
  return (
    <div className="space-y-4">
      <TextArea
        label="Vertical resizing"
        placeholder="Leave a reply"
        resize="vertical"
      />
      <TextArea
        label="Horizontal resizing"
        placeholder="Leave a reply"
        resize="horizontal"
      />
      <TextArea label="No resizing" placeholder="Leave a reply" resize="none" />
      <TextArea
        label="Both resizing"
        placeholder="Leave a reply"
        resize="both"
      />
    </div>
  );
}
