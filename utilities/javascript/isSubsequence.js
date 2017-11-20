function isSubsequence(s, t) {
  if (s.length > t.length) {
    return false;
  }
  let matchedLength = 0;
  for (let i = 0; i < t.length; i++) {
    if (matchedLength < s.length && s[matchedLength] === t[i]) {
      matchedLength += 1;
    }
  }
  return matchedLength === s.length;
}

console.log(isSubsequence('abc', 'abcde') === true);
console.log(isSubsequence('abd', 'abcde') === true);
console.log(isSubsequence('abf', 'abcde') === false);
console.log(isSubsequence('abef', 'abcde') === false);
console.log(isSubsequence('abcdef', 'abcde') === false);
console.log(isSubsequence('a', 'abcde') === true);
