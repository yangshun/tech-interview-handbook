---
id: math
title: Math cheatsheet for coding interviews
description: Math study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    math coding interview study guide,
    math tips for coding interviews,
    math practice questions,
    math useful techniques,
    math time complexity,
    math recommended study resources,
  ]
sidebar_label: Math
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-math.png" />
</head>

## Introduction

Math is a foundational aspect of Computer Science and every programmer and computer scientist needs to have basic mathematical knowledge. Thankfully, for the purpose of coding interviews, there usually won't be that much math involved, but some basic math techniques is helpful to know as you may be asked to implement mathematical operations.

## Things to look out for during interviews

- If code involves division or modulo, remember to check for division or modulo by 0 case.
- Check for and handle overflow/underflow if you are using a typed language like Java and C++. At the very least, mention that overflow/underflow is possible and ask whether you need to handle it.
- Consider negative numbers and floating point numbers. This may sound obvious, but under interview pressure, many obvious cases go unnoticed.

## Corner cases

- Division by 0
- Multiplication by 1
- Negative numbers
- Floats

## Common formulas

|  | Formula |
| --- | --- |
| Check if a number is even | `num % 2 == 0` |
| Sum of 1 to N | 1 + 2 + ... + (N - 1) + N = (N+1) \* N/2 |
| Sum of Geometric Progression | 2<sup>0</sup> + 2<sup>1</sup> + 2<sup>2</sup> + 2<sup>3</sup> + ... 2<sup>n</sup> = 2<sup>n+1</sup> - 1 |
| Permutations of N | N! / (N-K)! |
| Combinations of N | N! / (K! \* (N-K)!) |

## Techniques

### Multiples of a number

When a question involves "whether a number is a multiple of X", the modulo operator would be useful.

### Comparing floats

When dealing with floating point numbers, take note of rounding mistakes. Consider using epsilon comparisons instead of equality checks. E.g. `abs(x - y) <= 1e-6` instead of `x == y`.

### Fast operators

If the question asks you to implement an operator such as power, square root or division and want it to be faster than O(n), some sort of doubling (fast exponentiation) or halving (binary search) is usually the approach to go. Examples: [Pow(x, n)](https://leetcode.com/problems/powx-n/), [Sqrt(x)](https://leetcode.com/problems/sqrtx/)

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Pow(x, n)](https://leetcode.com/problems/powx-n/)
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Integer to English Words](https://leetcode.com/problems/integer-to-english-words/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
