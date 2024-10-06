---
id: software-engineering-interview-guide
title: 'Software Engineer interviews: Everything you need to prepare'
description: What to expect, how to prepare and how to excel in Software Engineering interviews
keywords:
  [
    software engineer interview preparation,
    technical interview preparation,
    how to prepare for your software engineer interview,
    software developer interview,
    coding interview preparation,
    best leetcode questions,
    coding interview questions,
    software engineering interview questions,
  ]
sidebar_label: 'SWE interviews: What are they and how to prepare'
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/software-engineering-interview-guide.png" />
</head>

import InDocAd from './\_components/InDocAd';

Nobody has time to grind hundreds of LeetCode questions, and the good news is that you don't need to do that many to actually get the job at FAANG!

I was frustrated at my job at Grab, a ridesharing company in South-east Asia and wanted to break into FAANG but I wasn't sure how to. After a few months of research, studying and practicing, I interviewed at 11 companies and managed to get 9 offers from top tech companies in the Bay Area - Facebook, Google, Airbnb, Palantir, Dropbox, Lyft, and some startups. It was a tedious process which I don't ever want to go through again. **I went through that process but with this guide, you don't have to.**

This guide will provide a **quick overview of the top tips on how to prepare for a software engineer interview** - both technical and non-technical interview rounds. Where relevant, you can delve into greater detail by accessing links in this overview article, or through the website's left sidebar.

How to prepare for your software engineering interview:

1. Maximize your chances of being shortlisted
1. Find out the interview format
1. Pick a programming language
1. Sharpen your Computer Science fundamentals for interviews
1. Practice for the coding interview
1. Prepare for the system design interview (for mid/senior levels)
1. Prepare for the behavioral interview
1. Negotiating the offer package

<InDocAd />

## Maximize your chances of being shortlisted

Do you still have trouble getting shortlisted at some or all of the top tech companies? Your resume could be the issue.

Your resume is the single most important entry point to getting shortlisted in major tech companies like FAANG / MANGA. After getting shortlisted, your past achievements become markedly less important as compared to your coding interview skills - which as we know, can be methodically learnt. Being able to frame your past achievements well enough to get through the screening stage is hence very important.

Unfortunately, even the most qualified candidates I know personally don't know how to write a good resume and fail to get shortlisted. The truth is that when many of us don't get shortlisted at top tech companies like FAANG / MANGA, we tend to think that we were under-qualified - but in most cases, it's probably just the lack of good framing.

If you want to learn how to write a good software engineer resume, I've written a [step-by-step guide here on software engineering resume preparation](./resume.md) for companies like Google, Facebook, Amazon, Netflix, Apple, with examples for your reference as well.

## Find out the interview format

You may encounter various interview formats in your software engineer interviews (from early to late stage):

### 1. Quiz

Frequency: Occasional

Quizzes are meant to be a first-pass filter as a quick and dirty way of weeding out extremely weak (or even non-technical) candidates. They are structured questions and have clear-cut answers which makes them possible to be administered by recruiters/non-technical folks or automated graders. They are typically done early in the process.

Examples:

- What is 4 & 5 (in binary)? Answer: 4
- What is the time complexity of bubble sort? Answer: O(n<sup>2</sup>)

### 2. Online coding assessment

Frequency: Occasional

Like quizzes, online coding assessments are usually given early in the process. An algorithm problem is given with well-formed input and output and candidates are expected to write code in an online coding interface to solve the problem. [HackerRank](https://www.hackerrank.com) is a very common platform for conducting online coding assessments. LeetCode would be a good way to practice for the problem solving aspects of online coding assessments. However, in HackerRank you are typically expected to write code to read from stdin and also print to stdout, which can trip candidates up if they aren't familiar with the APIs.

### 3. Take home assignment

Frequency: Rare

There have been numerous debates on whether asking algorithm questions are a good way of assessing individual abilities as they aren't exactly the most relevant skills needed on a day-to-day basis at a job. Take home assignment is a format designed to address the shortcomings of the algorithm interview by getting candidates to work on larger projects which allow them to demonstrate software design skills.

However, this interview format takes up more time from both the candidates and the company and hence it is not as commonly seen in large companies where they have a high volume of candidates. This format is more common among startups and small companies. Examples

- Build a flights listing app
- Build a kanban app
- Build a snake game

### 4. Phone screen interviews

Frequency: Common

Phone interviews are the most common format and every candidate will face this at least once while interviewing. You will be asked to speak with an interviewer either over a phone call or VoIP (BlueJeans/Skype/Google Hangout). A question will be given to you and you will work on that question using an online collaborative editor (CoderPad/CodePen/Google Docs).

You are usually not allowed to execute the code even if the editor supports execution. So don't rely on that for verifying the correctness of your solution. Formats would differ slightly depending on the roles you are applying to. Many companies like to use [CoderPad](https://coderpad.io) for collaborative code editing. CoderPad supports running of the program, so it is possible that you will be asked to fix your code such that it can be run. For front end interviews, many companies like to use [CodePen](https://codepen.io), and it will be worth your time to familiarize yourself with the user interfaces of such web-based coding environments.

Check out [coding interview best practices](./coding-interview-cheatsheet.md) as well for do's and don'ts before your phone screen interviews.

### 5. Onsite

Frequency: Almost always

If you have made it to this stage, congratulations! This is usually the final stage before an offer decision. Candidates who made it to the onsite stage will be required to have an in-person interview at the office. If you are an overseas candidate, companies might even fly you in and pay for your accommodations!

The onsite stage usually consists of multiple rounds (coding, system design, behavioral) and is expected to last for a few hours. Since you are onsite, it is possible that you will be asked to do a whiteboard exercise with an interviewer, usually either solving an algorithm question or a system design question. It is also possible that you have to bring your own laptop and work on a project/solve a coding problem on the spot.

For onsite interviews at smaller (non-public) companies, most will allow (and prefer) that you use your own laptop. Hence it is important that you prepare your development environment in advance.

If the company provides lunch, you might also have a lunch session with an employee where you can find out more about the company culture.

## Pick a programming language

With your resume done, the next step of your software engineering interview journey is a simple one and won't take long - decide on a programming language. Unless you're interviewing for a specialist position like mobile or front end where there are domain-specific languages, you should be free to use any language you want for the algorithmic coding interviews.

Most of the time, you'd already have one in mind - pick the one you use the most and you're the most comfortable with. The most common programming languages used for coding interviews are Python, Java, C++, and JavaScript. I wouldn't recommend learning an entirely new language just for coding interviews as it takes a while (few weeks at least on average) to become proficient enough in a language to wield it comfortably in an interview setting, which is already stressful enough on its own. My personal programming language of choice is Python because of how terse it is and the functions/data structures the standard library provides.

Read more on programming languages for coding interviews: [Picking a programming language](./programming-languages-for-coding-interviews.md)

<!--
References (omit when publishing)
https://startupnextdoor.com/important-pick-one-language-for-the-coding-interview/
-->

## Study and practice for coding interviews

The next and most important step is to practice solving algorithm questions in your chosen programming language. While Cracking the Coding Interview is a great resource, I prefer learning by actually solving problems.

There are many platforms that can be used for this - such as LeetCode, HackerRank and CodeForces. From my personal experience, LeetCode questions are most suitable for interview preparation whereas HackerRank and CodeForces are more for competitive programming.

However, LeetCode has thousands of questions and it can be daunting to know where to begin, or how to structure your practice. I have provided recommended preparation plans and also structured resources here:

### Coding interview study plan

The recommended time period to set aside for coding interview preparation is 3 months (11 hours a week i.e. 2-3 hours a day) for a more holistic preparation. I shared my [3 month study plan here](./coding-interview-study-plan.md), which provides a list of coding interview topics with resources and practice questions that you should work through in order of priority every week. I will also be adding content on recommended 1 month and 1 week study plans soon.

If you have less than 3 months to prepare, you can generate your own study plans using the [Grind 75 tool](https://www.techinterviewhandbook.org/grind75) (built by me) which generates recommended study plans for coding interviews based on the time you have left. The algorithm behind it includes a ranking of questions by priority and also a balance between breadth and depth of topics covered.

### Resources to use in your practice

In the market, there are plenty of resources vying for your attention, plenty of them just vying for your money but not providing any value. If I had to prioritize - these are the top coding interview preparation resources I would use in tandem:

1. [Grokking the Coding Interview: Patterns for Coding Questions](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-coding-interview)
1. [AlgoMonster](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=)
1. My (free) coding interview best practices guide
1. My (free) coding interview techniques guide
1. My (free) algorithms study guide

#### [AlgoMonster](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=)

Apart from helping you master important coding interview data structures and algorithm questions through practice and easy to understand guides, AlgoMonster has the added perk of synthesizing [common interview question patterns](https://algo.monster/problems/stats) that you could apply to solve any other questions you have never encountered before. Made by Google engineers, this is definitely a quality platform to use as compared to the unstructured nature of LeetCode grinding. Data structures and algorithms questions are covered in all the common languages - Python, Java, C#, JavaScript, C++, Golang, and more. [**Join today for a 70% discount →**](https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=)

#### [Grokking the Coding Interview: Patterns for Coding Questions](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-coding-interview)

This course by Design Gurus expands upon the questions on the recommended practice questions but approaches the practicing from a questions pattern perspective, which is an approach I also agree with for learning and have personally used to get better at coding interviews. The course allows you to practice selected questions in Java, Python, C++, JavaScript and also provides sample solutions in those languages along with step-by-step visualizations. **Learn and understand patterns, not memorize answers!** [**Get lifetime access today →**](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-coding-interview)

#### My (free) coding interview best practices guide

If you have read the [coding interview evaluation rubric](./coding-interview-rubrics.md) used at top tech companies, you may be overwhelmed by the number of items evaluated and how to demonstrate hire behaviors consistently.

This [coding interview best practices guide](./coding-interview-cheatsheet.md) synthesizes actionable recommendations of what to do before, during and after your coding interviews to demonstrate hire signals.

I recommend to internalize and use the guide as an accompaniment while you practice coding interview questions - to ensure that you cultivate good habits and muscle memory with regards to interviews right from the beginning.

#### My (free) coding interview techniques guide

Is there a structured method to increase your chances of finding a good solution to the coding interview question? How about optimizing your approach's time and space complexity? My coding interview techniques guide teaches you a few techniques for handling questions that you have never encountered before - such as problem visualizing, solving by hand, breaking the problem into subproblems, etc.

#### My (free) algorithms study cheatsheets

I'm not sure if these would qualify as an in-depth guide - they are more like 1-page "study cheatsheets" of the **best resources to study, best LeetCode questions to practice and the things to remember**. However, they ensure you cover all the most important grounds, especially when you have no time. Because these are also the notes that helped me clinch top tech offers - they definitely work.

For more tips on coding interview preparation, refer to my [full coding interview preparation guide](./coding-interview-prep.md) here.

### Try out mock coding interviews (with Google and Facebook engineers)

Coding right in front of your interviewer can be a nerve-wracking experience especially if you have never done it before - which is why getting hands-on experience is so important.

[interviewing.io](https://iio.sh/r/DMCa) is currently the best mock technical interview resource in the market. It allows you to book mock coding interviews with real Google and Facebook engineers, albeit anonymously. You could even book interviews for specific roles like Mobile, Front End, Engineering Management. Even better - if you want to have an easier transition into real world coding interview - you could view recorded interviews and see what phone interviews are like.

Moreover, if you were to do well on your mock interviews, you will be able to unlock the "jobs page" which allows you to book interviews directly with top companies like Uber, Lyft, Quora, Asana and more. I've used [interviewing.io](https://iio.sh/r/DMCa) both as an interviewer and an interviewee and found the experience to be excellent.

## Prepare for the system design interview

If you are a mid or senior-level candidate, you may expect system design questions as part of your technical interview. They aren't covered adequately by LeetCode and good resources are still harder to come by.

The objective of system design interviews is to evaluate a candidate's skill at designing real-world software systems involving multiple components.

### Utilize the best system design interview preparation resources

Some of the best system design interview preparation resources include:

1. [ByteByteGo](https://bytebytego.com?fpr=techinterviewhandbook) - This is a new System Design course by Alex Xu, author of the System Design Interview books, a bestseller on Amazon. The course covers system designs basics, then goes into deep dives of the design of over 10 famous common products (e.g. [Designing YouTube](https://bytebytego.com/courses/system-design-interview/design-youtube), Facebook Newsfeed, etc) and multiple big data and storage systems (e.g. [Designing a Chat System](https://bytebytego.com/courses/system-design-interview/design-a-chat-system)). For each deep dive, concepts are explained and comprehensive diagrams are used, making it very approachable for any seniority level.
1. ["Grokking the System Design Interview" by Design Gurus](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-system-design-interview) - This is probably the most famous system design interview course on the internet and what makes it different from most other courses out there is that it is purely text-based, which is great for people who prefer reading over watching videos (such as myself!). It contains a repository of the popular system design problems along with a glossary of system design basics. I've personally completed this course and have recommended many others to use this. Highly recommended!
1. ["System Design Interview Course" by Exponent](https://www.tryexponent.com/courses/system-design-interview?ref=techinterviewhandbook) - This course covers system designs basics and has a huge database of popular system design questions with videos of mock interviews. Some of the questions have text answers and a database schema and APIs for reference (which I find helpful). While the subscription might be a little pricey for just the system design interviews content, they also offer quality technical content for [Data Structures](https://www.tryexponent.com/courses/swe-practice?ref=techinterviewhandbook), [Algorithms](https://www.tryexponent.com/courses/algorithms?ref=techinterviewhandbook) and [Behavioral Interviews](https://www.tryexponent.com/courses/behavioral?ref=techinterviewhandbook). The convenience of a one-stop platform which covers all aspects of technical interview preparation is very enticing.
1. ["Grokking the Advanced System Design Interview" by Design Gurus](https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-advanced-system-design-interview) - I haven't tried this but it's by the same people who created "Grokking the System Design Interview", so it should be good! In my opinion you probably wouldn't need this unless you're very senior or going for a specialist position.

[Check out other Systems Design preparation guides and resources here.](./system-design.md)

## Prepare for the behavioral interview

Every top tech company has at least one round of behavioral interviews for software engineers. Typically, behavioral interviews for software engineers include:

- Sharing about details of previous experiences on resume
- Providing examples of past situations and behavior that demonstrate certain behavioral attributes (e.g. conflict management skills, being data-driven)
- Sharing of ambitions and career plans

As much as these interviews seem "fluffy" or unstructured, there is actually a structured way to prepare for behavioral interviews:

### 1. Know the STAR format for answering them

The **STAR** format helps you to organize your answers to behavioral questions. This is most applicable to questions that require you to recount past experiences or behavior.

- **Situation**: Share details about the situation that gave rise to the task
- **Task**: Explain what you needed to achieve or the problems you had to solve; focus on the
  - Scope
  - Severity
  - Specific benchmarks/outcomes required
- **Action**: Explain what you did to meet your objectives, describing options you had and how you made decisions
- **Results**: Describe the outcome of your actions and what you learnt

Read more: [The STAR format for answering behavioral questions](https://en.wikipedia.org/wiki/Situation,_task,_action,_result)

### 2. Practice the most common behavioral questions for software engineers

Refer to the [top 30 most common behavioral questions](./behavioral-interview-questions.md) for Software Engineers

For more tips on behavioral interview preparation, refer to my [full behavioral interview preparation guide](./behavioral-interview.md) here.

<!-- which can be broken down into the following steps (these steps are covered in detail in my behavioral interview step-by-step guide):
Understand how software engineers are evaluated during behavioral interviews
Learn effective answer formats and tactics
Practice the most commonly asked questions -->

## Negotiating the software engineer offer package

Finally, the last thing you absolutely need to prepare for before your interview is salary negotiation for software engineers. At any point during the interview process, conversation about salary may crop up. We also have in-depth guides about [negotiation strategies](./negotiation.md) and [software engineer compensation](./understanding-compensation.md).

And that is all from me - for more detail on each step of the software engineer interview preparation process, do dive into each topic within my handbook through the sidebar or by navigating to the next page!
