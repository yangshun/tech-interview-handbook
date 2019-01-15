Dynamic Programming
==

- Given a flight itinerary consisting of starting city, destination city, and ticket price (2D list) - find the optimal price flight path to get from start to destination. (A variation of Dynamic Programming Shortest Path)
- Given some coin denominations and a target value `M`, return the coins combination with the minimum number of coins.
  - Time complexity: `O(MN)`, where N is the number of distinct type of coins.
  - Space complexity: `O(M)`.
- Given a set of numbers in an array which represent a number of consecutive days of Airbnb reservation requested, as a host, pick the sequence which maximizes the number of days of occupancy, at the same time, leaving at least a 1-day gap in-between bookings for cleaning.
  - The problem reduces to finding the maximum sum of non-consecutive array elements.
  - E.g.
    ~~~
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
    ~~~
- Given a list of denominations (e.g., `[1, 2, 5]` means you have coins worth $1, $2, and $5) and a target number `k`, find all possible combinations, if any, of coins in the given denominations that add up to `k`. You can use coins of the same denomination more than once.
- You are climbing a flight of stairs. It takes n steps to reach to the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? E.g. Input: 3, Output: 3. Explanation: `[1, 1, 1], [1, 2], [2, 1]`.
