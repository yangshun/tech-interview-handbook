---
id: dynamic-programming
title: Dynamic Programming
---

## Study links

- [Demystifying Dynamic Programming](https://medium.freecodecamp.org/demystifying-dynamic-programming-3efafb8d4296)
- [Dynamic Programming – 7 Steps to Solve any DP Interview Problem](https://dev.to/nikolaotasevic/dynamic-programming--7-steps-to-solve-any-dp-interview-problem-3870)

## Notes

Dynamic Programming (DP) is usually used to solve optimization problems. The only way to get better at DP is to practice. It takes some amount of practice to be able to recognize that a problem can be solved by DP.

Sometimes you do not need to store the whole DP table in memory, the last two values or the last two rows of the matrix will suffice.

## Recommended Leetcode questions

- 0/1 Knapsack
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- [Coin Change](https://leetcode.com/problems/coin-change/)
- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Longest Common Subsequence](https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/)
- [Word Break Problem](https://leetcode.com/problems/word-break/)
- [Combination Sum](https://leetcode.com/problems/combination-sum-iv/)
- [House Robber](https://leetcode.com/problems/house-robber/) and [House Robber II](https://leetcode.com/problems/house-robber-ii/)
- [Decode Ways](https://leetcode.com/problems/decode-ways/)
- [Unique Paths](https://leetcode.com/problems/unique-paths/)
- [Jump Game](https://leetcode.com/problems/jump-game/)

## More questions

- Given a flight itinerary consisting of starting city, destination city, and ticket price (2D list) - find the optimal price flight path to get from start to destination. (A variation of Dynamic Programming Shortest Path)
- Given some coin denominations and a target value `M`, return the coins combination with the minimum number of coins.
  - Time complexity: `O(MN)`, where N is the number of distinct type of coins.
  - Space complexity: `O(M)`.
- Given a set of numbers in an array which represent a number of consecutive days of Airbnb reservation requested, as a host, pick the sequence which maximizes the number of days of occupancy, at the same time, leaving at least a 1-day gap in-between bookings for cleaning.

  - The problem reduces to finding the maximum sum of non-consecutive array elements.
  - E.g.

    ```
    // [5, 1, 1, 5] => 10
    The above array would represent an example booking period as follows -
    // Dec 1 - 5
    // Dec 5 - 6
    // Dec 6 - 7
    // Dec 7 - 12

    The answer would be to pick Dec 1-5 (5 days) and then pick Dec 7-12 for a total of 10 days of
    occupancy, at the same time, leaving at least 1-day gap for cleaning between reservations.

    Similarly,
    // [3, 6, 4] => 7
    // [4, 10, 3, 1, 5] => 15
    ```

- Given a list of denominations (e.g., `[1, 2, 5]` means you have coins worth $1, $2, and \$5) and a target number `k`, find all possible combinations, if any, of coins in the given denominations that add up to `k`. You can use coins of the same denomination more than once.
- You are climbing a flight of stairs. It takes n steps to reach to the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? E.g. Input: 3, Output: 3. Explanation: `[1, 1, 1], [1, 2], [2, 1]`.
