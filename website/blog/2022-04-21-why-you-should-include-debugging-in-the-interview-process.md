---
title: Why You Should Include Debugging In The Interview Process
slug: why-you-should-include-debugging-in-the-interview-process
author: Zhenghao He
author_title: Senior Software Engineer at Instacart, ex-Amazon
author_url: https://twitter.com/he_zhenghao
author_image_url: https://pbs.twimg.com/profile_images/1489749168767660032/M_us3Mu2_400x400.jpg
tags: [interview, debugging]
---

<br />

:::tip

See discussions on [Hacker News](https://news.ycombinator.com/item?id=31125269)

:::

## Most technical interviews are over-indexing on coding

Over the past two years, I have interviewed with over 10 different tech companies ranging from hot startups like Coinbase, Stripe, and Instacart to FAANG companies like Amazon and Meta, for Software Engineer positions of various levels.

The technical interview processes I have had all consisted of at least two rounds of coding interviews, where I either had to solve an **algorithmic, LeetCode-type** question or build a **practical app/feature**. During those coding interviews, I always started with an _empty slate_: if it was an algorithm-heavy interview question, there would be a literally empty file in the editor for me to start writing code; if it was a practical app building exercise, there might be some boilerplate code or some utilities/helper functions available but still I was expected to build the app/feature from scratch.

<!--truncate-->

I do think they did a good job at assessing my coding ability. But the issue I see here is that the standard interview process in our industry has over-indexed on coding ability along. As a software engineer, apart from meetings and writing design docs, I’d say at least half of my programming work isn’t just coding – the other half largely involves searching through a codebase and reading existing code or code-adjacent artifacts like error messages, tests, and logs. And oftentimes, coding isn’t the hardest part.

## What is programming exactly

Programming is a complex task so it makes sense to dissect it so we can study the different phases, dimensions and components of it individually.

I have been reading [_The Programmer's Brain_](https://www.manning.com/books/the-programmers-brain) by Felienne Hermans. It is a book about the cognitive process involved in programming. Felienne divides programming into five more concrete activities: **searching, comprehension, transcribing, incrementation, and exploration**.

Searching is the activity where a programmer is looking for a specific piece of information in a codebase, such as the precise location of a bug you need to fix in the code.

Comprehension is reading the code to understand its functionality and the way it is intended to work. It also involves executing the code and observing the results.

Transcribing is about converting your thoughts or solutions to executable code. This is what we usually refer to as **"coding"** and is what the current standard coding interview process only focuses on.

Incrementation is about incrementing (iterating) on an existing codebase, such as adding a new feature. It is a mix of the previous activities, where a programmer has to search, comprehend and transcribe their thoughts to code.

Exploration is sketching and prototyping with code. Try things and use code as a means of thought. It is also a mix of the previous activities.

With this newfound knowledge, it is not hard to tell what exactly the current standard interview process lacks. Activities such as searching and comprehension are completely left out and you have no way to prove your competencies needed for a big part of a software engineer job.

It begs the question of what we can do to complement the interview process to cover all these activities. And the answer is to add a **debugging interview** in the process.

## Debugging is all-encompassing

When one is debugging, they engage in **all five activities**. It entails a sequence of searching, comprehension, exploration and writing code. And it is incredibly revealing to watch one debug:

1. Are they debugging with a plan, iteratively bisecting the code or just randomly tweaking the code?
2. How are they navigating their way through an unfamiliar codebase, forming different hypotheses about the bug?
3. Do they try to write a test that reliably reproduces the issue?
4. Are they able to find where things are diverging and trace to the root cause?
5. Are they familiar with the IDE or editor they are using and know how to use tools like breakpoints and watches to step through the code?
6. Do they understand how to read error messages and leverage stack traces?
7. Are they able to implement a fix at the end?
8. ...the list goes on and on

On top of its comprehensiveness, debugging is what software engineers do on a regular basis. It is relevant to the actual work.

Out of all the companies I have interviewed for, _only_ Stripe conducted a debugging interview. They call it Bug Squash, where you’d dive into a large, well-written library codebase to fix real-world open-source bugs. I had a blast going through that interview which I can’t say about boring LeetCode questions.

Granted, preparing such a debugging interview involves more work for the company than just throwing a LeetCode question at the candidate. Still, having that in the process gives you more signals for selecting capable, experienced engineers. I hope more companies start to embrace that in their hiring process.

## Further reading that can make you better at debugging

- [_Debugging: The 9 Indispensable Rules for Finding Even the Most Elusive Software and Hardware Problems_](https://www.goodreads.com/book/show/3938178-debugging) by Dave Agans
- [_Debugging Software_](https://blog.isquaredsoftware.com/2021/06/presentations-debugging-software/) by Mark Erikson
- [_How I got better at debugging_](https://jvns.ca/blog/2015/11/22/how-i-got-better-at-debugging/) by Julia Evans
