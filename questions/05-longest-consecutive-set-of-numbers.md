---
id: 5
title: Longest Consecutive Set of Numbers
topics: [graph]
difficulty: hard
source: https://leetcode.com/problems/longest-consecutive-sequence/
---

## Question

```
'''
Given an array of integers, find the size of the largest set of consecutive numbers present in the array.

Input: [100, 4, 200, 1, 3, 2]
Output: 4 because {1, 2, 3, 4}
'''
```

## Sample Answers

```py
def longest_consecutive(nums):
    nums = set(nums)
    best = 0
    for x in nums:
        if x - 1 not in nums:
            y = x + 1
            while y in nums:
                y += 1
            best = max(best, y - x)
    return best
```
