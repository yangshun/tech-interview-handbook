import type { UseInfiniteQueryResult } from 'react-query';
import { Button } from '~/ui';

export type PaginationLoadMoreButtonProps = {
  query: UseInfiniteQueryResult;
};

export default function PaginationLoadMoreButton(
  props: PaginationLoadMoreButtonProps,
) {
  const {
    query: { data, hasNextPage, isFetchingNextPage, fetchNextPage },
  } = props;

  const isOnlyOnePage = data?.pages.length === 1;

  if (isOnlyOnePage && !hasNextPage) {
    return null;
  }

  return (
    <Button
      disabled={!hasNextPage || isFetchingNextPage}
      display="block"
      isLoading={isFetchingNextPage}
      label={hasNextPage ? 'Load more' : 'Nothing more to load'}
      variant="tertiary"
      onClick={() => {
        fetchNextPage();
      }}
    />
  );
}
