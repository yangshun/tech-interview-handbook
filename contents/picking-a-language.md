---
id: picking-a-language
title: Picking a Language
---

Before anything else, you need to pick a programming language to do your interviews in. Most companies will let you code in any language you want, the only exception I know being Google, where they only allow candidates to pick from Java, C++, JavaScript or Python for their algorithmic coding interviews.

## Some languages are more suited for interviews

There are some languages which are more suitable than others for coding interviews and some languages you absolutely want to avoid. From my experience as an interviewer, most candidates pick Python or Java. Other commonly seen languages include JavaScript, Ruby and C++. I would absolutely avoid lower level languages like C or Go, simply because they lack many standard library functions and data structures and some may require manual memory management.

Personally, Python is my de facto choice for algorithm coding interviews because it is succinct and has a pretty huge library of functions and data structures available. One of my top reasons for recommending Python is that it uses consistent APIs that operate on different data structures, such as `len()`, `for ... in ...` and slicing notation on sequences (strings/lists/tuples). Getting the last element in a sequence is `arr[-1]` and reversing it is simply `arr[::-1]`. You can achieve a lot with minimal syntax in Python.

Java is a decent choice too but having to constantly declare types in your code means extra keystrokes which results in slower coding/typing speed. This issue will be more apparent when you have to write on a whiteboard during on-site interviews. The reasons for choosing/not choosing C++ are similar to Java. Ultimately, Python, Java and C++ are decent choices of languages.

## Use a language you are familiar with

Most of the time, it is recommended that you use a language that you are extremely familiar with rather than picking up a new language just for doing interviews because the company uses that language heavily or just because you want to show that you are trendy.

If you are under time constraints, picking up a new language just for interviewing is hardly a good idea. Languages take time to master and if you are already spending most of your time and effort on mastering algorithms, there is barely spare effort left for mastering a new language. If you are familiar with using one of the mainstream languages, there isn't a strong reason to learn a new language just for interviewing.

If you have been using Java at work for a while now and do not have time to be comfortably familiar with another language, I would recommend just sticking to Java instead of picking up Python from scratch just for the sake of interviews. Doing so, you can avoid having to context switch between languages during work vs interviews. Most of the time, the bottleneck is in the thinking and not the writing. It takes some getting used to before one becomes fluent in a language and be able to wield it with ease.

## The exception to the norm

One exception to the convention of allowing you to "pick any programming language you want" is when you are interviewing for a domain-specific position, such as Front End/iOS/Android Engineer roles, in which you would need to be familiar with coding in JavaScript, Objective-C/Swift and Java respectively. If you need to use a data structure that the language does not support, such as a Queue or Heap in JavaScript, perhaps try asking the interviewer whether you can assume that you have a data structure that implements certain methods with specified time complexities. If the implementation of that data structure is not crucial to solving the problem, the interviewer will usually allow this. In reality, being aware of existing data structures and selecting the appropriate ones to tackle the problem at hand is more important than knowing the intricate implementation details.
