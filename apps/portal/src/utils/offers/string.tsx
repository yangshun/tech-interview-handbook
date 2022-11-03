export function joinWithComma(...strings: Array<string | null | undefined>) {
  return strings.filter((value) => !!value).join(', ');
}
