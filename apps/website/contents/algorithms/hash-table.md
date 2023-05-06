---
id: hash-table
title: Hash table cheatsheet for coding interviews
description: Hash table study guide for coding interviews, including practice questions, techniques, time complexity, and recommended resources
keywords:
  [
    hash table coding interview study guide,
    hash table tips for coding interviews,
    hash table practice questions,
    hash table useful techniques,
    hash table time complexity,
    hash table recommended study resources,
  ]
sidebar_label: Hash table
toc_max_heading_level: 2
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/algorithms/algorithms/algorithms-hash-table.png" />
</head>

## Introduction

A hash table (commonly referred to as hash map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function on an element to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found. During lookup, the key is hashed and the resulting hash indicates where the corresponding value is stored.

Hashing is the most common example of a space-time tradeoff. Instead of linearly searching an array every time to determine if an element is present, which takes O(n) time, we can traverse the array once and hash all the elements into a hash table. Determining if the element is present is a simple matter of hashing the element and seeing if it exists in the hash table, which is O(1) on average.

In the case of hash collisions, there are a number of collision resolution techniques that can be used. You will unlikely be asked about details of collision resolution techniques in interviews:

- **Separate chaining** - A linked list is used for each value, so that it stores all the collided items.
- **Open addressing** - All entry records are stored in the bucket array itself. When a new entry has to be inserted, the buckets are examined, starting with the hashed-to slot and proceeding in some probe sequence, until an unoccupied slot is found.

## Learning resources

- Readings
  - [Taking Hash Tables Off The Shelf](https://medium.com/basecs/taking-hash-tables-off-the-shelf-139cbf4752f0), basecs
  - [Hashing Out Hash Functions](https://medium.com/basecs/hashing-out-hash-functions-ea5dd8beb4dd), basecs
- Videos
  - [Core: Hash Tables](https://www.coursera.org/lecture/data-structures-optimizing-performance/core-hash-tables-m7UuP), University of California San Diego
  - [A Brief Guide to Hash Tables](https://www.youtube.com/watch?v=r1XZGP5ppqQ) ([slides](https://samuelalbanie.com/files/digest-slides/2022-09-brief-guide-to-hash-tables.pdf)), Samuel Albanie, University of Cambridge

## Implementations

| Language | API |
| --- | --- |
| C++ | [`std::unordered_map`](https://docs.microsoft.com/en-us/cpp/standard-library/unordered-map) |
| Java | [`java.util.Map`](https://docs.oracle.com/javase/10/docs/api/java/util/Map.html). Use [`java.util.HashMap`](https://docs.oracle.com/javase/10/docs/api/java/util/HashMap.html) |
| Python | [`dict`](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) |
| JavaScript | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) |

## Time complexity

| Operation | Big-O  | Note                                                 |
| --------- | ------ | ---------------------------------------------------- |
| Access    | N/A    | Accessing not possible as the hash code is not known |
| Search    | O(1)\* |                                                      |
| Insert    | O(1)\* |                                                      |
| Remove    | O(1)\* |                                                      |

_\* This is the average case, but in interviews we only care about the average case for hash tables._

## Sample questions

- Describe an implementation of a least-used cache, and big-O notation of it.
- A question involving an API's integration with hash map where the buckets of hash map are made up of linked lists.

## Essential questions

_These are essential questions to practice if you're studying for this topic._

- [Two Sum](https://leetcode.com/problems/two-sum)
- [Ransom Note](https://leetcode.com/problems/ransom-note)

## Recommended practice questions

_These are recommended questions to practice after you have studied for the topic and have practiced the essential questions._

- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)
- [First Missing Positive](https://leetcode.com/problems/first-missing-positive/)
- [LRU Cache](https://leetcode.com/problems/lru-cache/)
- [All O one Data Structure](https://leetcode.com/problems/all-oone-data-structure/)

## Recommended courses

import AlgorithmCourses from '../\_courses/AlgorithmCourses.md'

<AlgorithmCourses />
