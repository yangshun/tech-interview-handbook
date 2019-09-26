---
id: heap
title: Heap
---

## Study links

- [Learning to Love Heaps](https://medium.com/basecs/learning-to-love-heaps-cef2b273a238)

## Notes

If you see a top or lowest _k_ being mentioned in the question, it is usually a signal that a heap can be used to solve the problem, such as in [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/).

If you require the top _k_ elements use a Min Heap of size _k_. Iterate through each element, pushing it into the heap. Whenever the heap size exceeds _k_, remove the minimum element, that will guarantee that you have the _k_ largest elements.

## Recommended LeetCode questions

- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
