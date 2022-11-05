import { trpc } from '../trpc';

export function useAddQuestionToListAsync() {
  const utils = trpc.useContext();
  const { mutateAsync: addQuestionToListAsync } = trpc.useMutation(
    'questions.lists.createQuestionEntry',
    {
      // TODO: Add optimistic update
      onSuccess: () => {
        utils.invalidateQueries(['questions.lists.getListsByUser']);
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
  const utils = trpc.useContext();
  const { mutateAsync: createListAsync } = trpc.useMutation(
    'questions.lists.create',
    {
      onSuccess: () => {
        // TODO: Add optimistic update
        utils.invalidateQueries(['questions.lists.getListsByUser']);
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
