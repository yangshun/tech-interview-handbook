---
id: study-cheatsheet
title: Data structures and algorithms study cheatsheets for coding interviews
description: Study guides for coding interviews with focus on data structures and algorithms, including practice questions, techniques, time complexity and recommended resources
keywords: [coding interview algorithms, coding interview data structures]
sidebar_label: Introduction
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms-study-cheatsheet.png" />
</head>

import InDocAd from '../\_components/InDocAd';

## What is this

This section dives deep into practical knowledge and techniques for algorithms and data structures which appear frequently in algorithm interviews. The more techniques you have in your arsenal, the higher the chances of passing the interview. They may lead you to discover corner cases you might have missed out or even lead you towards the optimal approach!

## Contents of each study guide

For each topic, you can expect to find:

1. A brief overview
1. Learning resources
1. Language-specific libraries to use
1. Time complexities cheatsheet
1. Things to look out for during interviews
1. Corner cases
1. Useful techniques with recommended questions to practice

## Study guides list

Here is the list of data structures and algorithms you should prepare for coding interviews and their corresponding study guides:

| Topic                                           | Priority |
| ----------------------------------------------- | -------- |
| [Array](./array.md)                             | High     |
| [String](./string.md)                           | High     |
| [Hash Table](./hash-table.md)                   | Mid      |
| [Recursion](./recursion.md)                     | Mid      |
| [Sorting and searching](./sorting-searching.md) | High     |
| [Matrix](./matrix.md)                           | High     |
| [Linked List](./linked-list.md)                 | Mid      |
| [Queue](./queue.md)                             | Mid      |
| [Stack](./stack.md)                             | Mid      |
| [Tree](./tree.md)                               | High     |
| [Graph](./graph.md)                             | High     |
| [Heap](./heap.md)                               | Mid      |
| [Trie](./trie.md)                               | Mid      |
| [Interval](./interval.md)                       | Mid      |
| [Dynamic programming](./dynamic-programming.md) | Low      |
| [Binary](./binary.md)                           | Low      |
| [Math](./math.md)                               | Low      |
| [Geometry](./geometry.md)                       | Low      |

## General interview tips

Clarify any assumptions you made subconsciously. Many questions are under-specified on purpose.

Always validate input first. Check for invalid/empty/negative/different type input. Never assume you are given the valid parameters. Alternatively, clarify with the interviewer whether you can assume valid input (usually yes), which can save you time from writing code that does input validation.

Are there any time/space complexity requirements/constraints?

Check for off-by-one errors.

In languages where there are no automatic type coercion, check that concatenation of values are of the same type: `int`/`str`/`list`.

After finishing your code, use a few example inputs to test your solution.

Is the algorithm meant to be run multiple times, for example in a web server? If yes, the input is likely to be preprocess-able to improve the efficiency in each call.

Use a mix of functional and imperative programming paradigms:

- Write pure functions as much as possible.
- Pure functions are easier to reason about and can help to reduce bugs in your implementation.
- Avoid mutating the parameters passed into your function especially if they are passed by reference unless you are sure of what you are doing.
- However, functional programming is usually expensive in terms of space complexity because of non-mutation and the repeated allocation of new objects. On the other hand, imperative code is faster because you operate on existing objects. Hence you will need to achieve a balance between accuracy vs efficiency, by using the right amount of functional and imperative code where appropriate.
- Avoid relying on and mutating global variables. Global variables introduce state.
- If you have to rely on global variables, make sure that you do not mutate it by accident.

Generally, to improve the speed of a program, we can either: (1) choose a more appropriate data structure/algorithm; or (2) use more memory. The latter demonstrates a classic space vs. time tradeoff, but it is not necessarily the case that you can only achieve better speed at the expense of space. Also, note that there is often a theoretical limit to how fast your program can run (in terms of time complexity). For instance, a question that requires you to find the smallest/largest element in an unsorted array cannot run faster than O(N).

Data structures are your weapons. Choosing the right weapon for the right battle is the key to victory. Be very familiar about the strengths of each data structure and the time complexities for its various operations.

Data structures can be augmented to achieve efficient time complexities across different operations. For example, a hash map can be used together with a doubly-linked list to achieve O(1) time complexity for both the `get` and `put` operation in an [LRU cache](https://leetcode.com/problems/lru-cache/).

Hash table is probably the most commonly used data structure for algorithm questions. If you are stuck on a question, your last resort can be to enumerate through the common possible data structures (thankfully there aren't that many of them) and consider whether each of them can be applied to the problem. This has worked for me sometimes.

If you are cutting corners in your code, state that out loud to your interviewer and say what you would do in a non-interview setting (no time constraints). E.g., I would write a regex to parse this string rather than using `split()` which may not cover all cases.

<InDocAd/>

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />

<!-- ## References

- http://blog.triplebyte.com/how-to-pass-a-programming-interview
- http://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/
- https://medium.com/basecs -->
