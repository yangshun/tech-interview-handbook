export const createValidationRegex = (
  keywordArray: Array<string>,
  prepend: string | null | undefined,
) => {
  const sortingKeysRegex = keywordArray.join('|');
  prepend = prepend != null ? prepend : '';
  return new RegExp('^' + prepend + '(' + sortingKeysRegex + ')$');
};
