import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';

import { trpc } from '../trpc';

export function useAddQuestionToListAsync() {
  const { event } = useGoogleAnalytics();
  const utils = trpc.useContext();
  const { mutateAsync: addQuestionToListAsync } = trpc.useMutation(
    'questions.lists.createQuestionEntry',
    {
      // TODO: Add optimistic update
      onSuccess: () => {
        utils.invalidateQueries(['questions.lists.getListsByUser']);
        event({
          action: 'questions.lists',
          category: 'engagement',
          label: 'add question to list',
        });
      },
    },
  );

  return addQuestionToListAsync;
}

export function useRemoveQuestionFromListAsync() {
  const utils = trpc.useContext();
  const { mutateAsync: removeQuestionFromListAsync } = trpc.useMutation(
    'questions.lists.deleteQuestionEntry',
    {
      // TODO: Add optimistic update
      onSuccess: () => {
        utils.invalidateQueries(['questions.lists.getListsByUser']);
      },
    },
  );

  return removeQuestionFromListAsync;
}

export function useCreateListAsync() {
  const { event } = useGoogleAnalytics();
  const utils = trpc.useContext();
  const { mutateAsync: createListAsync } = trpc.useMutation(
    'questions.lists.create',
    {
      onSuccess: () => {
        // TODO: Add optimistic update
        utils.invalidateQueries(['questions.lists.getListsByUser']);
        event({
          action: 'questions.lists',
          category: 'engagement',
          label: 'create list',
        });
      },
    },
  );
  return createListAsync;
}

export function useDeleteListAsync() {
  const utils = trpc.useContext();
  const { mutateAsync: deleteListAsync } = trpc.useMutation(
    'questions.lists.delete',
    {
      onSuccess: () => {
        // TODO: Add optimistic update
        utils.invalidateQueries(['questions.lists.getListsByUser']);
      },
    },
  );

  return deleteListAsync;
}
