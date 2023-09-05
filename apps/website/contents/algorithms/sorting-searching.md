---
id: sorting-searching
title: Sorting and searching cheatsheet for coding interviews
description: Sorting and searching study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    sorting searching coding interview study guide,
    sorting searching tips for coding interviews,
    sorting searching practice questions,
    sorting searching useful techniques,
    sorting searching time complexity,
    sorting searching recommended study resources,
  ]
sidebar_label: Sorting and searching
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-sorting-searching.png" />
</head>

## Introduction

Sorting is the act of rearranging elements in a sequence in order, either in numerical or lexicographical order, and either ascending or descending.

A number of basic algorithms run in O(n<sup>2</sup>) and should not be used in interviews. In algorithm interviews, you're unlikely to need to implement any of the sorting algorithms from scratch. Instead you would need to sort the input using your language's default sorting function so that you can use binary searches on them.

On a sorted array of elements, by leveraging on its sorted property, searching can be done on them in faster than O(n) time by using a binary search. Binary search compares the target value with the middle element of the array, which informs the algorithm whether the target value lies in the left half or the right half, and this comparison proceeds on the remaining half until the target is found or the remaining half is empty.

## Learning resources

While you're unlikely to be asked to implement a sorting algorithm from scratch during an interview, it is good to know the various time complexities of the different sorting algorithms.

- Readings
  - [Sorting Out The Basics Behind Sorting Algorithms](https://medium.com/basecs/sorting-out-the-basics-behind-sorting-algorithms-b0a032873add), basecs
  - [Binary Search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search), Khan Academy
- Additional (only if you have time)
  - [Exponentially Easy Selection Sort](https://medium.com/basecs/exponentially-easy-selection-sort-d7a34292b049), basecs
  - [Bubbling Up With Bubble Sorts](https://medium.com/basecs/bubbling-up-with-bubble-sorts-3df5ac88e592), basecs
  - [Inching Towards Insertion Sort](https://medium.com/basecs/inching-towards-insertion-sort-9799274430da), basecs
  - [Making Sense of Merge Sort (Part 1)](https://medium.com/basecs/making-sense-of-merge-sort-part-1-49649a143478), basecs
  - [Making Sense of Merge Sort (Part 2)](https://medium.com/basecs/making-sense-of-merge-sort-part-2-be8706453209), basecs
  - [Pivoting To Understand Quicksort (Part 1)](https://medium.com/basecs/pivoting-to-understand-quicksort-part-1-75178dfb9313), basecs
  - [Pivoting To Understand Quicksort (Part 2)](https://medium.com/basecs/pivoting-to-understand-quicksort-part-2-30161aefe1d3), basecs
  - [Counting Linearly With Counting Sort](https://medium.com/basecs/counting-linearly-with-counting-sort-cd8516ae09b3), basecs
  - [Getting To The Root Of Sorting With Radix Sort](https://medium.com/basecs/getting-to-the-root-of-sorting-with-radix-sort-f8e9240d4224), basecs
- Videos
  - [Heapsort](https://youtu.be/ryRfapIQHW0) ([slides](https://samuelalbanie.com/files/digest-slides/2022-12-brief-guide-to-heapsort-and-binary-heaps.pdf)), Samuel Albanie, University of Cambridge
  - [Quicksort](https://youtu.be/kbiKn1K08RM) ([slides](https://samuelalbanie.com/files/digest-slides/2023-01-brief-guide-to-quicksort.pdf)), Samuel Albanie, University of Cambridge
  - [Lower bounds for comparison sorts](https://www.youtube.com/watch?v=JWSiXs9aB5U) ([slides](https://samuelalbanie.com/files/digest-slides/2023-01-brief-guide-to-comparison-sorting-lower-bounds.pdf)), Samuel Albanie, University of Cambridge
  - [Counting sort](https://www.youtube.com/watch?v=0aMcZpAySjw) ([slides](https://samuelalbanie.com/files/digest-slides/2023-01-brief-guide-to-counting-sort.pdf)), Samuel Albanie, University of Cambridge
  - [Radix sort](https://www.youtube.com/watch?v=HzPbzQi9404) ([slides](https://samuelalbanie.com/files/digest-slides/2023-01-brief-guide-to-radix-sort.pdf)), Samuel Albanie, University of Cambridge
  - [Bucket sort](https://www.youtube.com/watch?v=mz2fBJyoEVc) ([slides](https://samuelalbanie.com/files/digest-slides/2023-01-brief-guide-to-bucket-sort.pdf)), Samuel Albanie, University of Cambridge

## Time complexity

| Algorithm      | Time             | Space     |
| -------------- | ---------------- | --------- |
| Bubble sort    | O(n<sup>2</sup>) | O(1)      |
| Insertion sort | O(n<sup>2</sup>) | O(1)      |
| Selection sort | O(n<sup>2</sup>) | O(1)      |
| Quicksort      | O(nlog(n))       | O(log(n)) |
| Mergesort      | O(nlog(n))       | O(n)      |
| Heapsort       | O(nlog(n))       | O(1)      |
| Counting sort  | O(n + k)         | O(k)      |
| Radix sort     | O(nk)            | O(n + k)  |

| Algorithm     | Big-O     |
| ------------- | --------- |
| Binary search | O(log(n)) |

## Things to look out for during interviews

Make sure you know the time and space complexity of the language's default sorting algorithm! The time complexity is almost definitely O(nlog(n))). Bonus points if you can name the sort. In Python, it's [Timsort](https://en.wikipedia.org/wiki/Timsort). In Java, [an implementation of Timsort](https://github.com/openjdk/jdk/blob/d9052b946682d1c0f2629455d73fe4e6b95b29db/src/java.base/share/classes/java/util/TimSort.java) is used for sorting objects, and [Dual-Pivot Quicksort](https://github.com/openjdk/jdk/blob/d9052b946682d1c0f2629455d73fe4e6b95b29db/src/java.base/share/classes/java/util/DualPivotQuicksort.java) is used for sorting primitives.

## Corner cases

- Empty sequence
- Sequence with one element
- Sequence with two elements
- Sequence containing duplicate elements.

## Techniques

### Sorted inputs

When a given sequence is in a sorted order (be it ascending or descending), using binary search should be one of the first things that come to your mind.

### Sorting an input that has limited range

[Counting sort](https://en.wikipedia.org/wiki/Counting_sort) is a non-comparison-based sort you can use on numbers where you know the range of values beforehand. Examples: [H-Index](https://leetcode.com/problems/h-index/)

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Binary Search](https://leetcode.com/problems/binary-search/)
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
