Arrays
==

#### Hard
- Given a set of rectangles represented by a height and an interval along the y-axis, determine the size of its union. ([Solution](https://www.geeksforgeeks.org/divide-and-conquer-set-7-the-skyline-problem/))
- Given an array, find the longest arithmetic progression. ([Solution](https://www.geeksforgeeks.org/longest-arithmetic-progression-dp-35/))

#### Medium
- Given a list of item prices, find all possible combinations of items that sum a particular value `K`. ([Solution](https://www.geeksforgeeks.org/combinational-sum/))
- Given an array of integers find whether there is a sub-sequence that sums to 0 and return it. ([Solution](https://www.geeksforgeeks.org/find-if-there-is-a-subarray-with-0-sum/))
  - E.g. `[1, 2, -3, 1]` => `[1, 2, -3]` or `[2, -3, 1]`
- Trapping rain water: You have an array with the heights of an island (at point 1, point 2 etc) and you want to know how much water would remain on this island (without flowing away). ([Solution](https://www.geeksforgeeks.org/trapping-rain-water/))

#### Easy
- Implement a circular buffer using an array. ([Solution](https://www.geeksforgeeks.org/circular-queue-set-1-introduction-array-implementation/))
- Given an array of integers, print out a histogram using the said array; include a base layer (all stars) ([Solution](https://www.geeksforgeeks.org/program-make-histogram-array/))
- Given an array and an index, find the product of the elements of the array except the element at that index. ([Solution](https://www.geeksforgeeks.org/a-product-array-puzzle/))
- Given 2 separate arrays, write a method to find the values that exist in both arrays and return them. ([Solution](https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/))
- Given an input array and another array that describes a new index for each element, mutate the input array so that each element ends up in their new index ([Solution](https://www.geeksforgeeks.org/reorder-a-array-according-to-given-indexes/))
  - Discuss the runtime of the algorithm and how you can be sure there would not be any infinite loops
- Given an array of non-negative numbers, find continuous subarray with sum to S.  ([Solution 1](https://www.geeksforgeeks.org/find-subarray-with-given-sum/)) ([Solution 2](http://blog.gainlo.co/index.php/2016/06/01/subarray-with-given-sum/))
- Given an array of numbers list out all triplets that sum to 0. Do so with a running time of less than O(n^3). ([Solution 1](https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/)) ([Solution 2](http://blog.gainlo.co/index.php/2016/07/19/3sum/))
- Given an array of numbers list out all quadruplets that sum to 0. Do so with a running time of less than O(n^4). ([Solution](https://www.geeksforgeeks.org/find-four-numbers-with-sum-equal-to-given-sum/))
- Given an array of integers, find the subarray with the largest sum. ([Solution](https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/))
- Find the second maximum value in an array. ([Solution](https://www.geeksforgeeks.org/find-second-largest-element-array/))
- Rotate an array by an offset of k. ([Solution](https://www.geeksforgeeks.org/array-rotation/))
- Remove duplicates in an unsorted array where the duplicates are at a distance of k or less from each other. ([Solution](https://www.geeksforgeeks.org/check-given-array-contains-duplicate-elements-within-k-distance/))
- Given an unsorted list of integers, return true if the list contains any duplicates within k indices of each element. Do it faster than O(n^2). ([Solution](https://www.geeksforgeeks.org/check-given-array-contains-duplicate-elements-within-k-distance/))
  - Given an unsorted list of integers, return true if the list contains any fuzzy duplicates within k indices of each element. A fuzzy duplicate is another integer within d of the original integer. Do it faster than O(n^2).
  - E.g. If d = 4, then 6 is a fuzzy duplicate of 3 but 8 is not.
- Say you have an unordered list of numbers ranging from 1 to n, and one of the numbers is removed, how do you find that number? What if two numbers are removed? ([Solution](https://www.geeksforgeeks.org/find-the-missing-number/))
- Given an array of string, find the duplicated elements. ([Solution 1](https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/)) ([Solution 2](http://blog.gainlo.co/index.php/2016/05/10/duplicate-elements-of-an-array/))
- Given an array of integers, find a maximum sum of non-adjacent elements. ([Solution 1](https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/)) ([Solution 2](http://blog.gainlo.co/index.php/2016/12/02/uber-interview-question-maximum-sum-non-adjacent-elements/))
  - E.g. `[1, 0, 3, 9, 2]` should return `10 (1 + 9)`.
- Given an array of integers, modify the array by moving all the zeroes to the end (right side). The order of other elements doesn't matter. ([Solution 1](https://www.geeksforgeeks.org/move-zeroes-end-array/)) ([Solution 2](http://blog.gainlo.co/index.php/2016/11/18/uber-interview-question-move-zeroes/))
  - E.g. `[1, 2, 0, 3, 0, 1, 2]`, the program can output `[1, 2, 3, 1, 2, 0, 0]`.
- Given an array, return the length of the longest increasing contiguous subarray. ([Solution 1](https://www.geeksforgeeks.org/longest-increasing-subarray/)) ([Solution 2](http://blog.gainlo.co/index.php/2017/02/02/uber-interview-questions-longest-increasing-subarray/))
  - E.g., `[1, 3, 2, 3, 4, 8, 7, 9]`, should return `4` because the longest increasing array is `[2, 3, 4, 8]`
- Given an array of integers where every value appears twice except one, find the single, non-repeating value. Follow up: do so with O(1) space. ([Solution](https://www.geeksforgeeks.org/find-element-appears-array-every-element-appears-twice/))
  - E.g., `[2, 5, 3, 2, 1, 3, 4, 5, 1]` returns 4, because it is the only value that appears in the array only once.

#### Other
- In an array of arrays, e.g. given `[[], [1, 2, 3], [4, 5], [], [], [6, 7], [8], [9, 10], [], []]`, print: `1, 2, 3, 4, 5, 6, 7, 8, 9, 10`.
  - Implement an iterator that supports `hasNext()`, `next()` and `remove()` methods.
- Paginate an array with constraints, such as skipping certain items.
- Given array of arrays, sort them in ascending order.
- Given an array containing only digits `0-9`, add one to the number and return the array.
  - E.g. Given `[1, 4, 2, 1]` which represents `1421`, return `[1, 4, 2, 2]` which represents `1422`.
