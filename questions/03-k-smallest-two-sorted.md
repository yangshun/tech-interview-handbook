---
id: 3
title: K Smallest Elements from Two Sorted Arrays
topics: [array]
difficulty: easy
---

## Question

```
'''
Find the k smallest elements from two sorted arrays of integers.

Input: [1, 2, 3, 4, 5], [2, 3, 4], k = 3
Output: [1, 2, 2]
'''
```

## Time Complexities

- Bad:
  - Time: O((n + m)log(n + m))
- Good:
  - Time: O(k)

## Sample Answers

```py
def k_smallest(A, B, k):
  res = []
  a = b = 0
  while a < len(A) and b < len(B) and (a + b) < k:
    if A[a] < B[b]:
      res.append(A[a])
      a += 1
    else:
      res.append(B[b])
      b += 1
  return res + A[a:k - b] + B[b:k - a]
```
