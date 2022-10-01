---
title: Front End Career Questions
slug: front-end-career-questions
author: Yangshun Tay
author_title: Engineering Lead at Facebook
author_url: https://github.com/yangshun
author_image_url: https://github.com/yangshun.png
tags: [front end, career]
hide_table_of_contents: true
---

Recently a junior front end engineer at a startup in Singapore reached out to me to ask me how front end development as a career.

<!--truncate-->

<head>
  <link rel="canonical" href="https://yangshuntay.com/blog/front-end-career-questions/" />
</head>

### My manager told me that currently it's a bit hard to define requirements & expectations for higher tier / higher Individual Contributor (IC) level for Front End engineers in the organization. Since you are working at Facebook, I am wondering what are some requirements & expectations for higher IC level there for Front End engineers (maybe around IC4, IC5 and above if that's kinda the level you use there)?

For smaller companies that might be true, but it's still possible if you don't limit yourself to front end work. Going up the levels is all about scope and complexity. IC3s (Junior Engineer) work on tasks, IC4s (Software Engineer) work on features, IC5s (Senior Software Engineer) work on projects, IC6s (Staff Software Engineer) work on huge projects spanning across teams, IC7s (Senior Staff Software Engineer) work on projects spanning across the org, IC8+s (Principal Software Engineer) work on projects spanning across the company or even influencing the industry. If you're able to show that you can handle scope of that magnitude, there shouldn't be a reason not to be compensated at that level. That said, the rough guide I proposed here is for a company the size of Facebook where we have 10s of thousands of Engineers. Doing work that impacts an entire company of 10 people likely won't be IC8 level work. For reference, React core team is mostly made up of IC5s/IC6s and one IC7. Flow has a number of IC5s and IC6s as it's technically complex and affects how the entire company writes JavaScript. GraphQL has many senior engineers and the creator of GraphQL is currently a director (IC8 equivalent).

### Are you still doing a lot of Front End-related development work now? Be it in the company or personally? If yes, I am just curious what are the things you often do, and what do you like in particular about Front End development?

I'm still doing a lot of Front End development for work. Less in a personal capacity ever since I stopped working on Docusaurus as a side project. You can check out my GitHub to see what stuff I've done. At work I'm in-charge of oculus.com and built the infra for it. I built a design system of React components for the content developers to develop the marketing pages.

I really like all aspects of Front End development, maybe except optimizing performance. At FB we build a lot of Front End-related tooling (e.g. Jest, GraphQL, Flow) and libraries (our internal CSS-in-JS solution, Docusaurus, React, Flux, etc) which is personally very exciting to me. Even within front end development, there are various layers - very user-facing stuff (HTML/CSS/visual related code) and back end (JavaScript stuff, network layer, storage), tooling (ESLint, Babel, TypeScript, webpack). I call myself a full front end stack developer as I'm decent across the entire front end stack. I'm especially excited about tooling work as the problems there are interesting and challenging. Typically only large companies face such problems because they only occur at scale, hence I really like being at FB because FB is one of such companies.

### Personally, do you have any tips on how best to grow as an Front End engineer? Are there any particular areas that you'd recommend?

Learn your fundamentals well. There are many UI and CSS libraries out there, but a good Front End developer still needs to know how to build a website without them. Peek beneath the abstraction layers and understand the problems these libraries are trying to solve, do not use them blindly. Keep building stuff - try to build a simple version of the libraries you frequently use, build interesting user interfaces and products, etc.

### What do you think about developing breadth-wise vs depth-wise? For example, do you think it's important for a software engineer to know more about other fields besides the end he/she is currently working at? In particular, what do you think about an Front End engineer that knows BE (i.e. a full-stack developer), or an Front End engineer that knows mobile development (with the advent of React Native or Flutter)?

I somewhat answered this in another [blog post](/blog/are-front-end-development-skills-enough-for-a-career). Lemme know if your question isn't answered after reading it.
