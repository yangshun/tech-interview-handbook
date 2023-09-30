---
id: queue
title: Queue cheatsheet for coding interviews
description: Queue study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    queue coding interview study guide,
    queue tips for coding interviews,
    queue practice questions,
    queue useful techniques,
    queue time complexity,
    queue recommended study resources,
  ]
sidebar_label: Queue
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-queue.png" />
</head>

## Introduction

A queue is a linear collection of elements that are maintained in a sequence and can be modified by the addition of elements at one end of the sequence (**enqueue** operation) and the removal of elements from the other end (**dequeue** operation). Usually, the end of the sequence at which elements are added is called the back, tail, or rear of the queue, and the end at which elements are removed is called the head or front of the queue. As an abstract data type, queues can be implemented using arrays or singly linked lists.

This behavior is commonly called FIFO (first in, first out). The name "queue" for this type of structure comes from the analogy to people lining up in real life to wait for goods or services.

Breadth-first search is commonly implemented using queues.

## Learning resources

- Readings
  - [To Queue Or Not To Queue](https://medium.com/basecs/to-queue-or-not-to-queue-2653bcde5b04), basecs
- Videos
  - [Queues](https://www.coursera.org/lecture/data-structures/queues-EShpq), University of California San Diego

## Implementations

| Language | API |
| --- | --- |
| C++ | [`std::queue`](https://docs.microsoft.com/en-us/cpp/standard-library/queue-class) |
| Java | [`java.util.Queue`](https://docs.oracle.com/javase/10/docs/api/java/util/Queue.html).Use [`java.util.ArrayDeque`](https://docs.oracle.com/javase/10/docs/api/java/util/ArrayDeque.html) |
| Python | [`queue`](https://docs.python.org/3/library/queue.html) |
| JavaScript | N/A |

## Time complexity

| Operation     | Big-O |
| ------------- | ----- |
| Enqueue/Offer | O(1)  |
| Dequeue/Poll  | O(1)  |
| Front         | O(1)  |
| Back          | O(1)  |
| isEmpty       | O(1)  |

## Things to look out for during interviews

Most languages don't have a built-in Queue class which can be used, and candidates often use arrays (JavaScript) or lists (Python) as a queue. However, note that the dequeue operation (assuming the front of the queue is on the left) in such a scenario will be O(n) because it requires shifting of all other elements left by one. In such cases, you can flag this to the interviewer and say that you assume that there's a queue data structure to use which has an efficient dequeue operation.

## Corner cases

- Empty queue
- Queue with one item
- Queue with two items

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks)
- [Design Circular Queue](https://leetcode.com/problems/design-circular-queue)
- [Design Hit Counter (LeetCode Premium)](https://leetcode.com/problems/design-hit-counter)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
