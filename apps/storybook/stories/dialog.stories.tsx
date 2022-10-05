import { ComponentMeta } from '@storybook/react';
import { Button, Dialog } from '@tih/ui';
import React, { useState } from 'react';

export default {
  title: 'Dialog',
  component: Dialog,
  argTypes: {
    title: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Dialog>;

export function Basic({
  children,
  title,
}: Pick<React.ComponentProps<typeof Dialog>, 'children' | 'title'>) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <Button label="Open" variant="primary" onClick={() => setIsShown(true)} />
      <Dialog
        isShown={isShown}
        primaryButton={
          <Button
            display="block"
            label="OK"
            variant="primary"
            onClick={() => setIsShown(false)}
          />
        }
        secondaryButton={
          <Button
            display="block"
            label="Cancel"
            variant="tertiary"
            onClick={() => setIsShown(false)}
          />
        }
        title={title}
        onClose={() => setIsShown(false)}>
        {children}
      </Dialog>
    </div>
  );
}
