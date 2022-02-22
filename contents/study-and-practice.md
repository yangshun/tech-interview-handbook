---
id: study-and-practice
title: Study and practice
description: Mastery of Computer Science fundamentals, identifying question patterns, practicing good coding style is the key to improving in coding interviews.
keywords:
  [
    algorithm,
    coding,
    question,
    pattern,
    computer science,
    coding style,
    interview,
  ]
---

<head>
  <title>Efficient ways to study and practice for coding interviews | Tech Interview Handbook</title>
  <meta property="og:title" content="Efficient ways to study and practice for coding interviews | Tech Interview Handbook"/>
</head>

## Recap Computer Science fundamentals

If you have been out of college for a while, it is highly advisable to review Computer Science fundamentals — Algorithms and Data Structures. Personally, I prefer to review as I practice, so I scan through my college notes and review the various algorithms as I work on algorithm problems from LeetCode. If you are looking for a central place to revise, here are some resources:

- [The Algorithms and Data Structures Interview Crash Course](https://www.educative.io/courses/algorithms-ds-interview?aff=x23W), a course by Educative which is estimated to take 12h to complete
- [AlgoMonster](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=), one of the most efficient way to study and practice for coding interviews
- [Master the Coding Interview: Data Structures + Algorithms on Udemy](https://fxo.co/DQpY)
- [DSA Revision](https://dsarevision.com/) - Free 100-page PDF with question patterns and example questions
- [Top 50 Data Structure and Algorithms Interview Questions for Programmers](https://medium.com/javarevisited/50-data-structure-and-algorithms-interview-questions-for-programmers-b4b1ac61f5b0)

After you have revised the basic concepts at least once, you can find a list of practical tips I collated for the common algorithm and data structure topics under the [Algorithms tips](./algorithms/introduction.md) section.

## Mastery through practice

Next, gain familiarity and mastery of the algorithms and data structures in your chosen programming language.

### Practice coding questions

Practice coding algorithms using your chosen language. While "Cracking the Coding Interview" is a good resource for studying, I prefer being able to type code, run it and get instant feedback. There are various Online Judges such as [LeetCode](https://leetcode.com/), [HackerRank](https://www.hackerrank.com/) and [CodeForces](http://codeforces.com/) for you to practice questions online and get used to the language. From experience, LeetCode questions are the most similar to the kind of questions being asked in interviews whereas HackerRank and CodeForces questions resemble competitive programming questions. If you practice enough LeetCode questions, there is a good chance that you would have seen/done your actual interview question (or some variant) on LeetCode before.

If you are more of a visual person, [Coderust](https://www.educative.io/collection/5642554087309312/5679846214598656?aff=x23W) explains the common algorithm questions through step-by-step visualizations which makes understanding the solutions much easier.

### Broaden exposure

Gain a broad exposure to questions from various topics. If you can spare the time, do around 100–200 LeetCode questions of varying topics and you should be good. If you are short on time or not sure where to start, the [Best practice questions](./best-practice-questions.md) page recommends you the best 50 LeetCode questions to practice.

### Identify question patterns

As of writing, LeetCode has thousands of questions available. Which should you practice? It is not a good use of time to practice too many questions as after a while, you will realize that some questions are variants of one another and involve using similar techniques you've seen before. The trick here is to identify the question pattern and techniques you can use to solve variants of this question. Once you're familiar with a pattern, you'll be able to solve dozens of similar problems. Some techniques include - sliding window, two pointers, matrix traversal. The ["Grokking the Coding Interview: Patterns for Coding Questions" course by Educative](https://www.educative.io/courses/grokking-the-coding-interview?aff=x23W) shows you even more techniques and is highly recommended.

:::tip Expert tip

Learn and understand patterns, not memorize answers!

:::

### Space/time complexities

Learn and understand the time and space complexities of the common operations in your chosen language. For Python, this [page](https://wiki.python.org/moin/TimeComplexity) will come in handy. Also find out the underlying sorting algorithm that is being used in the language's `sort()` function and its time and space complexity (e.g. in Python it's Timsort, which is a hybrid sort). After completing a question on LeetCode, I usually add the time and space complexities of the written code as comments above the function body to remind myself to analyze the algorithm after I am done with the implementation.

### Practice good coding style

Read up on the recommended coding style for your language and stick to it. If you have chosen Python, refer to the [PEP 8 Style Guide](https://www.python.org/dev/peps/pep-0008/). If you have chosen Java, refer to [Google's Java Style Guide](https://google.github.io/styleguide/javaguide.html).

### Internalize language pitfalls

Find out and be familiar with the common pitfalls and caveats of the language. If you point them out during the interview and intelligently avoid falling into them, you will usually impress the interviewer and that results in bonus points for your feedback, regardless of whether the interviewer is familiar with the language or not.

:::tip

The key to interview success is practice, practice and more practice!

:::

## External resources

- This [interviews repository](https://github.com/kdn251/interviews) by Kevin Naughton Jr. served as a quick refresher for me.
- The Medium publication [basecs](https://medium.com/basecs) by [Vaidehi Joshi](https://medium.com/@vaidehijoshi) is also a great and light-hearted resource to recap on the various data structures and algorithms.
- You can also find implementations of common data structures and algorithms using various popular languages at [TheAlgorithms](https://thealgorithms.github.io/).
