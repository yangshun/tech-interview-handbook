---
id: stack
title: Stack cheatsheet for coding interviews
description: Stack study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    stack coding interview study guide,
    stack tips for coding interviews,
    stack practice questions,
    stack useful techniques,
    stack time complexity,
    stack recommended study resources,
  ]
sidebar_label: Stack
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-stack.png" />
</head>

## Introduction

A stack is an abstract data type that supports the operations **push** (insert a new element on the top of the stack) and **pop** (remove and return the most recently added element, the element at the top of the stack). As an abstract data type, stacks can be implemented using arrays or singly linked lists.

This behavior is commonly called LIFO (last in, first out). The name "stack" for this type of structure comes from the analogy to a set of physical items stacked on top of each other.

Stacks are an important way of supporting nested or recursive function calls and is used to implement depth-first search. Depth-first search can be implemented using recursion or a manual stack.

## Learning resources

- Readings
  - [Stacks and Overflows](https://medium.com/basecs/stacks-and-overflows-dbcf7854dc67), basecs
- Videos
  - [Stacks](https://www.coursera.org/lecture/data-structures/stacks-UdKzQ), University of California San Diego

## Implementations

| Language | API |
| --- | --- |
| C++ | [`std::stack`](https://docs.microsoft.com/en-us/cpp/standard-library/stack-class) |
| Java | [`java.util.Stack`](https://docs.oracle.com/javase/10/docs/api/java/util/Stack.html) |
| Python | Simulated using [List](https://docs.python.org/3/tutorial/datastructures.html) |
| JavaScript | Simulated using [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) |

## Time complexity

| Operation | Big-O |
| --------- | ----- |
| Top/Peek  | O(1)  |
| Push      | O(1)  |
| Pop       | O(1)  |
| isEmpty   | O(1)  |
| Search    | O(n)  |

## Corner cases

- Empty stack. Popping from an empty stack
- Stack with one item
- Stack with two items

<!-- ## Techniques

TODO: Monotonic stacks -->

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses)
- [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)
- [Min Stack](https://leetcode.com/problems/min-stack)
- [Asteroid Collision](https://leetcode.com/problems/asteroid-collision)
- [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation)
- [Basic Calculator](https://leetcode.com/problems/basic-calculator)
- [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii)
- [Daily Temperatures](https://leetcode.com/problems/daily-temperatures)
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water)
- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
