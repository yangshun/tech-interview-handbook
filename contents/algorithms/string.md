---
id: string
title: String cheatsheet for coding interviews
description: String study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    string coding interview study guide,
    string tips for coding interviews,
    string practice questions,
    string useful techniques,
    string time complexity,
    string recommended study resources,
  ]
sidebar_label: String
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-string.png" />
</head>

## Introduction

A string is a sequence of characters. Many tips that apply to arrays also apply to strings. You're recommended to read the page on [Arrays](./array.md) before reading this page.

Common data structures for looking up strings:

- [Trie/Prefix Tree](https://en.wikipedia.org/wiki/Trie)
- [Suffix Tree](https://en.wikipedia.org/wiki/Suffix_tree)

Common string algorithms:

- [Rabin Karp](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm) for efficient searching of substring using a rolling hash
- [KMP](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) for efficient searching of substring

## Time complexity

A strings is an array of characters, so the time complexities of basic string operations will closely resemble that of array operations.

| Operation | Big-O |
| --------- | ----- |
| Access    | O(1)  |
| Search    | O(n)  |
| Insert    | O(n)  |
| Remove    | O(n)  |

### Operations involving another string

Here we assume the other string is of length m.

| Operation | Big-O | Note |
| --- | --- | --- |
| Find substring | O(n.m) | This is the most naive case. There are more efficient algorithms for string searching such as the [KMP algorithm](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) |
| Concatenating strings | O(n + m) |  |
| Slice | O(m) |  |
| Split (by token) | O(n + m) |  |
| Strip (remove leading and trailing whitespaces) | O(n) |  |

## Things to look out for during interviews

Ask about input character set and case sensitivity. Usually the characters are limited to lowercase Latin characters, for example a to z.

## Corner cases

- Empty string
- String with 1 or 2 characters
- String with repeated characters
- Strings with only distinct characters

## Techniques

Many string questions fall into one of these buckets.

### Counting characters

Often you will need to count the frequency of characters in a string. The most common way of doing that is by using a hash table/map in your language of choice. If your language has a built-in Counter class like Python, ask if you can use that instead.

If you need to keep a counter of characters, a common mistake is to say that the space complexity required for the counter is O(n). The space required for a counter of a string of latin characters is O(1) not O(n). This is because the upper bound is the range of characters, which is usually a fixed constant of 26. The input set is just lowercase Latin characters.

#### String of unique characters

A neat trick to count the characters in a string of unique characters is to use a 26-bit bitmask to indicate which lower case latin characters are inside the string.

```py
mask = 0
for c in word:
  mask |= (1 << (ord(c) - ord('a')))
```

To determine if two strings have common characters, perform `&` on the two bitmasks. If the result is non-zero, ie. `mask_a & mask_b > 0`, then the two strings have common characters.

### Anagram

An anagram is word switch or word play. It is the result of rearranging the letters of a word or phrase to produce a new word or phrase, while using all the original letters only once. In interviews, usually we are only bothered with words without spaces in them.

To determine if two strings are anagrams, there are a few approaches:

- Sorting both strings should produce the same resulting string. This takes O(n.log(n)) time and O(log(n)) space.
- If we map each character to a prime number and we multiply each mapped number together, anagrams should have the same multiple (prime factor decomposition). This takes O(n) time and O(1) space. Examples: [Group Anagram](https://leetcode.com/problems/group-anagrams/)
- Frequency counting of characters will help to determine if two strings are anagrams. This also takes O(n) time and O(1) space.

### Palindrome

A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward, such as `madam` or `racecar`.

Here are ways to determine if a string is a palindrome:

- Reverse the string and it should be equal to itself.
- Have two pointers at the start and end of the string. Move the pointers inward till they meet. At every point in time, the characters at both pointers should match.

The order of characters within the string matters, so hash tables are usually not helpful.

When a question is about counting the number of palindromes, a common trick is to have two pointers that move outward, away from the middle. Note that palindromes can be even or odd length. For each middle pivot position, you need to check it twice - once that includes the character and once without the character. This technique is used in [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/).

- For substrings, you can terminate early once there is no match
- For subsequences, use dynamic programming as there are overlapping subproblems. Check out [this question](https://leetcode.com/problems/longest-palindromic-subsequence/)

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Valid Anagram](https://leetcode.com/problems/valid-anagram)
- [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string)
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/description/)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
- [Encode and Decode Strings (LeetCode Premium)](https://leetcode.com/problems/encode-and-decode-strings/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
