import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

export default {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    isLabelHidden: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    noResultsMessage: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
  },
  component: Typeahead,
  parameters: {
    docs: {
      iframeHeight: 400,
      inlineStories: false,
    },
  },
  title: 'Typeahead',
} as ComponentMeta<typeof Typeahead>;

export function Basic({
  disabled,
  isLabelHidden,
  label,
}: Pick<
  React.ComponentProps<typeof Typeahead>,
  'disabled' | 'isLabelHidden' | 'label'
>) {
  const people = [
    { id: '1', label: 'Wade Cooper', value: '1' },
    { id: '2', label: 'Arlene Mccoy', value: '2' },
    { id: '3', label: 'Devon Webb', value: '3' },
    { id: '4', label: 'Tom Cook', value: '4' },
    { id: '5', label: 'Tanya Fox', value: '5' },
    { id: '6', label: 'Hellen Schmidt', value: '6' },
  ];
  const [selectedEntry, setSelectedEntry] = useState<TypeaheadOption>(
    people[0],
  );
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <Typeahead
      disabled={disabled}
      isLabelHidden={isLabelHidden}
      label={label}
      options={filteredPeople}
      value={selectedEntry}
      onQueryChange={setQuery}
      onSelect={setSelectedEntry}
    />
  );
}

Basic.args = {
  disabled: false,
  isLabelHidden: false,
  label: 'Author',
};

export function Required() {
  const people = [
    { id: '1', label: 'Wade Cooper', value: '1' },
    { id: '2', label: 'Arlene Mccoy', value: '2' },
    { id: '3', label: 'Devon Webb', value: '3' },
    { id: '4', label: 'Tom Cook', value: '4' },
    { id: '5', label: 'Tanya Fox', value: '5' },
    { id: '6', label: 'Hellen Schmidt', value: '6' },
  ];
  const [selectedEntry, setSelectedEntry] = useState<TypeaheadOption>(
    people[0],
  );
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <Typeahead
      label="Author"
      options={filteredPeople}
      required={true}
      value={selectedEntry}
      onQueryChange={setQuery}
      onSelect={setSelectedEntry}
    />
  );
}
