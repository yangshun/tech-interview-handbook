---
id: coding-interview-rubrics
title: How candidates are evaluated in coding interviews at top tech companies
description: Detailed coding interview rubrics collated from Google, Amazon, Apple, Netflix
keywords:
  [
    coding interview rubric,
    coding interview evaluation criteria,
    coding interview criteria,
    coding interview grading rubric,
    technical interview rubric,
  ]
sidebar_label: Coding interview rubrics
---

<head>
  <meta property="og:image" content="https://www.techinterviewhandbook.org/social/coding-interview-rubrics.png" />
</head>

import InDocAd from './\_components/InDocAd';

Ever wondered how coding interviews are evaluated at top tech companies like Google, Amazon, Apple and Netflix?

Across top tech companies, coding interview evaluation criteria actually does not differ to a great extent. While the exact terms used in the rubric could be different, the dimensions evaluated are roughly similar.

I will go into detail on the general coding interview evaluation process across big tech companies in this guide. I've also included an [example rubric](./coding-interview-rubrics.md) you can use while practicing on your own or with your peers.

If you haven't done so already, do refer to my [Coding interview best practices cheatsheet](./coding-interview-cheatsheet.md) which basically synthesizes what candidates should do to fulfill the evaluated criteria in coding interviews.

## Candidate scoring methodology

Generally across FAANG / MANGA companies, coding interview evaluation rubrics can be split broadly into 4 dimensions:

1. Communication - Does the candidate make clarifications, communicate their approach and explain while coding?
1. Problem Solving - Does the candidate show they understand the problem and are able to come up with a sound approach, conduct trade-offs analysis and optimize their approach?
1. Technical Competency - How fast and accurate is the implementation? Were there syntax errors?
1. Testing - Was the code tested for common and corner cases? Did they self-correct bugs?

There are 2 general methods of candidate scoring in coding interviews:

1. Provide a score (e.g. 1-4) for every dimension and sum them up into an overall score
1. Provide an overall score (e.g. 1-4) based on overall performance across dimensions

Regardless of the method used, the scoring bands are generally:

- Strong hire
- Hire
- No hire
- Strong no hire

Some companies may have a middle band for indecision when the interviewer feels that the candidate requires more assessment.

<InDocAd />

## How does your score impact the result?

Regardless of the scoring methodology, the final score is based on the overall performance across evaluated criteria (not purely through a certain mathematical cut-off).

For each phone screen round, there's typically only 1 interviewer, hence if they don't give you a "pass" equivalent to "Leaning hire" and above, you would not proceed to the full interview loop. If there were no clear signals obtained from the round, you might be asked to do a follow up phone screen round.

Most top tech companies allow candidates to go through every interview round in the full interview loop before making a decision based on the final package. If a candidate receives mixed results (some "pass" and some "fail") from different rounds, interviewers will convene for a discussion based on the signals you displayed. This is why your performance throughout the interview loop is important.

In certain cases, like follow up phone screen rounds, candidates may be invited for additional assessment rounds if:

- There were aspects that were missed out in the assessment e.g. 2 coding round interviewers gave very similar questions
- Candidate displayed mixed signals in particular areas and additional rounds are required to obtain more reliable signals

Generally, your scores and feedback for each round are visible to all interviewers. Sometimes, interviewers can even see feedback from your interviews at the same company in the past to avoid asking the same question again. Companies want to see that you have grown as compared to the past. So if you got rejected in the past by a company, reflect on possible reasons and address them if/when you interview with that company again.

## Detailed explanation of each evaluated criteria

### 1. Communication

Basic communication signals:

- Asks appropriate clarifying questions
- Communicates approach, rationale and tradeoffs
- Constantly communicating, even while coding
- Well organized, succinct, clear communication

| Score | Overall evaluation |
| --- | --- |
| Strong hire | Throughout the interview, communication was thorough, well-organized, succinct and clear in terms of thought process - including how they understand the question, their approach, trade-offs.<br/>Interviewer had no challenge following and understanding the candidate's thought process at all. |
| Leaning hire | Throughout the interview, communication was sufficient, clear and organized.<br/>However, the interviewer had to ask follow-up questions to understand the candidate on certain aspects such as their approach or thought process. |
| Leaning no hire | Throughout the interview, communication was (1 or more of the following): (1) Insufficient (e.g. jumped into coding without explaining), (2) Disorganized or unclear<br/>Interviewer had difficulty following the candidate's thought process. |
| Strong no hire | Could not communicate with any clarity or stayed silent even when addressed by the interviewer.<br/>Interviewer had extreme difficulty following the candidate's thought process. |

### 2. Problem solving

Basic problem solving signals:

- Understands the problem quickly by asking good clarifying questions
- Approached the problem systematically and logically
- Was able to come up with an optimized solution
- Determined time and space complexity accurately
- Did not require any major hints from the interviewer

Advanced problem solving signals:

- Came up with multiple solutions
- Explained trade-offs of each solution clearly and correctly, concluded on which of them are most suitable for the current scenario
- Had time to discuss follow up problems/extensions

| Score | Overall evaluation |
| --- | --- |
| Strong hire | No trouble achieving all basic problem solving signals and did so with enough time to achieve most advanced problem solving signals. |
| Leaning hire | Managed to achieve all basic problem solving signals but did not have sufficient time to achieve advanced problem solving signals. |
| Leaning no hire | Showed only some basic problem solving signals, failing to achieve the rest. |
| Strong no hire | Unable to solve the problem or did it without much explanation of their thought process. Approach was disorganized and incorrect. |

<InDocAd />

### 3. Technical competency

Basic technical competency signals:

- Translates discussed solution into working code with minimal to no bugs
- Clean and straightforward implementation with no syntax errors and unnecessary code, good coding practices e.g. DRY (Don't repeat yourself), uses proper abstractions
- Neat coding style (proper indentation, spacing, variable naming, etc)

Advanced technical competency signals:

- Compares several coding approaches
- Demonstrates strong knowledge of language constructs and paradigms

| Score | Overall evaluation |
| --- | --- |
| Strong hire | Demonstrated basic and advanced competency signals effortlessly. |
| Leaning hire | Demonstrated only basic technical competency signals, with some difficulty seen in translating approach to code. Suboptimal usage of language paradigms. |
| Leaning no hire | Struggled to produce a working solution in code. Multiple syntax errors and bad use of language paradigms. |
| Strong no hire | Could not produce a working solution in code. Major syntax errors and very bad use of language paradigms. |

### 4. Testing

Testing signals:

- Came up with more typical cases and tested their code against it
- Found and handled corner cases
- Identified and self-corrected bugs in code
- Able to verify correctness of the code in a systematic manner (e.g. acting like a debugger and stepping through each line, updating the program's state at each step)

| Score | Overall evaluation |
| --- | --- |
| Strong hire | Demonstrated testing signals effortlessly. |
| Leaning hire | Had some difficulty demonstrating testing signals, such as not being able to identify all the relevant corner cases. |
| Leaning no hire | Conducted testing but did not handle corner cases. Not able to identify or correct bugs in code. |
| Strong no hire | Did not even test code against typical cases. Did not spot glaring bugs in the code and announced they are done. |

<div className="text--center margin-vert--lg">
  <figure>
    <img alt="Coding interview evaluation rubric for software engineers"
    title="Coding interview evaluation rubric for software engineers" className="shadow--md" src={require('@site/static/img/coding-interview-rubric-software-engineer.jpg').default} style={{maxWidth: 'min(100%, 500px)'}} />
    <figcaption>Sample coding interview evaluation rubric, for practice</figcaption>
  </figure>
</div>
