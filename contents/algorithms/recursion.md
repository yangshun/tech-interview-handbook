---
id: recursion
title: Recursion
---

## Notes

Recursion is useful for permutation, because it generates all combinations and tree-based questions. You should know how to generate all permutations of a sequence as well as how to handle duplicates.

Remember to always define a base case so that your recursion will end.

Recursion implicitly uses a stack. Hence all recursive approaches can be rewritten iteratively using a stack. Beware of cases where the recursion level goes too deep and causes a stack overflow (the default limit in Python is 1000). You may get bonus points for pointing this out to the interviewer. Recursion will never be O(1) space complexity because a stack is involved, unless there is [tail-call optimization](https://stackoverflow.com/questions/310974/what-is-tail-call-optimization) (TCO). Find out if your chosen language supports TCO.

## Recommended LeetCode questions

- [Subsets](https://leetcode.com/problems/subsets/) and [Subsets II](https://leetcode.com/problems/subsets-ii/)
- [Strobogrammatic Number II (LeetCode Premium)](https://leetcode.com/problems/strobogrammatic-number-ii/)
