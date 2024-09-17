---
id: binary
title: Binary cheatsheet for coding interviews
description: binary study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    binary coding interview study guide,
    binary tips for coding interviews,
    binary practice questions,
    binary useful techniques,
    binary time complexity,
    binary recommended study resources,
  ]
sidebar_label: Binary
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-binary.png" />
</head>

## Introduction

Knowledge of binary number system and bit manipulation is less important in coding interviews as most Software Engineers do not have to deal with bits, which is more commonly used when dealing with lower level systems and programming languages. They are still asked sometimes, so you should at least still know how to convert a number from decimal form into binary form (and vice versa) in your chosen programming language.

## Learning resources

- Readings
  - [Bits, Bytes, Building With Binary](https://medium.com/basecs/bits-bytes-building-with-binary-13cb4289aafa), basecs
  - [Bitwise operation](https://en.wikipedia.org/wiki/Bitwise_operation), Wikipedia
- Videos
  - [Algorithms: Bit Manipulation](https://www.youtube.com/watch?v=NLKQEOgBAnw), HackerRank
- Practice
  - [Practice with bit operations](https://pconrad.github.io/old_pconrad_cs16/topics/bitOps/)

## Corner cases

- Be aware and check for overflow/underflow
- Negative numbers

## Techniques

Questions involving binary representations and bitwise operations are asked sometimes and you must be absolutely familiar with how to convert a number from decimal form into binary form (and vice versa) in your chosen programming language.

Some helpful utility snippets:

| Technique | Code |
| --- | --- |
| Test k<sup>th</sup> bit is set | `num & (1 << k) != 0` |
| Set k<sup>th</sup> bit | <code>num &#124;= (1 &gt;&gt; k)</code> |
| Turn off k<sup>th</sup> bit | `num &= ~(1 << k)` |
| Toggle the k<sup>th</sup> bit | `num ^= (1 << k)` |
| Multiply by 2<sup>k</sup> | `num << k` |
| Divide by 2<sup>k</sup> | `num >> k` |
| Check if a number is a power of 2 | `(num & num - 1) == 0` or `(num & (-num)) == num` |
| Swapping two variables | `num1 ^= num2; num2 ^= num1; num1 ^= num2` |

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)
- [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Counting Bits](https://leetcode.com/problems/counting-bits/)
- [Missing Number](https://leetcode.com/problems/missing-number/)
- [Reverse Bits](https://leetcode.com/problems/reverse-bits/)
- [Single Number](https://leetcode.com/problems/single-number/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
