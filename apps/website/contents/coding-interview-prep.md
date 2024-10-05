---
id: coding-interview-prep
title: 'Coding interviews: Everything you need to prepare'
description: What to expect, how to prepare and how to excel in software Engineer coding interviews
keywords:
  [
    coding interview prep,
    coding interview,
    software engineer interview prep,
    software engineer coding interview,
    technical interview prep,
    technical interview,
    questions to practice,
    topics to study,
    how to prepare for coding interview,
    how to prepare for technical interview,
  ]
sidebar_label: Step-by-step how to prepare
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/coding-interview-prep.png" />
</head>

import InDocAd from './\_components/InDocAd';

_The ultimate guide on how to efficiently prepare for your software engineering technical interview - coding test round._

If you have decided to embark on the arduous process of preparing for your coding interviews and you don't know how to maximize your time, this is the only guide you need to go from zero to hero on your coding test.

<InDocAd />

## What is a Software Engineering coding interview?

Coding interviews are a form of technical interviews used to assess a potential software engineer candidate's competencies through presenting them with programming problems. Typically, coding interviews have a focus on data structures and algorithms, while other technical rounds may encompass [system design](./system-design.md) (especially for middle to senior level candidates).

A coding interview round is typically 30 - 45 minutes. You will be given a technical question (or questions) by the interviewer, and will be expected to write code in a real-time collaborative editor such as CodePen or CoderPad (phone screen / virtual onsite) or on a whiteboard (onsite) to solve the problem within 30–45 minutes.

## How will you be evaluated during a coding interview?

I have collated evaluation criteria across top tech companies and generalized them into a [coding interview evaluation rubric](./coding-interview-rubrics.md) you can use. Specific terminology or weightages may differ across companies, top tech companies always include the following criteria in their evaluation:

1. **Communication** - Asking clarifying questions, communication of approach and tradeoffs clearly such that the interviewer has no trouble following.
1. **Problem solving** - Understanding the problem and approaching it systemically, logically and accurately, discussing multiple potential approaches and tradeoffs. Ability to accurately determine time and space complexity and optimize them.
1. **Technical competency** - Translating discussed solutions to working code with no significant struggle. Clean, correct implementation with strong knowledge of language constructs.
1. **Testing** - Ability to test code against normal and corner cases, self-correcting issues in code.

Read more about [how you should behave in a coding interview to display hire signals](./coding-interview-cheatsheet.md).

<InDocAd />

## How to best prepare for a coding interview?

LeetCode by itself is actually not enough to prepare you well for your coding interviews. Diving straight into LeetCode and thinking you can complete all of the thousands of questions is a bad use of your time and will never prepare you as well as a structured approach.

Given 30 min per question and an average of 3 hours practice a day, the average person will only manage to complete 160 questions within 3-4 weeks, and may not internalize the right approach or remember the questions they have practiced before.

Instead, this is how to prepare for your Software Engineer coding interview:

1. [Pick a good programming language to use](#pick-programming-language)
1. [Plan your time and tackle topics and questions in order of importance](#plan)
1. [Combine studying and practicing for a single topic](#study-and-practice)
1. [Accompany practice with coding interview cheat sheets to internalize the must-dos and must-remembers](#practice-with-cheatsheets)
1. [Prepare a good self introduction and final questions](#prepare-self-introduction)
1. [Try out mock coding interviews (with Google and Facebook engineers)](#mock-interviews)
1. [(If you have extra time) Internalize key tech interview question patterns](#question-patterns)

### 1. Pick a good programming language to use {#pick-programming-language}

A good programming language to use for coding interviews is one you are familiar with and is suitable for interviews.

What determines if a programming language should be used for interviews? Generally, we want higher level languages that have many standard library functions and data structures and are therefore "easier" to code in.

Recommended programming languages to use for coding interviews: Python, C++, Java, JavaScript

Read more about [considerations for picking a programming language](./programming-languages-for-coding-interviews.md) here.

### 2. Plan your time and tackle topics and questions in order of importance {#plan}

How long does it take to prepare for a coding interview? It actually depends on how well prepared you want to be. On average, it takes about [30 hours to cover the bare minimum and ~100 hours to be well prepared](./coding-interview-study-plan.md).

To start preparing for your coding interviews, always begin with a plan. Calculate the amount of time you have left to realistically prepare for your interview from now till the day of the coding test, and carefully make a plan of the topics and questions you will cover per day, prioritizing the most important ones first.

But how do you know which are the most important topics and questions to practice based on the time you have left? You may use the free [Grind 75 tool](https://www.techinterviewhandbook.org/grind75) (built by me) which produces coding interview study plans for varying lengths of preparation time. The algorithm behind it includes a ranking of questions by priority and also a balance between breadth and depth of topics covered.

If you have the luxury of time to prepare, it is recommended to spend around 3 months (2-3 hours per day) to prepare more holistically. I came up with a [personal 3-month study plan](./coding-interview-study-plan.md), which takes you from start to finish on which topics and questions to complete.

### 3. Combine studying and practicing for a single topic {#study-and-practice}

For the sake of memory retention and efficiency, it is best to study for a single concept and then immediately do relevant practice questions for that topic.

Fortunately, there are already excellent coding interview preparation resources which enable you to do this very easily and systematically:

1. [AlgoMonster](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=)
1. [Grokking the Coding Interview: Patterns for Coding Questions](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-coding-interview)

#### [AlgoMonster](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=)

Apart from helping you master important coding interview data structures and algorithm questions through practice and easy to understand guides, AlgoMonster has the added perk of synthesizing [common interview question patterns](https://algo.monster/problems/stats) that you could apply to solve any other questions you have never encountered before. Made by Google engineers, this is definitely a quality platform to use as compared to the unstructured nature of LeetCode grinding. Data structures and algorithms questions are covered in all the common languages - Python, Java, C#, JavaScript, C++, Golang, and more. [**Join today for a 70% discount →**](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=)

#### [Grokking the Coding Interview: Patterns for Coding Questions](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-coding-interview)

This course by Design Gurus expands upon the questions on the recommended practice questions but approaches the practicing from a questions pattern perspective, which is an approach I also agree with for learning and have personally used to get better at coding interviews. The course allows you to practice selected questions in Java, Python, C++, JavaScript and also provides sample solutions in those languages along with step-by-step visualizations. **Learn and understand patterns, not memorize answers!** [**Get lifetime access today →**](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-coding-interview)

<InDocAd />

### 4. Accompany practice with coding interview cheatsheets to internalize the must-dos and must-remembers {#practice-with-cheatsheets}

To maximize what you get out of your practice, I recommend referring to the following coding interview cheatsheets _while_ you are studying and practicing:

- **Coding interview techniques**: how to find a solution and optimize your approach
- **Coding interview best practices**: how to behave through the interview to exhibit hire signals
- **Algorithms study cheatsheets**: covers the best learning resources, must remembers (tips, corner cases) and must do practice questions for every data structure and algorithm

#### Coding interview techniques

Here is [list of around 10 techniques](./coding-interview-techniques.md) to do the 2 most important things you need to do in a coding interview: finding approaches to solve the problem presented, and optimizing the time and space complexity of your approaches.

These techniques are useful to apply when you are given questions which you have never encountered before, and to get out of being stuck.

#### Coding interview best practices

Top tech companies evaluate candidates on 4 main criteria: communication, problem solving, technical competency and testing. To exhibit behaviors that fulfill these criteria, I have prepared a [coding interview best practices cheatsheet](./coding-interview-cheatsheet.md) which outlines what you should do before, during and after coding interviews. This is based on my personal experience as an interviewee as well as my observation of top candidates as an interviewer at Facebook.

Using this guide to accompany practice ensures that you cultivate good habits and muscle memory with regards to interviews right from the beginning.

#### Algorithms study cheatsheets for coding interviews

These are actually the notes I personally collated for my own coding interview preparation. I have organized them into 1-pagers of the best study resources, best LeetCode questions to practice, and must-remembers (tips, corner cases) for every data structure and algorithm. They ensure that you internalize the most important concepts and get the most out of your preparation. [Check them out](./algorithms/study-cheatsheet.md).

### 5. Prepare a good self introduction and final questions {#prepare-self-introduction}

Self introductions and final questions to ask are almost always required at the start and end of any software engineering interview. As such, you should always spend some time to craft an excellent self introduction and set of final questions to ask. When done well, these can leave a good impression with the interviewer that can turn things to your favor.

For the best software self introduction samples and tips, check out this [self introduction guide for software engineers](./self-introduction.md). Also check out samples of the best final questions to ask for software engineers in this [final questions guide](./final-questions.md).

### 6. Try out mock coding interviews {#mock-interviews}

Coding right in front of your interviewer can be a nerve-wracking experience especially if you have never done it before - which is why getting hands-on experience is so important.

[interviewing.io](https://iio.sh/r/DMCa) is currently the best mock technical interview resource in the market. It allows you to book mock coding interviews with real Google and Facebook engineers, albeit anonymously. You could even book interviews for specific roles like Mobile, Front End, Engineering Management. Even better - if you want to have an easier transition into real world coding interview - you could view recorded interviews and see what phone interviews are like.

Moreover, if you were to do very well on your mock interviews, you will be able to unlock the "jobs page" which allows you to book interviews directly with top companies like Uber, Lyft, Quora, Asana and more. I've used [interviewing.io](https://iio.sh/r/DMCa) both as an interviewer and an interviewee and found the experience to be excellent.

Read more about [different mock coding interview platforms here](./mock-interviews.md).

### 7. (If you have extra time) Internalize key tech interview question patterns {#question-patterns}

Many coding interview solutions actually involve a similar set of key patterns - and learning them will help you solve any long tail problem that is outside the set of commonly asked coding interview questions.

#### AlgoMonster

Out of the resources on the internet - AlgoMonster is an excellent platform created by Google engineers. It uses a data-driven approach to condense software engineering coding interview questions into a set of key patterns, and summarized them into a structured, easy to digest course. Imagine LeetCode, but with only the key patterns you need to know.

Best of all, AlgoMonster is not subscription-based - pay a one-time fee and get lifetime access. [Join today for a 70% discount →](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=)

#### Grokking the Coding Interview: Patterns for Coding Questions

This course by Design Gurus expands upon the questions on the recommended practice questions but approaches the practicing from a questions pattern perspective, which is an approach I also agree with for learning and have personally used to get better at coding interviews. The course allows you to practice selected questions in Java, Python, C++, JavaScript and also provides sample solutions in those languages.

Learn and understand patterns, not memorize answers! [Join today for a 10% discount →](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-coding-interview)

---

And that is all from me - for more detail on each step of the software engineer coding interview preparation process, do dive into each topic within my handbook through the sidebar or by navigating to the next page!
