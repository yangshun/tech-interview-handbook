---
id: trie
title: Trie cheatsheet for coding interviews
description: Trie study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    trie coding interview study guide,
    trie tips for coding interviews,
    trie practice questions,
    trie useful techniques,
    trie time complexity,
    trie recommended study resources,
  ]
sidebar_label: Trie
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-trie.png" />
</head>

## Introduction

Tries are special trees (prefix trees) that make searching and storing strings more efficient. Tries have many practical applications, such as conducting searches and providing autocomplete. It is helpful to know these common applications so that you can easily identify when a problem can be efficiently solved using a trie.

Be familiar with implementing from scratch, a `Trie` class and its `add`, `remove` and `search` methods.

## Learning resources

- Readings
  - [Trying to Understand Tries](https://medium.com/basecs/trying-to-understand-tries-3ec6bede0014), basecs
  - [Implement Trie (Prefix Tree)](https://leetcode.com/articles/implement-trie-prefix-tree/), LeetCode
- Additional (only if you have time)
  - [Compressing Radix Trees Without (Too Many) Tears](https://medium.com/basecs/compressing-radix-trees-without-too-many-tears-a2e658adb9a0), basecs

## Time complexity

`m` is the length of the string used in the operation.

| Operation | Big-O |
| --------- | ----- |
| Search    | O(m)  |
| Insert    | O(m)  |
| Remove    | O(m)  |

## Corner cases

- Searching for a string in an empty trie
- Inserting empty strings into a trie

## Techniques

Sometimes preprocessing a dictionary of words (given in a list) into a trie, will improve the efficiency of searching for a word of length k, among n words. Searching becomes O(k) instead of O(n).

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Add and Search Word](https://leetcode.com/problems/add-and-search-word-data-structure-design)
- [Word Break](https://leetcode.com/problems/word-break)
- [Word Search II](https://leetcode.com/problems/word-search-ii/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
