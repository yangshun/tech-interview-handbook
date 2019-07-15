---
id: string
title: String
---

## Tips

Ask about input character set and case sensitivity. Usually the characters are limited to lowercase Latin characters, for example a to z.

When you need to compare strings where the order isn’t important (like anagram), you may consider using a HashMap as a counter. If your language has a built-in Counter class like Python, ask to use that instead.

If you need to keep a counter of characters, a common mistake is to say that the space complexity required for the counter is O(n). The space required for a counter is O(1) not O(n). This is because the upper bound is the range of characters, which is usually a fixed constant of 26. The input set is just lowercase Latin characters.

Common data structures for looking up strings efficiently are

- [Trie/Prefix Tree](https://en.wikipedia.org/wiki/Trie)
- [Suffix Tree](https://en.wikipedia.org/wiki/Suffix_tree)

Common string algorithms are

- [Rabin Karp](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm) for efficient searching of substring using a rolling hash
- [KMP](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) for efficient searching of substring

## Strings are sequences

A string is a sequence of characters. Many tips that apply to arrays also apply to strings.

Are there duplicate characters in the string, would it affect the answer?

When using an index to iterate through characters, be careful not to go out of bounds.

Be mindful about slicing or concatenating strings in your code. Typically, slicing and concatenating strings require O(n) time. Use start and end indices to demarcate a substring where possible.

Sometimes you can traverse the string from the right rather than from the left.

Master the [sliding window technique](https://discuss.leetcode.com/topic/30941/here-is-a-10-line-template-that-can-solve-most-substring-problems) that applies to many substring problems.

When you are given two strings to process, it is common to have one index per string (pointer) to traverse/compare the both of them. For example, we use the same approach to merge two sorted arrays.

## Common question topics

Many string questions fall into one of these buckets.

### Non-repeating Characters

- Use a 26-bit bitmask to indicate which lower case latin characters are inside the string.

```py
mask = 0
for c in set(word):
  mask |= (1 << (ord(c) - ord('a')))
```

To determine if two strings have common characters, perform & on the two bitmasks. If the result is non-zero, `mask_a & mask_b > 0`, then the two strings have common characters.

### Anagram

An anagram is word switch or word play. It is the result of re-arranging the letters of a word or phrase to produce a new word or phrase, while using all the original letters only once. In interviews, usually we are only bothered with words without spaces in them.

To determine if two strings are anagrams, there are a few plausible approaches:

- Sorting both strings should produce the same resulting string. This takes O(nlgn) time and O(lgn) space.
- If we map each character to a prime number and we multiply each mapped number together, anagrams should have the same multiple (prime factor decomposition). This takes O(n) time and O(1) space.
- Frequency counting of characters will help to determine if two strings are anagrams. This also takes O(n) time and O(1) space.

### Palindrome

A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward, such as _madam_ or _racecar_.

Here are ways to determine if a string is a palindrome:

- Reverse the string and it should be equal to itself.
- Have two pointers at the start and end of the string. Move the pointers inward till they meet. At any point in time, the characters at both pointers should match.

The order of characters within the string matters, so HashMaps are usually not helpful.

When a question is about counting the number of palindromes, a common trick is to have two pointers that move outward, away from the middle. Note that palindromes can be even or odd length. For each middle pivot position, you need to check it twice: Once that includes the character and once without the character.

- For substrings, you can terminate early once there is no match.
- For subsequences, use dynamic programming as there are overlapping subproblems. Check out [this question](https://leetcode.com/problems/longest-palindromic-subsequence/).

## Corner cases

- Empty string
- String with 1 or 2 characters
- String with repeated characters
- Strings with only one distinct character

## Recommended Leetcode questions

- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/description/)
- [Valid Anagram](https://leetcode.com/problems/valid-anagram)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses)
- [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
- [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)
- [Encode and Decode Strings (Leetcode Premium)](https://leetcode.com/problems/encode-and-decode-strings/)

## More questions

- Output list of strings representing a page of hostings given a list of CSV strings.
- Given a list of words, find the word pairs that when concatenated form a palindrome.
- Find the most efficient way to identify what character is out of place in a non-palindrome.
- Implement a simple regex parser which, given a string and a pattern, returns a boolean indicating whether the input matches the pattern. By simple, we mean that the regex can only contain the following special characters: `*` (star), `.` (dot), `+` (plus). The star means that there will be zero or more of the previous character in that place in the pattern. The dot means any character for that position. The plus means one or more of previous character in that place in the pattern.
- Find all words from a dictionary that are x edit distance away.
- Given a string IP and number n, print all CIDR addresses that cover that range.
- Write a function called `eval`, which takes a string and returns a boolean. This string is allowed 6 different characters: `0`, `1`, `&`, `|`, `(`, and `)`. `eval` should evaluate the string as a boolean expression, where `0` is `false`, `1` is `true`, `&` is an `and`, and `|` is an `or`.
  - E.g `"(0 | (1 | 0)) & (1 & ((1 | 0) & 0))"`
- Given a pattern string like `"abba"` and an input string like `"redbluebluered"`, return `true` if and only if there's a one to one mapping of letters in the pattern to substrings of the input.
  - E.g. `"abba"` and `"redbluebluered"` should return `true`.
  - E.g. `"aaaa"` and `"asdasdasdasd"` should return `true`.
  - E.g. `"aabb"` and `"xyzabcxzyabc"` should return `false`.
- If you received a file in chunks, calculate when you have the full file. Quite an open-ended question. Can assume chunks come with start and end, or size, etc.
- Given a list of names (strings) and the width of a line, design an algorithm to display them using the minimum number of lines.
- Design a spell-checking algorithm.
- Longest substring with `K` unique characters.
  - [Source](http://blog.gainlo.co/index.php/2016/04/12/find-the-longest-substring-with-k-unique-characters/)
- Given a set of random strings, write a function that returns a set that groups all the anagrams together.
  - [Source](http://blog.gainlo.co/index.php/2016/05/06/group-anagrams/)
- Given a string, find the longest substring without repeating characters. For example, for string `'abccdefgh'`, the longest substring is `'cdefgh'`.
  - [Source](http://blog.gainlo.co/index.php/2016/10/07/facebook-interview-longest-substring-without-repeating-characters/)
- Given a string, return the string with duplicate characters removed.
- Write a function that receives a regular expression (allowed chars = from `'a'` to `'z'`, `'*'`, `'.'`) and a string containing lower case english alphabet characters and return `true` or `false` whether the string matches the regex.
  - E.g. `'ab*a'`, `'abbbbba'` => `true`.
  - E.g. `'ab*b.'`, `'aba'` => `true`.
  - E.g. `'abc*'`, `'acccc'` => `false`.
- Given a rectangular grid with letters, search if some word is in the grid.
- Given two strings representing integer numbers (`'123'` , `'30'`) return a string representing the sum of the two numbers: `'153'`.
- A professor wants to see if two students have cheated when writing a paper. Design a function `hasCheated(String s1, String s2, int N)` that evaluates to `true` if two strings have a common substring of length `N`.
  - Follow up: Assume you don't have the possibility of using `String.contains()` and `String.substring()`. How would you implement this?
- Print all permutations of a given string.
- Parse a string containing numbers and `'+'`, `'-'` and parentheses. Evaluate the expression. `-2+(3-5)` should return `-4`.
- Output a substring with at most `K` unique characters.
  - E.g. `'aabc'` and `k` = 2 => `'aab'`.
- Ensure that there are a minimum of `N` dashes between any two of the same characters of a string.
  - E.g. `n = 2, string = 'ab-bcdecca'` => `'ab--bcdec--ca'`.
- Find the longest palindrome in a string.
- Give the count and the number following in the series.
  - E.g. `1122344`, next: `21221324`, next: `12112211121214`.
  - Count and say problem.
- Compress a string by grouping consecutive similar questions together:
  - E.g. `'aaabbbcc' =>`'a3b3c2'`.
- You have a string consisting of open and closed parentheses, but parentheses may be imbalanced. Make the parentheses balanced and return the new string.
- Given a set of strings, return the smallest subset that contains prefixes for every string.
  - E.g. `['foo', 'foog', 'food', 'asdf']` => `['foo', 'asdf']`.
- Write a function that would return all the possible words generated when using a phone (pre-smartphone era) numpad to type.
- Given a dictionary and a word, find the minimum number of deletions needed on the word in order to make it a valid word.
  - [Source](http://blog.gainlo.co/index.php/2016/04/29/minimum-number-of-deletions-of-a-string/)
- How to check if a string contains an anagram of another string?
  - [Source](http://blog.gainlo.co/index.php/2016/04/08/if-a-string-contains-an-anagram-of-another-string/)
- Find all k-lettered words from a string.
- Given a string of open and close parentheses, find the minimum number of edits needed to balance a string of parentheses.
- Run length encoding - Write a string compress function that returns `'R2G1B1'` given `'RRGB'`.
- Write a function that finds all the different ways you can split up a word into a concatenation of two other words.
