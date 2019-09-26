---
id: interval
title: Interval
---

## Notes

Interval questions are questions where you are given an array of two-element arrays (an interval) and the two values represent a start and an end value. Interval questions are considered part of the array family but they involve some common techniques hence they are extracted out to this special section of their own.

An example interval array: `[[1, 2], [4, 7]]`.

Interval questions can be tricky to those who have not tried them before because of the sheer number of cases to consider when they overlap.

Do clarify with the interviewer whether `[1, 2]` and `[2, 3]` are considered overlapping intervals as it affects how you will write your equality checks.

A common routine for interval questions is to sort the array of intervals by each interval's starting value.

Be familiar with writing code to check if two intervals overlap and merging two overlapping intervals:

```py
def is_overlap(a, b):
  return a[0] < b[1] and b[0] < a[1]

def merge_overlapping_intervals(a, b):
  return [min(a[0], b[0]), max(a[1], b[1])]
```

## Corner cases

- Single interval
- Non-overlapping intervals
- An interval totally consumed within another interval
- Duplicate intervals

## Recommended LeetCode questions

- [Insert Interval](https://leetcode.com/problems/insert-interval/)
- [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [Meeting Rooms (LeetCode Premium)](https://leetcode.com/problems/meeting-rooms/) and [Meeting Rooms II (LeetCode Premium)](https://leetcode.com/problems/meeting-rooms-ii/)
