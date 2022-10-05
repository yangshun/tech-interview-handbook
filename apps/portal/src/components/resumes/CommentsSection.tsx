import { useState } from 'react';
import { Button, Tabs } from '@tih/ui';

export default function CommentsSection() {
  const [tab, setTab] = useState('general');

  return (
    <div>
      <Button display="block" label="Add your review" variant="tertiary" />
      <Tabs
        label="comments"
        tabs={[
          {
            label: 'General',
            value: 'general',
          },
          {
            label: 'Experience',
            value: 'experience',
          },
          {
            label: 'Education',
            value: 'education',
          },
          {
            label: 'Project',
            value: 'project',
          },
          {
            label: 'Skills',
            value: 'skills',
          },
        ]}
        value={tab}
        onChange={(value) => setTab(value)}
      />
    </div>
  );
}
