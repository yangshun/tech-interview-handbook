---
id: binary
title: Binary
---

## Study links

- [Bits, Bytes, Building With Binary](https://medium.com/basecs/bits-bytes-building-with-binary-13cb4289aafa)

## Notes

Questions involving binary representations and bitwise operations are asked sometimes and you must be absolutely familiar with how to convert a number from decimal form into binary form (and vice versa) in your chosen programming language.

Some helpful utility snippets:

- Test k<sup>th</sup> bit is set: `num & (1 << k) != 0`.
- Set k<sup>th</sup> bit: `num |= (1 << k)`.
- Turn off k<sup>th</sup> bit: `num &= ~(1 << k)`.
- Toggle the k<sup>th</sup> bit: `num ^= (1 << k)`.
- To check if a number is a power of 2, `num & num - 1 == 0`.

## Corner cases

- Be aware and check for overflow/underflow
- Negative numbers

## Recommended LeetCode questions

- [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)
- [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- [Counting Bits](https://leetcode.com/problems/counting-bits/)
- [Missing Number](https://leetcode.com/problems/missing-number/)
- [Reverse Bits](https://leetcode.com/problems/reverse-bits/)
