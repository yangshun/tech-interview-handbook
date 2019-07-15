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

## Recommended Leetcode questions

- [Pow(x, n)](https://leetcode.com/problems/powx-n/)
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/)
- [Integer to English Words](https://leetcode.com/problems/integer-to-english-words/)

## More questions

- Create a square root function.
- Given a string such as "123" or "67", write a function to output the number represented by the string without using casting.
- Make a program that can print out the text form of numbers from 1 - 1000 (ex. 20 is "twenty", 105 is "one hundred and five").
- Write a function that parses Roman numerals.
  - E.g. `XIV` returns `14`.
- Write in words for a given digit.
  - E.g. `123` returns `one hundred and twenty three`.
- Given a number `N`, find the largest number just smaller than `N` that can be formed using the same digits as `N`.
- Compute the square root of `N` without using any existing functions.
- Given numbers represented as binary strings, and return the string containing their sum.
  - E.g. `add('10010', '101')` returns `'10111'`.
- Take in an integer and return its english word-format.
  - E.g. 1 -> "one", -10,203 -> "negative ten thousand two hundred and three".
- Write a function that returns values randomly, according to their weight. Suppose we have 3 elements with their weights: A (1), B (1) and C (2). The function should return A with probability 25%, B with 25% and C with 50% based on the weights.
  - [Source](http://blog.gainlo.co/index.php/2016/11/11/uber-interview-question-weighted-random-numbers/)
- Given a number, how can you get the next greater number with the same set of digits?
  - [Source](http://blog.gainlo.co/index.php/2017/01/20/arrange-given-numbers-to-form-the-biggest-number-possible/)
