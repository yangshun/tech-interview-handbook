---
id: heap
title: Heap
toc_max_heading_level: 2
---

## Introduction

A heap is a specialized tree-based data structure which is a complete tree that satisfies the heap property.

- Max heap - In a max heap the value of a node must be greatest among the node values in its entire subtree. The same property must be recursively true for all nodes in the tree.
- Min heap - In a min heap the value of a node must be smallest among the node values in its entire subtree. The same property must be recursively true for all nodes in the tree.

In the context of algorithm interviews, heaps and priority queues can be treated as the same data structure. A heap is a useful data structure when it is necessary to repeatedly remove the object with the highest (or lowest) priority, or when insertions need to be interspersed with removals of the root node.

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
| Finx max/min                                           | O(1)      |
| Insert                                                 | O(log(n)) |
| Remove                                                 | O(log(n)) |
| Heapify (create a heap out of given array of elements) | O(n)      |

## Learning resources

- [Learning to Love Heaps](https://medium.com/basecs/learning-to-love-heaps-cef2b273a238), basecs
- [Heapify All The Things With Heap Sort](https://medium.com/basecs/heapify-all-the-things-with-heap-sort-55ee1c93af82), basecs
- [Heaps](http://www.cs.yale.edu/homes/aspnes/classes/223/notes.html#heaps), James Aspnes, Yale University

## Techniques

### Mention of `k`

If you see a top or lowest _k_ being mentioned in the question, it is usually a signal that a heap can be used to solve the problem, such as in [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/).

If you require the top _k_ elements use a Min Heap of size _k_. Iterate through each element, pushing it into the heap. Whenever the heap size exceeds _k_, remove the minimum element, that will guarantee that you have the _k_ largest elements.

## Recommended questions

- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
