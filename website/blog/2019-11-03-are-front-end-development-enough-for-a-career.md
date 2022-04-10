---
title: Are Front End Development Skills Enough for a Career?
slug: are-front-end-development-skills-enough-for-a-career
author: Yangshun Tay
author_title: Front End Engineer at Facebook
author_url: https://github.com/yangshun
author_image_url: https://github.com/yangshun.png
author_twitter: yangshunz
tags: [front end, career]
hide_table_of_contents: true
---

Recently, an undergrad freshmen I met at an event asked me a question regarding Front End development as a career.

<!--truncate-->

<head>
  <link rel="canonical" href="https://yangshuntay.com/blog/are-front-end-development-skills-enough-for-a-career/" />
</head>

> I'm honestly quite into front end development — web technologies, UI/UX, web design and stuff. But with there being more and more accessible to new developers (create-react-app, parcel and such), I just can't help but wonder if these skills are sufficient to survive in the tech industry today. Not that it's a bad thing! Lowering the barrier to entry for programmers is always good. However, for those like myself who would like to pursue front end development as a career, I'm just wondering if having these skills are enough.

Interesting question. I've wondered the same question to myself before but convinced myself that I'm probably fine just dabbling in Front End development for now. 😌

## Front End is complex and getting increasingly so

Most people would have used websites like facebook.com, youtube.com and gmail.com. These applications have hundreds of engineers working on them (thousands if you include the back end) due to the demanding nature of the application - it has to load fast, it has to be secure, it has to look pretty. These days, front end development is no longer just about building websites rendering a static HTML. Many websites these days are in fact web applications and a lot of thought has to be put into the application architecture, and that requires good software engineering capabilities.

That's why you see many Front End tools these days like React, Redux, Relay, CSS modules, webpack, etc. These tools exist because of the ever-increasing requirements of building rich and performant user experiences on the web. [Being a good Front End developer](https://www.toptal.com/front-end/how-to-hire) is very hard, there are many aspects to know about - HTML, CSS, JavaScript, Browser APIs, Security, Performance, Animation, SEO, Networking, the list is non-exhaustive and growing. There are always new problems to solve and new things to learn. [JavaScript fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4) was a term pretty common a few years back due to the explosion of tools in the Front End ecosystem. Things have gotten more stable but the JavaScript community is currently still one of the most fast-moving communities.

## Does the rise of mobile threaten the existence of web developers?

Many products now have a native mobile app version and that might make people think that the existence of Front End (web) developers could be threatened. I think that is only true to a small extent. Certain applications like Uber and Lyft make sense to be mobile-first, but there are also many complex professional applications where web (or any interface with a larger screens) will always prevail, such as office productivity and design software. Viewing things at a more macro scale, both mobile apps and web apps fall under the category of client-side applications. Many core skills important for being a good web developer are also important for mobile app development - they are transferable across platforms.

Tools like [React Native](https://reactnative.dev) and [Flutter](https://flutter.dev) have also been created to help engineers build products across platforms by only writing the code "once" (in quotes because that dream is still in development). This approach is not a silver bullet solution and has yet to prove itself adequately, but for prototyping small apps or even just certain parts of your mobile app, it works pretty well. In React Native, you write your application in JavaScript using React Native primitives, and the React Native runtime runs the code on the JavaScript engine in the platform to construct native app UI views and handle application logic. It's pretty similar to writing typical web front end code. Facebook's Ads Manager App and the Marketplace tab are built using React Native. There are numerous technologies that enable you to build native apps on mobile platforms by knowing web front end development.

Even though mobile usage is on the rise, there still exists many use cases where the desktop still excels at. Google Suite, Microsoft Office, Design tools are still more efficiently operated on desktops. In fact, many desktop applications these days are built on HTML5 technologies instead of native desktop code using tools like Electron to package web application code into an executable shipped to users. You might already be using some of them without knowing - Slack, Discord, WhatsApp Desktop, VS Code, Atom Editor, just to name a few. I think developers who are only familiar with native desktop platform engineering skills have more reasons to worry than Front End developers.

The web is incredibly cross-platform!

## Jack of all trades, master of one

However, I think that being a Front End development in many regards, is considered a specialized position. That's why it's important to be "T-shaped". I first got introduced to this term through my ex-manager at Grab, Tim Goh. He advised me to have a specialization (front end), yet still know a bit about everything. In other words, you are strong in your core fundamentals, but you also specialize in a particular area.

This is good advice and it's not new advice. In most university courses, students are expected to study the fundamental courses before choosing their area of specialization. In the context of a School of Computing in National University of Singapore, students start their in school by taking basic classes in Algorithms, Data Structures, Software Engineering, Operating Systems, Computer Networks, before choosing their specialization in deeper areas like Compilers, Computer Graphics, AI and Machine Learning, Media, Networking and more.

Having a strong foundation enables someone to make switching domains a possibility. There will definitely be a ramp-up process, but it can be made smoother with solid foundations, and with the skill of learning how to learn fast. In the extreme case where the web becomes irrelevant, and no companies want to hire front end developers anymore, front end developers with strong fundamentals can always slightly switch tracks by doing mobile or back end engineering, or even the hottest UI platform (AR/VR?) out there.

Having good tools to use (like Create React App, Parcel) doesn't eradicate the need for Front End developers to possess good software engineering skills. What will happen if you are the person tasked to build the tools? Great Front End developers (or Software Engineers really) go beneath the abstractions layer, understand how their tools work, and what problems the tool set out to solve. They also constantly seek to challenge and improve the status quo by building better technologies to cater to the ever-increasing demands.

At Facebook, the Front End Engineers are Software Engineers first, domain experts second. Many of the Front End engineers I know at Facebook have a deep understanding of the technical stack and don't just work on stuff related to the browser. At Facebook scale, front end work also involves building a lot of infrastructure to make our front end code base scale well with the growing technical and people needs. That means writing [codemods](https://github.com/facebook/jscodeshift) to do large-scale refactoring, inventing new [UI](https://reactjs.org) [paradigms](http://facebook.github.io/flux/), performant [testing frameworks](https://jestjs.io), creating [type-checkers](https://flow.org) for untyped languages, changing the ways we [fetch data](https://graphql.org) from our servers and [managing it on clients](https://relay.dev). These tools wouldn't exist if the Front End engineers at Facebook didn't possess strong software engineering skills.

## Pick up new, relevant skills

It can be hard to pick up new skills at work in an unrelated domain if there are no opportunities to do so. Thankfully (or not), due to the explosion of tools in the Front End ecosystem, I've found an area which I have gained a new-found interest in - Programming Languages Theory (Static Analysis, Compilers, and Intepreters). Static analysis is incredibly important in tools that I use on a daily basis - it's being used by the module bundlers for bundling JavaScript files together, generating CSS from more user-friendly CSS syntaxes, compiling modern JavaScript into older versions of JavaScript that more common browsers can run, and even this blog post written in Markdown uses static analysis to be converted into HTML.

I've been toying with writing my own interpreter after learning this awesome book called [Crafting Interpreters](http://www.craftinginterpreters.com) and will be further exploring this domain in my spare time, possibly building Front End-related tooling in future that leverages static analysis and compilation.

Adding new skills to my arsenal in a related but different domain helps me to stay relevant in the event that the industry no longer needs Front End developers 😱

---

In summary, although Front End development is considered quite specialized, there's enough demand and complexity for it to stay relevant in the years to come. What would threaten the web would be an entire shift of the way users interact with apps, perhaps to a non-visual paradigm like a brain-controlled interface. However, paradigm shifts don't happen overnight and there will be sufficient time to react (pun intended) in the case that ever happens. Being strong in your Software Engineering fundamentals and knowing how to learn new skills fast will help you in switching domains (and also careers).

_Opinions are my own and do not represent the views of my employer._
