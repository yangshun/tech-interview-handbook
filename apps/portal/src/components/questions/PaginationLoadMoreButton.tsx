import type { UseInfiniteQueryResult } from 'react-query';
import { Button } from '@tih/ui';

export type PaginationLoadMoreButtonProps = {
  query: UseInfiniteQueryResult;
};

export default function PaginationLoadMoreButton(
  props: PaginationLoadMoreButtonProps,
) {
  const {
    query: { hasNextPage, isFetchingNextPage, fetchNextPage },
  } = props;
  return (
    <Button
      disabled={!hasNextPage || isFetchingNextPage}
      isLoading={isFetchingNextPage}
      label={hasNextPage ? 'Load more' : 'Nothing more to load'}
      variant="tertiary"
      onClick={() => {
        fetchNextPage();
      }}
    />
  );
}
