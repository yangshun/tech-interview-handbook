Algorithm Questions
==

Here are some tips and questions you can think in your head or clarify with the interviewer. They may lead you to
discover corner cases you might have missed out or even lead you towards the optimal approach!

## Contents

- [Array](array.md)
- [Dynamic Programming and Memoization](dynamic-programming.md)
- [Geometry](geometry.md)
- [Graph](graph.md)
- [Hash Table](hash-table.md)
- [Heap](heap.md)
- [Interval](interval.md)
- [Linked List](linked-list.md)
- [Math](math.md)
- [Matrix](matrix.md)
- [Object-Oriented Programming](oop.md)
- [Permutation](permutation.md)
- [Queue](queue.md)
- [Sorting and Searching](sorting-searching.md)
- [Stack](stack.md)
- [String](string.md)
- [Tree](tree.md)

## Picking a Programming Language

Before anything else, you need to pick a programming language to do your interviews in. Most companies will let you code in any language you want, the only exception I know being Google, where they only allow candidates to pick from Java, C++ or Python for their algorithmic coding interviews. Most of the time, I would recommend that you use a language that you are extremely familiar with rather than picking up a new language just for doing interviews because the company uses that language heavily.

There are some languages which are more suitable than others for coding interviews and some languages you absolutely want to avoid. From my experience interviewing as an interviewer, most candidates pick Python or Java. Other commonly seen languages include JavaScript, Ruby and C++. I would absolutely avoid lower level languages like C or Go, simply because they lack in many standard library functions and data structures.

Personally, Python is my de facto choice for coding algorithms during interviews because it is succinct and has a pretty huge library of functions and data structures available. One of my top reasons for recommending Python is that it uses consistent APIs that operate on different data structures, such as `len()`, `for ... in ...` and slicing notation on sequences (strings/lists/tuples). Getting the last element in a sequence is `arr[-1]` and reversing it is simply `arr[::-1]`. You can achieve a lot with minimal syntax in Python.

Java is a decent choice too but having to constantly declare types in your code means extra keystrokes which results in slower coding/typing speed. This issue will be more apparent when you have to write on a whiteboard during on-site interviews. The reasons for choosing/not choosing C++ are similar to Java. Ultimately, Python, Java and C++ are decent choices of languages. If you have been using Java at work for a while now and do not have time to be comfortably familiar with another language, I would recommend just sticking to Java instead of picking up Python from scratch just for interviews to avoid having to context switch between languages during work vs interviews. Most of the time, the bottleneck is in the thinking and not the writing.

One exception to the convention of allowing you to "pick any programming language you want" is when you are interviewing for a domain-specific position, such as Front End/iOS/Android Engineer roles, in which you would need to be familiar with coding algorithms in JavaScript, Objective-C/Swift and Java respectively. If you need to use a data structure that the language does not support, such as a Queue or Heap in JavaScript, perhaps try asking the interviewer whether you can assume that you have a data structure that implements certain methods with specified time complexities. If the implementation of that data structure is not crucial to solving the problem, the interviewer will usually allow it. In reality, being aware of existing data structures and selecting the appropriate ones to tackle the problem at hand is more important than knowing the intricate implementation details.

## Revise your CS101

If you have been out of college for a while, it will be highly advisable to revise the CS fundamentals — Algorithms and Data Structures. Personally I prefer to revise as I practiced so I scanned through my college notes and revised the various algorithms as I worked on the algorithm problems from LeetCode and Cracking the Coding Interview.

This [interviews repository](https://github.com/kdn251) by Kevin Naughton Jr. served as a quick refresher for me.

## Mastery through Practice

Next, gain familiarity and mastery of the algorithms and data structures in your chosen programming language:

1. Practice coding algorithms using your chosen language. While [Cracking the Coding Interview](http://www.crackingthecodinginterview.com/) is a good resource for practice, I prefer being able to type code, run it and get instant feedback. There are various Online Judges such as [LeetCode](https://leetcode.com/), [HackerRank](https://www.hackerrank.com/) and [CodeForces](http://codeforces.com/) for you to practice questions online and get used to the language. From experience, LeetCode questions are the most similar to the kind of questions being asked in interviews whereas HackerRank and CodeForces questions are more similar to competitive programming questions. If you practice enough LeetCode questions, there is a good chance that you would have seen/done your actual interview question (or some variant) on LeetCode before.
2. Learn and understand the time and space complexities of the common operations in your chosen language. For Python, this [page](https://wiki.python.org/moin/TimeComplexity) will come in handy. Also find out the underlying sorting algorithm that is being used in the language's `sort()` function and its time and space complexity (in Python its Timsort which is a hybrid sort). After completing a question on LeetCode, I usually add the time and space complexities of the written code as comments above the function body to remind myself to analyze the algorithm after I am done with the implementation.
3. Read up on the recommended coding style for your language and stick to it. If you have chosen Python, refer to the PEP 8 Style Guide. If you have chosen Java, refer to Google’s Java Style Guide.
4. Find out and be familiar with the common pitfalls and caveats of the language. If you point out them out during the interview and intelligently avoid falling into them, you will usually impress the interviewer and that results in bonus points in your feedback, regardless of whether the interviewer is familiar with the language or not.
5. Gain a broad exposure to questions from various topics. In the second half of the article I mention algorithm topics and practice questions for each topic. Do around 100–200 LeetCode questions and you should be good.

Practice, practice and more practice!

## Phases of a Coding Interview

Congratulations, you are ready to put your skills into practice! In a real coding interview, you will be given a technical question by the interviewer, write code in a real-time collaborative editor (phone screen) or on a whiteboard (on-site) to solve the problem within 30–45 minutes. This is where the real fun begins!

Your interviewer will be looking out for signals that you fit the requirements of the role and it is up to you to display those signals to them. Initially it may feel weird to be talking while you are coding as most programmers do not have the habit of explaining out loud as they are typing code. However, it is hard for the interviewer to know what you are thinking just by looking at the code that you type. If you communicate your approach to the interviewer before you start coding, you can validate your approach with him and the both of you can agree upon an acceptable approach.

**Before the Interview (Remote)**

For phone screens/remote interviews, prepare paper and pen/pencil to jot down and visualize stuff. If you are given a question on trees and graphs, it usually helps if you draw out some examples of the data structure given in the question.

Use earphones and make sure you are in a quiet environment. You definitely do not want to be holding a phone in one hand and only be able to type with the other. Try avoiding using speakers because if the echo is bad, communication is harder and repeating of words will just result in loss of valuable time.

**Upon Getting the Question**

Many candidates jump into coding the moment they hear the question. That is usually a big mistake. Take a moment to repeat the question back at the interviewer and make sure that you understand exactly what he is asking. If you misunderstood and when you repeat back the question, he'll clarify.

Always seek clarification about the question upon hearing it even if it you think it is clear to you. You might discover something that you have missed out and it also sends a signal to the interviewer that you are a careful person who pays attention to details. Consider asking the following questions:

- How big is the size of the input?
- How big is the range of values?
- What kind of values are there? Are there negative numbers? Floating points? Will there be empty inputs?
- Are there duplicates within the input?
- What are some extreme cases of the input?
- How is the input stored? If you are given a dictionary of words, is it a list of strings or a Trie?

After you have sufficiently clarified the scope and intention of the problem, explain your high level approach to the interviewer even if it is a naive solution. If you are stuck, consider various approaches and explain out loud why it will/will not work. Sometimes your interviewer might drop hints and lead you towards the right path.

Start with a brute force approach, communicate it to the interviewer, explain the time and space complexity and why it is bad. It is unlikely that the brute force approach will be one that you will be coding. At this point, the interviewer will usually pop the dreaded "Can we do better?" question, meaning that he is looking for a more optimal approach. In my opinion, this is usually the hardest part of the interview. In general, look for repeated work and try to optimize them by potentially caching the calculated result somewhere and reference it later, rather than having to compute it all over again. There are some tips on tackling topic-specific questions that I dive into details below.

Only start coding after you and your interviewer have agreed on an approach and has given you the green light.

**Starting to Code**

Write your code with good coding style. Reading code written by others is usually not an enjoyable task. Reading horribly-formatted code by others makes it worse. Your goal is to make your interviewer understand the code you have written so that he can quickly evaluate if your code does what you say it does and whether it solves the given problem. Use clear variable names, avoid single letter names unless they are for iteration. However, if you are coding on a whiteboard, you might not want to use extremely verbose variable names for the sake of reducing the amount you have to write.

Always be explaining what you are currently writing/typing to the interviewer. This is not about literally reading out what you are typing to the interviewer. Talk about the section of the code you are currently implementing at a higher level, explain why it is written as such and what it is trying to achieve.

When you copy and paste code, consider whether it is necessary. Sometimes it is, sometimes it is not. If you find yourself copying and pasting one large chunk of code spanning multiple lines, it is probably an indicator that you can refactor by containing those lines into a function. If it is just a single line you copied, usually it is fine. Do remember to change the respective variables in your copied line of code where relevant. Copy-paste errors are a common source of bugs even in day-to-day coding!

**After Coding**

After you have finished coding, do not immediately announce to the interviewer that you are done. In most cases, your code is usually not perfect and contains some bugs or syntax errors. What you need to do now is to review your code.

Firstly, look through your code from start to finish as if it is the first time you are seeing it, as if it was written by someone else and you are trying to spot bugs in it. That’s exactly what your interviewer will be doing. Look through and fix any minor issues you may find.

Next, come up with small test cases and step through the code (not your algorithm!) with those sample input. Interviewers like it when you read their mind and what they usually do after you have finished coding would be to get you to write tests. It is a huge plus if you write tests for your code even before prompts from them. You should be emulating a debugger when stepping through and jot down or say out the values of certain variables as you step through the lines of code.

If there are huge duplicated chunks of code in your solution, it would be a good chance to refactor it and demonstrate to the interviewer that you are one who values code quality. Also look out for places where you can do [short-circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation).

Lastly, give the time/space complexity of your code and explain why it is such. You can even annotate certain chunks of your code with the various time/space complexities to demonstrate your understanding of your code and the APIs of your chosen programming language. Explain any trade-offs in your current approach vs alternative approaches, possibly in terms of time/space.

If your interviewer is happy with the solution, the interview usually ends here. It is also not uncommon that the interviewer asks you extension questions, such as how you would handle the problem if the whole input is too large to fit into memory, or if the input arrives as a stream. This is a common follow-up question at Google where they care a lot about scale. The answer is usually a divide-and-conquer approach — perform distributed processing of the data and only read certain chunks of the input from disk into memory, write the output back to disk and combine them later on.

## Practicing via Mock Interviews

Interviewing is a skill that you can get better at. The steps mentioned above can be rehearsed over and over again until you have fully internalized them and following those steps become second nature to you. A good way to practice is to find a friend to partner with and the both of you can take turns to interview each other.

A great resource for practicing mock coding interviews would be [interviewing.io](https://interviewing.io/). interviewing.io provides free, anonymous practice technical interviews with Google and Facebook engineers, which can lead to real jobs and internships. By virtue of being anonymous during the interview, the inclusive interview process is de-biased and low risk. At the end of the interview, both interviewer and interviewees can provide feedback to each other for the purpose of improvement. Doing well in your mock interviews will unlock the jobs page and allow candidates to book interviews (also anonymously) with top companies like Uber, Lyft, Quora, Asana and more. For those who are totally new to technical interviews, you can even view a [demo interview](https://start.interviewing.io/interview/9hV9r4HEONf9/replay) on the site (requires sign in).

I have used interviewing.io both as an interviewer and an interviewee and found the experience to be really great! [Aline Lerner](https://twitter.com/alinelernerLLC), the CEO and co-founder of interviewing.io and her team are passionate about revolutionizing the technical interview process and helping candidates to improve their skills at interviewing. She has also published a number of technical interview-related articles on the [interviewing.io blog](http://blog.interviewing.io/). interviewing.io is still in beta now but I recommend signing up as early as possible to increase the likelihood of getting an invite.

Another platform that allows you to practice coding interviews is [Pramp](https://pramp.com/). Where interviewing.io matches potential job seekers with seasoned technical interviewers, Pramp differs takes a different approach. Pramp pairs you up with another peer who is also a job seeker and both of you take turns to assume the role of interviewer and interviewee. Pramp also prepares questions for you, along with suggested solutions and prompts to guide the interviewee. Personally, I do not really like Pramp's approach because if I were to interview someone, I would rather choose a question I am familiar with. Also, many users of the platform do not have the experience of being interviewers and that can result in a horrible interview experience. There was once where my matched peer, as the interviewer, did not have the right understanding of the question and attempted to lead me down the wrong path of solving the question.

The next section dives deep into practical tips for specific topics of algorithms and data structures which appear frequently in coding questions. Many algorithm questions involve techniques that can be applied to questions of similar nature. The more techniques you have in your arsenal, the higher the chances of passing the interview. For each topic, there is also a list of recommended common questions which in my opinion is highly valuable for mastering the core concepts for the topic.

## General Tips

- Input validation:
  - Always validate input first. Check for invalid/empty/negative/different type input. Never assume you are given the valid parameters. Alternatively, clarify with the interviewer whether you can assume valid input (usually yes), which can save you time from writing code that does input validation.
- Are there any time/space complexity requirements/constraints?
- Check corner cases:
  - Check for off-by-one errors.
  - In languages where there are no automatic type coercion, check that concatenation of values are of the same type: `int`/`str`/`list`.
  - After finishing your code, use a few example inputs to test your solution.
- Is the algorithm meant to be run multiple times, for example in a web server? If yes, the input is likely to be preprocess-able to improve the efficiency in each call.
- Use a mix of functional and imperative programming paradigms:
  - Write pure functions as much as possible.
  - Pure functions are easier to reason about and can help to reduce bugs in your implementation.
  - Avoid mutating the parameters passed into your function especially if they are passed by reference unless you are sure of what you are doing.
  - However, functional programming is usually expensive in terms of space complexity because of non-mutation and the repeated allocation of new objects. On the other hand, imperative code is faster because you operate on existing objects. Hence you will need to achieve a balance between accuracy vs efficiency, by using the right amount of functional and imperative code where appropriate.
  - Avoid relying on and mutating global variables. Global variables introduce state.
  - If you have to rely on global variables, make sure that you do not mutate it by accident.
- Generally, to improve the speed of a program, we can either choose a more appropriate data structure/algorithm or use more memory. It's a classic space/time tradeoff.
- Data structures are your weapons. Choosing the right weapon for the right battle is the key to victory. Be very familiar about the strengths of each data structure and the time complexities for its various operations.
- Data structures can be augmented to achieve efficient time complexities across different operations. For example, a hash map can be used together with a doubly-linked list to achieve O(1) time complexity for both the `get` and `put` operation in an [LRU cache](https://leetcode.com/problems/lru-cache/).
- Hashmaps are probably the most commonly used data structure for algorithm questions. If you are stuck on a question, your last resort can be to enumerate through the possible data structures (thankfully there aren't that many of them) and consider whether each of them can be applied to the problem. This has worked for me sometimes.
- If you are cutting corners in your code, state that out loud to your interviewer and say what you would do in a non-interview setting (no time constraints). E.g., I would write a regex to parse this string rather than using `split()` which does not cover all cases.

## Sequence

- Arrays and strings are considered sequences (a string is a sequence of characters). There are tips relevant for dealing with both arrays and strings which will be covered here.
- Are there duplicate values in the sequence, would it affect the answer?
- Check for sequence out of bounds.
- Be mindful about slicing or concatenating sequences in your code. Typically, slicing and concatenating sequences require O(n) time. Use start and end indices to demarcate a subarray/substring where possible.
- Sometimes you can traverse the sequence from the right rather than from the left.
- Master the [sliding window technique](https://discuss.leetcode.com/topic/30941/here-is-a-10-line-template-that-can-solve-most-substring-problems) that applies to many substring/subarray problems.
- When you are given two sequences to process, it is common to have one index per sequence to traverse/compare the both of them. For example, we use the same approach to merge two sorted arrays.
- Corner cases:
  - Empty sequence.
  - Sequence with 1 or 2 elements.
  - Sequence with repeated elements.

## Array

- Is the array sorted or partially sorted? If it is, some form of binary search should be possible. This also usually means that the interviewer is looking for a solution that is faster than O(n).
- Can you sort the array? Sometimes sorting the array first may significantly simplify the problem. Make sure that the order of array elements do not need to be preserved before attempting a sort.
- For questions where summation or multiplication of a subarray is involved, pre-computation using hashing or a prefix/suffix sum/product might be useful.
- If you are given a sequence and the interviewer asks for O(1) space, it might be possible to use the array itself as a hash table. For example, if the array only has values from 1 to N, where N is the length of the array, negate the value at that index (minus one) to indicate presence of that number.

#### Practice Questions

- [Two Sum](https://leetcode.com/problems/two-sum/)
- [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
- [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
- [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [3Sum](https://leetcode.com/problems/3sum/)
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

## Binary

- Questions involving binary representations and bitwise operations are asked sometimes and you must be absolutely familiar with how to convert a number from decimal form into binary form (and vice versa) in your programming language of choice.
- Test k<sup>th</sup> bit is set: `num & (1 << k) != 0`.
- Set k<sup>th</sup> bit: `num |= (1 << k)`.
- Turn off k<sup>th</sup> bit: `num &= ~(1 << k)`.
- Toggle the k<sup>th</sup> bit: `num ^= (1 << k)`.
- To check if a number is a power of 2, `num & num - 1 == 0`.

#### Practice Questions

- [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)
- [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- [Counting Bits](https://leetcode.com/problems/counting-bits/)
- [Missing Number](https://leetcode.com/problems/missing-number/)
- [Reverse Bits](https://leetcode.com/problems/reverse-bits/)

## Dynamic Programming

- Usually used to solve optimization problems.
- Alaina Kafkes has written an [awesome post](https://medium.freecodecamp.org/demystifying-dynamic-programming-3efafb8d4296) on tackling DP problems.
- The only way to get better at DP is to practice. It takes some amount of practice to be able to recognize that a problem can be solved by DP.
- Sometimes you do not need to store the whole DP table in memory, the last two values or the last two rows of the matrix will suffice.

#### Practice Questions

- 0/1 Knapsack
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- [Coin Change](https://leetcode.com/problems/coin-change/)
- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Longest Common Subsequence]()
- [Word Break Problem](https://leetcode.com/problems/word-break/)
- [Combination Sum](https://leetcode.com/problems/combination-sum-iv/)
- [House Robber](https://leetcode.com/problems/house-robber/) and [House Robber II](https://leetcode.com/problems/house-robber-ii/)
- [Decode Ways](https://leetcode.com/problems/decode-ways/)
- [Unique Paths](https://leetcode.com/problems/unique-paths/)
- [Jump Game](https://leetcode.com/problems/jump-game/)

## Geometry

- When comparing euclidean distance between two pairs of points, using dx<sup>2</sup> + dy<sup>2</sup> is sufficient. It is unnecessary to square root the value.
- To find out if two circles overlap, check that the distance between the two centers of the circles is less than the sum of their radii.

## Graph

- Be familiar with the various graph representations, graph search algorithms and their time and space complexities.
- You can be given a list of edges and tasked to build your own graph from the edges to perform a traversal on. The common graph representations are:
  - Adjacency matrix.
  - Adjacency list.
  - Hashmap of hashmaps.
- Some questions look like they are trees but they are actually graphs. In that case you will have to handle cycles and keep a set of visited nodes when traversing.
- Graph search algorithms:
  - **Common** - Breadth-first Search, Depth-first Search
  - **Uncommon** - Topological Sort, Dijkstra's algorithm
  - **Rare** - Bellman-Ford algorithm, Floyd-Warshall algorithm, Prim's algorithm, Kruskal's algorithm
- In coding interviews, graphs are commonly represented as 2-D matrices where cells are the nodes and each cell can traverse to its adjacent cells (up/down/left/right). Hence it is important that you be familiar with traversing a 2-D matrix. When recursively traversing the matrix, always ensure that your next position is within the boundary of the matrix. More tips for doing depth-first searches on a matrix can be found [here](https://discuss.leetcode.com/topic/66065/python-dfs-bests-85-tips-for-all-dfs-in-matrix-question/). A simple template for doing depth-first searches on a matrix goes like this:

```py
def traverse(matrix):
  rows, cols = len(matrix), len(matrix[0])
  visited = set()
  directions = ((0, 1), (0, -1), (1, 0), (-1, 0))
  def dfs(i, j):
    if (i, j) in visited:
      return
    visited.add((i, j))
    # Traverse neighbors
    for direction in directions:
      next_i, next_j = i + direction[0], j + direction[1]
      if 0 <= next_i < rows and 0 <= next_j < cols: # Check boundary
        # Add any other checking here ^
        dfs(next_i, next_j)

  for i in range(rows):
    for j in range(cols):
      dfs(i, j)
```

- Corner cases:
  - Empty graph.
  - Graph with one or two nodes.
  - Disjoint graphs.
  - Graph with cycles.

#### Practice Questions

- [Clone Graph](https://leetcode.com/problems/clone-graph/)
- [Course Schedule](https://leetcode.com/problems/course-schedule/)
- [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)
- [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)
- [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)
- [Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)
- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

## Interval

- Interval questions are questions where you are given an array of two-element arrays (an interval) and the two values represent a start and an end value. Interval questions are considered part of the array family but they involve some common techniques hence they are extracted out to this special section of their own.
- An example interval array: `[[1, 2], [4, 7]]`.
- Interval questions can be tricky to those who have not tried them before because of the sheer number of cases to consider when they overlap.
- Do clarify with the interviewer whether `[1, 2]` and `[2, 3]` are considered overlapping intervals as it affects how you will write your equality checks.
- A common routine for interval questions is to sort the array of intervals by each interval's starting value.
- Be familiar with writing code to check if two intervals overlap and merging two overlapping intervals:

```py
def is_overlap(a, b):
  return a[0] < b[1] and b[0] < a[1]

def merge_overlapping_intervals(a, b):
  return [min(a[0], b[0]), max(a[1], b[1])]
```

- Corner cases:
  - Single interval.
  - Non-overlapping intervals.
  - An interval totally consumed within another interval.
  - Duplicate intervals.

#### Practice Questions

- [Insert Interval](https://leetcode.com/problems/insert-interval/)
- [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/) and [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

## Linked List

- Like arrays, linked lists are used to represent sequential data. The benefit of linked lists is that insertion and deletion from anywhere in the list is O(1) whereas in arrays the following elements will have to be shifted.
- Adding a dummy node at the head and/or tail might help to handle many edge cases where operations have to be performed at the head or the tail. The presence of dummy nodes essentially ensures that operations will never have be done on the head or the tail, thereby removing a lot of headache in writing conditional checks to dealing with null pointers. Be sure to remember to remove them at the end of the operation.
- Sometimes linked lists problem can be solved without additional storage. Try to borrow ideas from reverse a linked list problem.
- For deletion in linked lists, you can either modify the node values or change the node pointers. You might need to keep a reference to the previous element.
- For partitioning linked lists, create two separate linked lists and join them back together.
- Linked lists problems share similarity with array problems, think about how you would do it for an array and try to apply it to a linked list.
- Two pointer approaches are also common for linked lists. For example:
  - Getting the k<sup>th</sup> from last node - Have two pointers, where one is k nodes ahead of the other. When the node ahead reaches the end, the other node is k nodes behind.
  - Detecting cycles - Have two pointers, where one pointer increments twice as much as the other, if the two pointers meet, means that there is a cycle.
  - Getting the middle node - Have two pointers, where one pointer increments twice as much as the other. When the faster node reaches the end of the list, the slower node will be at the middle.
- Be familiar with the following routines because many linked list questions make use of one or more of these routines in the solution:
  - Counting the number of nodes in the linked list.
  - Reversing a linked list in-place.
  - Finding the middle node of the linked list using fast/slow pointers.
  - Merging two lists together.
- Corner cases:
  - Single node.
  - Two nodes.
  - Cycle in linked list - Clarify whether there can be a cycle in the list? Usually the answer is no.

#### Practice Questions

- [Reverse a Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [Detect Cycle in a Linked List](https://leetcode.com/problems/linked-list-cycle/)
- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Remove Nth Node From End Of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [Reorder List](https://leetcode.com/problems/reorder-list/)

## Math

- If code involves division or modulo, remember to check for division or modulo by 0 case.
- When a question involves "a multiple of a number", perhaps modulo might be useful.
- Check for and handle overflow/underflow if you are using a typed language like Java and C++. At the very least, mention that overflow/underflow is possible and ask whether you need to handle it.
- Consider negative numbers and floating point numbers. This may sound obvious, but under interview pressure, many obvious cases go unnoticed.
- If the question asks to implement an operator such as power, squareroot or division and want it to be faster than O(n), binary search is usually the approach to go.
- Some common formulas:
  - Sum of 1 to N = (n+1) * n/2
  - Sum of GP = 2<sup>0</sup> + 2<sup>1</sup> + 2<sup>2</sup> + 2<sup>3</sup> + ... 2<sup>n</sup> = 2<sup>n+1</sup> - 1
  - Permutations of N = N! / (N-K)!
  - Combinations of N = N! / (K! * (N-K)!)

#### Practice Questions

- [Pow(x, n)](https://leetcode.com/problems/powx-n/)
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/)
- [Integer to English Words](https://leetcode.com/problems/integer-to-english-words/)

## Matrix

- A matrix is a 2-dimensional array. Questions involving matrices are usually related to dynamic programming or graph traversal.
- Corner cases:
  - Empty matrix. Check that none of the arrays are 0 length.
  - 1 x 1 matrix.
  - Matrix with only one row or column.
- For questions involving traversal or dynamic programming, you almost always want to make a copy of the matrix with the same dimensions that is initialized to empty values to store the visited state or dynamic programming table. Be familiar with such a routine:

```py
rows, cols = len(matrix), len(matrix[0])
copy = [[0 for _ in range(cols)] for _ in range(rows)]
```

- Many grid-based games can be modeled as a matrix, such as Tic-Tac-Toe, Sudoku, Crossword, Connect 4, Battleship, etc. It is not uncommon to be asked to verify the winning condition of the game. For games like Tic-Tac-Toe, Connect 4 and Crosswords, where verification has to be done vertically and horizontally, one trick is to write code to verify the matrix for the horizontal cells, transpose the matrix and reuse the logic for horizontal verification to verify originally vertical cells (which are now horizontal).
- Transposing a matrix in Python is simply:

```py
transposed_matrix = zip(*matrix)
```

#### Practice Questions

- [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- [Rotate Image](https://leetcode.com/problems/rotate-image/)
- [Word Search](https://leetcode.com/problems/word-search/)

## Recursion

- Remember to always define a base case so that your recursion will end.
- Useful for permutation, generating all combinations and tree-based questions.
- Be familiar with how to generate all permutations of a sequence as well as how to handle duplicates.
- Recursion implicitly uses a stack. Hence all recursive approaches can be rewritten iteratively using a stack.
- Beware of cases where the recursion level goes too deep and causes a stack overflow (the default limit in Python is 1000).
- Recursion will never be O(1) space complexity because a stack is involved unless there is [tail-call optimization](https://stackoverflow.com/questions/310974/what-is-tail-call-optimization). Do find out if your chosen language supports tail-call optimization.

#### Practice Questions

- [Subsets](https://leetcode.com/problems/subsets/) and [Subsets II](https://leetcode.com/problems/subsets-ii/)
- [Strobogrammatic Number II](https://leetcode.com/problems/strobogrammatic-number-ii/)

## String

- Please read the above tips on [Sequence](#sequence) because they apply to strings too.
- Corner cases:
  - Strings with only one distinct character.
- Ask about input character set and case sensitivity. Usually the characters are limited to lower case Latin characters, i.e. a-z.
- When you need to compare strings where the order isn't important (like anagram), you may consider using a hash map as a counter. If your language has a built-in `Counter` class like Python, ask to use that instead.
- If you need to keep a counter of characters, a common mistake to make is to say that the space complexity required for the counter is O(n). The space required for a counter is O(1) not O(n), because the upper bound is the range of characters which is usually a fixed constant of 26 when the input set is just lower case Latin characters.
- Common data structures for looking up strings efficiently:
  - [Trie / Prefix Tree](https://www.wikiwand.com/en/Trie)
  - [Suffix Tree](https://www.wikiwand.com/en/Suffix_tree)
- Common string algorithms:
  - [Rabin Karp](https://www.wikiwand.com/en/Rabin%E2%80%93Karp_algorithm) for efficient searching of substring using a rolling hash.
  - [KMP](https://www.wikiwand.com/en/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) for efficient searching of substring.

#### Non-repeating Characters

- Use a 26-bit bitmask to indicate which lower case latin characters are inside the string.

```py
mask = 0
for c in set(word):
  mask |= (1 << (ord(c) - ord('a')))
```

- To determine if two strings have common characters, perform `&` on the two bitmasks and if the result is non-zero, the two strings do have common characters: `mask_a & mask_b > 0`.

#### Anagram

- An anagram is direct word switch or word play, the result of rearranging the letters of a word or phrase to produce a new word or phrase, using all the original letters exactly once. In interviews, usually we are only bothered with words without spaces in them.
- Determine if two strings are anagrams:
  - Sorting both strings should produce the same resulting string.
  - If we map each character to a prime number and we multiply each mapped number together, anagrams should have the same multiple (prime factor decomposition).
  - Frequency counting of characters will help to determine if two strings are anagrams.

#### Palindrome

- A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward, such as madam or racecar.
- Ways to determine if a string is a palindrome:
  - Reverse the string and it should be equal to itself.
  - Have two pointers at the start and end of the string, move inwards till they meet. At any point in time the characters at both pointers should match.
- The order of characters within the string matters, so hash maps are usually not helpful.
- When a question is about counting the number of palindromes, a common trick is to have two pointer that move outwards, away from the middle. Note that palindromes can be even/odd length, and that for each middle pivot position, you would need to check twice, once including the character, and once without.
  - For substrings, you can terminate early once there is no match.
  - For subsequences, use dynamic programming as there are overlapping subproblems. Check out [this question](https://leetcode.com/problems/longest-palindromic-subsequence/).

#### Practice Questions

- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/description/)
- [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/)
- [Valid Anagram](https://leetcode.com/problems/valid-anagram)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses)
- [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
- [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

## Tree

- A tree is an undirected, connected, acyclic graph.
- Recursion is a common approach for trees. When you notice the subtree problem can be used to solve the whole problem, you should try recursion.
- When using recursion, always remember to check for the base case, usually where the node is `null`.
- When you are asked to traverse a tree by level, use depth-first search.
- Sometimes it is possible that your recursive function needs to return two values.
- If the question involves summation of nodes along the way, be sure to check whether nodes can be negative.
- You should be very familiar with writing pre-order, in-order and post-order traversal recursively. As an extension, challenge yourself by writing them iteratively. Sometimes interviewers do ask candidates for the iterative approach, especially if the candidate finishes writing the recursive approach too fast.
- Corner cases:
  - Empty tree.
  - Single node.
  - Two nodes.
  - Very skewed tree (like a linked list).

**Binary Tree**

- In-order traversal of a binary tree is insufficient to uniquely serialize a tree. Pre-order or post-order traversal is also required.

**Binary Search Tree**

- In-order traversal of a BST will give you all elements in order.
- Be very familiar with the properties of a BST and validating that a binary tree is a BST. This comes up more often than expected.
- When a question involves a BST, the interviewer is usually looking for a solution which runs faster than O(n).

#### Practice Questions

- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [Same Tree](https://leetcode.com/problems/same-tree/)
- [Invert/Flip Binary Tree](https://leetcode.com/problems/invert-binary-tree/)
- [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
- [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)
- [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- [Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

## Trie

- Tries are special trees (prefix trees) that make searching and storing strings more efficient. Tries have many practical applications such as for searching and autocomplete. It will be helpful to know these common applications so that you can easily identify when a problem can be solved efficiently using a trie.
- Sometimes preprocessing a dictionary of words (given in a list) into a trie will improve the efficiency when searching for a word of length k among n words. Searching becomes O(k) instead of O(n).
- LeetCode has written a [very comprehensive article](https://leetcode.com/articles/implement-trie-prefix-tree/) on tries which you are highly encouraged to read.
- Be familiar with implementing a `Trie` class and its `add`, `remove` and `search` methods from scratch.

#### Practice Questions

- [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree)
- [Add and Search Word](https://leetcode.com/problems/add-and-search-word-data-structure-design)
- [Word Search II](https://leetcode.com/problems/word-search-ii/)

## Heap

- If you see a top/lowest K being mentioned in the question, it is usually a signal that a heap can be used to solve the problem.
- If you require the top K elements use a Min Heap of size K. Iterate through each element, pushing it into the heap. Whenever the heap size exceeds K, remove the minimum element, that will guarantee that you have the K largest elements.

#### Practice Questions

- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

###### References

- http://blog.triplebyte.com/how-to-pass-a-programming-interview
- https://quip.com/q41AA3OmoZbC
- http://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/
