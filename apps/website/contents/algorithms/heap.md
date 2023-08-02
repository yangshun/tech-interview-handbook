---
id: heap
title: Heap cheatsheet for coding interviews
description: Heap study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    heap coding interview study guide,
    heap tips for coding interviews,
    heap practice questions,
    heap useful techniques,
    heap time complexity,
    heap recommended study resources,
  ]
sidebar_label: Heap
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-heap.png" />
</head>

## Introduction

A heap is a specialized tree-based data structure which is a complete tree that satisfies the heap property.

- Max heap - In a max heap, the value of a node must be greatest among the node values in its entire subtree. The same property must be recursively true for all nodes in the tree.
- Min heap - In a min heap, the value of a node must be smallest among the node values in its entire subtree. The same property must be recursively true for all nodes in the tree.

In the context of algorithm interviews, heaps and priority queues can be treated as the same data structure. A heap is a useful data structure when it is necessary to repeatedly remove the object with the highest (or lowest) priority, or when insertions need to be interspersed with removals of the root node.

## Learning resources

- [Learning to Love Heaps](https://medium.com/basecs/learning-to-love-heaps-cef2b273a238), basecs
- [Heapify All The Things With Heap Sort](https://medium.com/basecs/heapify-all-the-things-with-heap-sort-55ee1c93af82), basecs
- [Heaps](http://www.cs.yale.edu/homes/aspnes/classes/223/notes.html#heaps), James Aspnes, Yale University

## Implementations

| Language | API |
| --- | --- |
| C++ | [`std::priority_queue`](https://docs.microsoft.com/en-us/cpp/standard-library/priority-queue-class) |
| Java | [`java.util.PriorityQueue`](https://docs.oracle.com/javase/10/docs/api/java/util/PriorityQueue.html) |
| Python | [`heapq`](https://docs.python.org/library/heapq.html) |
| JavaScript | N/A |

## Time complexity

| Operation                                              | Big-O     |
| ------------------------------------------------------ | --------- |
| Find max/min                                           | O(1)      |
| Insert                                                 | O(log(n)) |
| Remove                                                 | O(log(n)) |
| Heapify (create a heap out of given array of elements) | O(n)      |

## Techniques

### Mention of `k`

If you see a top or lowest _k_ being mentioned in the question, it is usually a signal that a heap can be used to solve the problem, such as in [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/).

If you require the top _k_ elements use a Min Heap of size _k_. Iterate through each element, pushing it into the heap (for python `heapq`, invert the value before pushing to find the max). Whenever the heap size exceeds _k_, remove the minimum element, that will guarantee that you have the _k_ largest elements.

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
