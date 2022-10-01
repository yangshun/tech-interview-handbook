---
id: coding-interview-techniques
title: Top techniques to approach and solve coding interview questions
description: Learn methods to find solutions for coding interview problems and optimize their time and space complexity
keywords:
  [
    how to approach a coding interview question,
    how to solve any coding interview question,
    coding interview practice,
    coding interview questions,
    optimize time complexity,
    optimize space complexity,
    optimize time and space complexity,
  ]
sidebar_label: Techniques to solve questions
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/coding-interview-techniques.png" />
</head>

import InDocAd from './\_components/InDocAd';

The biggest fear most candidates will have during a coding interview is: what if I get stuck on the question and don't know how to do it? Fortunately, there are structured ways to approach coding interview questions that will increase your chances of solving them. From how to find a solution or approach, to optimizing time and space complexity, here are some of the top tips and best practices that will help you solve coding interview questions.

## How to find solutions to coding interview problems

When given a coding interview question, candidates should start by asking clarifying questions and discussing a few possible approaches with their interviewers. However, this is where most candidates tend to get stuck. Thankfully, there are ways to do this in a structured manner.

Note that not all techniques will apply to every coding interview problem, and you can also use multiple techniques on one single problem! As you apply these techniques during your practice, you will develop the intuition for which technique will be useful for the problem at hand.

### 1. Visualize the problem by drawing it out

Ever wondered why coding interviews are traditionally done on whiteboards and videos explaining answers to coding questions tend to use diagrams? Whiteboards make it easy to draw diagrams which helps with problem solving! A huge part of coding is understanding how the internal state of a program changes and diagrams are super useful tools for representing the internal data structures state. If you are having a hard time understanding how the solution is obtained, come up with a visual representation of the problem and if necessary, the internal states at each step.

This technique is especially useful if the input involves trees, graphs, matrices, linked lists.

#### Example

How would you [return all elements of a matrix in spiral order](https://leetcode.com/problems/spiral-matrix/)? Drawing out the matrix and the steps your iterator needs to take in each direction will help tremendously in allowing you to see the pattern.

### 2. Think about how you would solve the problem by hand

Solving the problem by hand is about solving the problem without writing any code, like how a non-programmer would. This already happens naturally most of the time when you are trying to understand the example given to you.

What some people don't realize is that sometimes a working solution is simply a code version of the manual approach. If you can come up with a concrete set of rules around the approach that works for every example, you can write the code for it. While you might not arrive at the most efficient solution by doing this, it's a start which will give you some credit.

#### Example

How do you [validate if a tree is a valid Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) without writing any code? You first check if the left subtree contains only values less than the root, then check that the right subtree contains only values bigger than the root, then repeat for each node. This process seems feasible. Now you just have to turn this process into code.

### 3. Come up with more examples

Coming up with more examples is something useful you can do regardless of whether you are stuck or not. It helps you to reinforce your understanding of the question, prevents you from prematurely jumping into coding, helps you to identify a pattern which can be generalized to any input, which is the solution! Lastly, the multiple examples can be used as test cases at the end when verifying your solution.

<InDocAd />

### 4. Break the question down into smaller independent parts

If the problem is large, start with a high-level function and break it down into smaller constituting functions, solving each one separately. This prevents you from getting overwhelmed with the details of doing everything at once and keeps your thinking structured.

Doing so also makes it clear to the interviewer that you have an approach, even if you don't manage to finish coding all of the smaller functions.

#### Example

The [Group Anagrams](https://leetcode.com/problems/group-anagrams/) problem can be broken down into two parts - hashing a string, grouping the strings together. Each part can be solved separately with independent implementation details. You could start off with this code:

```py
def group_anagrams(strings):
  def hash(string):
    # Fill in later
    pass

  def group_strings(strings_hashes):
    # Fill in later
    pass

  strings_hashes = [(string, hash(string)) for string in strings]
  return group_strings(strings_hashes)
```

And proceed to fill in the implementation of each function. However, do note that sometimes the most efficient solutions will require you to break some abstractions and do multiple operations in one pass of the input. If your interviewer asks you to optimize based on your well-abstracted solution, that is one possible path forward.

### 5. Apply common data structures and algorithms at the problem

Unlike real-world software engineering where the problems are usually open-ended and might not have clear solutions, coding interview problems tend to be smaller in nature and are designed to be solvable within the duration of the interview. You can also expect that the knowledge required to solve the problem is not out of this world and they would have been taught during college. Thankfully, the number of common data structures and algorithms is finite and a hacky approach which works from my experience is to try going through all the common data structures and applying them to the problem.

These are the data structures to keep in mind and try, in order of frequency they appear in coding interview questions:

- **Hash Maps**: Useful for making lookup efficient. This is the most common data structure used in interviews and you are guaranteed to have to use it.
- **Graphs**: If the data is presented to you as associations between entities, you might be able to model the question as a graph and use some common graph algorithm to solve the problem.
- **Stack and Queue**: If you need to parse a string with nested properties (such as a mathematical equation), you will almost definitely need to use stacks.
- **Heap**: Question involves scheduling/ordering based on some priority. Also useful for finding the max K/min K/median elements in a set.
- **Tree/Trie**: Do you need to store strings in a space-efficient manner and look for the existence of strings (or at least part of them) very quickly?

**Routines**

- Sorting
- Binary search: Useful if the input array is sorted and you need to do faster than O(n) searches
- Sliding window
- Two pointers
- Union find
- BFS/DFS
- Traverse from the back
- Topological Sorting

In future we will add tips on how to better identify the most relevant data structures and routines based on the problem.

<InDocAd />

## How to optimize your approach or solution

After you've come up with an initial solution to the coding interview problem, your interviewer would most likely prompt you to optimize the solution by asking "Can we do better". The following techniques help you further optimize the time and space complexity of your solution:

### How to optimize time complexity

#### 1. Identify the Best Theoretical Time Complexity of the solution

The Best Theoretical Time Complexity (BTTC) of a solution is a time complexity you know that you cannot beat.

Some simplified examples:

- The BTTC of finding the sum of numbers in array is O(n) because you have to look at every value in the array at least once
- The BTTC of finding the [number of groups of anagrams](https://leetcode.com/problems/group-anagrams/) is O(nk) where n is the number of words and k is the maximum number of letters in a word because you have to look at each word at least once and look at each character in each word at least once
- The BTTC of finding the number of islands in a matrix is O(nm) where n is the number of rows and m is the number of columns because you have to look at each cell in the matrix at least once

Why is it important to know the BTTC? So that you don't go down the rabbit hole of trying to find a solution that is faster than the BTTC. The fastest practical solution can only ever be as fast as the BTTC, not faster than the BTTC. The BTTC is not necessarily achievable in practice (hence theoretical), it just means you can never find a real solution that is faster than it. If your initial solution is slower than the BTTC, there could be opportunities to improve such that you can attain the BTTC (but not always the case). It wouldn't hurt to mention the BTTC to your interviewer, which will be taken as a positive signal and also to remind yourself that you should not try to come up with something faster than the BTTC.

Some people might think that the BTTC is simply the total number of elements in a data structure, because you need to go through each element once. This is **not always true**. The most famous example would be finding a number in a sorted array of numbers. The sorted property changes things a whole lot:

- Finding a number would be O(log(n)) because you can use a binary search.
- Finding the largest number would be O(1) because it is the last value in the array.

This is why it is important to pay attention to every detail given about the question. Be careful not to determine the incorrect BTTC due to lack of attention to the question details!

With the correct BTTC determined, you now know the time complexity of the optimal solution lies between your initial solution and the BTTC and can work your way towards it. If your solution already has the BTTC and the interviewer is asking you to optimize further, there are usually two things they are looking out for:

- Do even less work. Your solution could be O(n) but making two passes of the array and the interviewer is looking for the solution that uses a single pass.
- Use less space. Refer to the section below on optimizing space complexity.

#### 2. Identify overlapping and repeated computation

A naive/brute force solution often executes the same operation over and over again. When the code is doing an expensive operation that has been done before, take a moment to step back and consider if you can reuse results from previous computations. Dynamic programming (DP) is the most obvious type of questions you can entirely leverage past computations. There are non-DP questions that can leverage this technique too, although not as straightforward and might require a preprocessing step.

##### Example

The [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) question is a good example of a problem which contains overlapping/repeated work. To get the value for an index, you need to multiply the values at all other positions. Doing this for every value in the array would take O(n<sup>2</sup>) time. However, see that:

- `result[n]`: `Product(nums[0] … nums[n-1]) * Product(nums[n + 1] … nums[N - 1])`
- `result[n + 1]`: `Product(nums[0] … nums[n]) * Product(num[n + 2] … nums[N - 1])`

There's a ton of duplicated work in computing the `result[n]` vs `result[n + 1]`! This is an opportunity to reuse earlier computations made while computing `result[n]` to compute `result[n + 1]`. Indeed, we can make use of a prefix array to help us arrive at the final solution in O(n) time at the cost of more space.

#### 3. Try different data structures

Choice of data structures is key to coding interviews. It can help you to reach a solution for the problem, it can also help you to optimize your existing solution. Sometimes it's worth going through the exercise of iterating through the data structures you know once again.

Is lookup time slowing your algorithm down? In general, most lookup operations should be O(1) with the help of a hash table. If the lookup operation in your solution is the bottleneck to your solution's time complexity, more often than not, you can use a hash table to optimize the lookup.

##### Example

The [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) question can be solved in a naive manner by calculating the distance of each point, sorting them and then taking the K smallest values. This takes O(nlog(n)) time because of the sorting. However, by using a Heap data structure, the time complexity can be reduced to O(nlog(k)) as adding/removing from the heap only takes O(log(k)) time when the size of the heap is capped at K elements. Changing the data structure made a whole ton of difference to the efficiency of the algorithm!

#### 4. Identify redundant work

Here are a few examples of code which is doing redundant work. Although making these mistakes might not change the overall time complexity of your code, you are also evaluated on coding abilities, so it is important to write as efficient code as possible.

##### Don't check conditions unnecessarily

These are Python examples where the second check is redundant.

- `if not arr and len(arr) == 0` - the first check already ensures that the array is empty so there is no need for the second check.
- `x < 5 and x < 10` - the second check is a subcondition of the first check.

##### Mind the order of checks

- `if slow() or fast()` - There are two operations in this check, of varying durations. As long as one of the operations evaluates to `true`, the condition will evaluate to `true`. Most computers execute operations in order from left to right, hence it is more efficient to put the `fast()` on the left.
- `if likely() and unlikely()` - This example uses a similar argument as above. If we execute `unlikely()` first and it is `false`, we don't have to execute `likely()`.

##### Don't invoke methods unnecessarily

If you have to refer to a property multiple times in your function and that property has to be derived from a function call, cache the result as a variable if the value doesn't change throughout the lifetime of the function. The length of the input array is the most common example. Most of the time, the length of the input array doesn't change, declare a variable at the start called `length = len(array)` and use `length` in your function instead of calling `len(array)` every time you need it.

##### Early termination

Early termination. Stop after you already have the answer, return the answer immediately. Here's an example of leveraging early termination. Consider this basic question "Determine if an array of strings contain a string regardless of case sensitivity". The code for it:

```py
def contains_string(search_term, strings):
  result = False
  for string in strings:
    if string.lower() == search_term.lower():
      result = True
  return result
```

Does this code work? Definitely. Is this code as efficient as it can be? Nope. We only need to know if the search term exists in the array of strings. We can stop iterating as soon as we know that there exists the value.

```py
def contains_string(search_term, strings):
  for string in strings:
    if string.lower() == search_term.lower():
      return True # Stop comparing the rest of the array/list because the result won't change.
  return False
```

Most people already know this and already do this outside of an interview. However, in a stressful interview environment, people tend to forget the most obvious things. Terminate early from loops where you can.

##### Minimize work inside loops

Let's further improve on the example above to solve the question "Determine if an array of strings contain a string regardless of case sensitivity".

```py
def contains_string(search_term, strings):
  for string in strings:
    if string.lower() == search_term.lower():
      return True
  return False
```

Note that you are calling `search_term.lower()` once per loop of the for loop! It's a waste because the `search_term` doesn't change throughout the lifecycle of the function.

```py
def contains_string(search_term, strings):
  search_term_lowercase = search_term.lower()
  for string in strings:
    if string.lower() == search_term_lowercase:
      return True
  return False
```

Minimize work inside loops and don't redo work you have already done if it doesn't change.

##### Be lazy

Lazy evaluation is an evaluation strategy which delays the evaluation of an expression until its value is needed. Let's use the same example as above. We could technically improve it a little bit:

```py
def contains_string(search_term, strings):
  if len(strings) == 0:
    return False
  # Don't have to change the search term to lower case if there are no strings at all.
  search_term_lowercase = search_term.lower()
  for string in strings:
    if string.lower() == search_term_lowercase:
      return True
  return False
```

This is considered a micro-optimization and most of the time, `strings` won't be empty, but I'm using it to illustrate the example where you don't have to do certain computations if they aren't needed. This also applies to initialization of objects that you will need in your code (usually hash tables). If the input is empty, there's no need to initialize any variables!

<InDocAd />

### How to optimize space complexity

Most of the time, time complexity is more important than space complexity. But when you have already reached the optimal time complexity, the interviewer might ask you to optimize the space your solution is using (if it is using extra space). Here are some techniques you can use to improve the space complexity of your code.

#### 1. Changing data in-place/overwriting input data

If your solution contains code to create new data structures to do intermediate processing/caching, memory space is being allocated and can sometimes be seen as a negative. A trick to get around this is by overwriting values in the original input array so that you are not allocating any new space in your code. However, be careful not to destroy the input data in irreversible ways if you need to use it in subsequent parts of your code.

A possible way which works (but you should never use outside of coding interviews) is to mutate the original array and use it as a hash table to store intermediate data. Refer to the example below.

Note that in Software Engineering, mutating input data is generally frowned upon and makes your code harder to read and maintain, so changing data in-place is mostly something you should do only in coding interviews.

#### Example

The [Dutch National Flag](https://leetcode.com/problems/sort-colors/) problem could be easily solved with O(n) time and O(n) space by creating a new array and filling it up with the respective values in a sorted fashion. As an added challenge and space optimization, the interviewer will usually ask for an O(n) time and O(1) space solution which involves sorting the input array in-place.

An example of using the original array as a hash table is the [First Missing Positive](https://leetcode.com/problems/first-missing-positive) question. After the first for loop, all the values in the array are positive, and you can indicate presence of a number by negating the value at the index corresponding to the number. To indicate 4 is present, negate `nums[4]`.

#### 2. Change a data structure

Data structures again!? Yes, data structures again! Data structures are so fundamental to coding interviews and mastery of it makes or breaks your interview performance. Are you using the best data structure possible for the problem?

#### Example

You're given a list of strings and want to find how many of these strings start with a certain prefix. What's an efficient way to store the strings so that you can compute your answer quickly? A [Trie](https://leetcode.com/problems/implement-trie-prefix-tree/) is a tree-like data structure that is very efficient for storing strings and also allows you to quickly compute how many strings start with a prefix.

## Next Steps

If you haven't already, I recommend you check out my [free structured guide for coding interviews](./software-engineering-interview-guide.md), which contains step by step guidance such as:

- [How to make an efficient plan for your coding interview preparation](./coding-interview-study-plan.md) - including priority of topics and questions to study, based on the time you have left
- [Coding interview best practices cheatsheet](./coding-interview-cheatsheet.md) - including how to behave during a coding interview to exhibit hire signals
- [Algorithms cheatsheets](./algorithms/study-cheatsheet.md) - including the must-remembers that you should internalize for every data structure
