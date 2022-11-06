import { useMemo, useState } from 'react';

import { trpc } from '~/utils/trpc';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

export type TagTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'clearOnSelect' | 'filterOption' | 'label' | 'onQueryChange' | 'options'
>;

export const CREATE_ID = 'create';

export default function TagTypeahead({
  onSelect,
  ...restProps
}: TagTypeaheadProps) {
  const [query, setQuery] = useState('');

  const utils = trpc.useContext();
  const { data: tags } = trpc.useQuery(
    [
      'questions.tags.getTags',
      {
        name: query,
      },
    ],
    {
      keepPreviousData: true,
    },
  );

  const { mutateAsync: createTagAsync } = trpc.useMutation(
    'questions.tags.user.create',
    {
      onSuccess: () => {
        utils.invalidateQueries(['questions.tags.getTags']);
      },
    },
  );

  const tagOptions = useMemo(() => {
    return (
      tags?.map(({ id, tag }) => ({
        id,
        label: tag,
        value: id,
      })) ?? []
    );
  }, [tags]);

  const filteredOptions = useMemo(() => {
    const options = tagOptions.filter(
      ({ id, label }) =>
        id === CREATE_ID || label.toLowerCase().includes(query.toLowerCase()),
    );

    if (query === '' || tags?.find(({ tag }) => tag === query)) {
      return options;
    }

    return [
      ...options,
      {
        id: CREATE_ID,
        label: `Create "${query}"`,
        value: query,
      },
    ];
  }, [query, tagOptions, tags]);

  return (
    <ExpandedTypeahead
      onSelect={async (option) => {
        if (option.id === CREATE_ID) {
          const { value } = option;

          setQuery('');
          onSelect({
            id: 'dummy',
            label: value,
            value: 'dummy',
          });
          await createTagAsync(
            { tag: value },
            {
              onSuccess: async (tag) => {
                onSelect({
                  id: tag.id,
                  label: tag.tag,
                  value: tag.id,
                });
              },
            },
          );
        } else {
          onSelect(option);
        }
      }}
      {...(restProps as Omit<
        ExpandedTypeaheadProps & { clearOnSelect: boolean },
        'clearOnSelect' | 'onSelect'
      >)}
      label="Tag"
      options={filteredOptions}
      onQueryChange={setQuery}
    />
  );
}
