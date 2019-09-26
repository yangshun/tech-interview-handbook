---
id: math
title: Math
---

## Notes

If code involves division or modulo, remember to check for division or modulo by 0 case.

When a question involves "a multiple of a number", perhaps modulo might be useful.

Check for and handle overflow/underflow if you are using a typed language like Java and C++. At the very least, mention that overflow/underflow is possible and ask whether you need to handle it.

Consider negative numbers and floating point numbers. This may sound obvious, but under interview pressure, many obvious cases go unnoticed.

If the question asks to implement an operator such as power, squareroot or division and want it to be faster than O(n), binary search is usually the approach to go.

#### Some common formulas:

- Sum of 1 to N = (n+1) \* n/2
- Sum of GP = 2<sup>0</sup> + 2<sup>1</sup> + 2<sup>2</sup> + 2<sup>3</sup> + ... 2<sup>n</sup> = 2<sup>n+1</sup> - 1
- Permutations of N = N! / (N-K)!
- Combinations of N = N! / (K! \* (N-K)!)

## Recommended LeetCode questions

- [Pow(x, n)](https://leetcode.com/problems/powx-n/)
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/)
- [Integer to English Words](https://leetcode.com/problems/integer-to-english-words/)
