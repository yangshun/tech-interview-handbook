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

## Recommended Leetcode questions

- [Insert Interval](https://leetcode.com/problems/insert-interval/)
- [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [Meeting Rooms (Leetcode Premium)](https://leetcode.com/problems/meeting-rooms/) and [Meeting Rooms II (Leetcode Premium)](https://leetcode.com/problems/meeting-rooms-ii/)

## More questions

- Given a list of schedules, provide a list of times that are available for a meeting.

  ```
  [
    [[4,5], [6,10], [12,14]],
    [[4,5], [5,9], [13,16]],
    [[11,14]]
  ]

  Example Output:
  [[0,4], [11,12], [16,23]]
  ```

- You have a number of meetings (with their start and end times). You need to schedule them using the minimum number of rooms. Return the list of meetings in every room.
- Interval ranges:
  - Given 2 interval ranges, create a function to tell me if these ranges intersect. Both start and end are inclusive: `[start, end]`
    - E.g. `[1, 4]` and `[5, 6]` => `false`
    - E.g. `[1, 4]` and `[3, 6]` => `true`
  - Given 2 interval ranges that intersect, now create a function to merge the 2 ranges into a single continuous range.
    - E.g. `[1, 4]` and `[3, 6]` => `[1, 6]`
  - Now create a function that takes a group of unsorted, unorganized intervals, merge any intervals that intersect and sort them. The result should be a group of sorted, non-intersecting intervals.
  - Now create a function to merge a new interval into a group of sorted, non-intersecting intervals. After the merge, all intervals should remain non-intersecting.
- Given a list of meeting times, check if any of them overlap. The follow-up question is to return the minimum number of rooms required to accommodate all the meetings.
  - [Source](http://blog.gainlo.co/index.php/2016/07/12/meeting-room-scheduling-problem/)
- If you have a list of intervals, how would you merge them?
  - E.g. `[1, 3], [8, 11], [2, 6]` => `[1, 6], [8-11]`
