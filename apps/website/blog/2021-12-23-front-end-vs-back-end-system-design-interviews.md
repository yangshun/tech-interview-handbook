---
title: Front End vs. Back End System Design Interviews
slug: front-end-vs-back-end-system-design-interviews
author: Zhenghao He
author_title: Senior Software Engineer at Instacart, ex-Amazon
author_url: https://twitter.com/he_zhenghao
author_image_url: https://pbs.twimg.com/profile_images/1489749168767660032/M_us3Mu2_400x400.jpg
tags: [front end, back end, system design, interview]
hide_table_of_contents: true
---

Walkthrough of similarities and differences between front end vs. back end system design interviews and my thoughts on a front end career ceiling.

<!-- truncate -->

<head>
  <link rel="canonical" href="https://www.zhenghao.io/posts/system-design-interviews" />
</head>

## Context

As I mentioned in my post on [coding interviews frameworks](https://www.zhenghao.io/posts/framework-for-coding-interview), I have been interviewing a lot for the past year - not conducting interviews, I was the candidate being interviewed. Most of the interview processes I had with big tech companies consisted of 1-2 system design rounds depending on the level of the role. Unlike traditional back end-focused system design questions, for which you can find lots of prep resources online such as the famous Grokking System Design Interview or System Design Primer, I didn't know what to expect for a front end-focused system design interview as there are very few resources out there talking about this type of interviews.

Now that I have done a fair amount of system design interviews of both types, I want to give you a summary of what to expect, especially for the front end ones since I have been mostly working on the front end side.

## Similarities

Both front end-focused and back end-focused system design interviews share a lot of similarities in terms of the methodology you can adopt to solve the design questions:

- Starting with gathering system requirements
- Laying out a clear plan and identifying major distinguishable components of the system
- Proceeding to end to end api design
- Talking about optimization

Other kinds of similarities include:

- The interviewer is relying on you to drive the presentation. You can't rely on the interviewer to have your back.
- While the topics can be either micro or macro, you probably won't need to actually write code - it is rare to jam some portion of coding in the middle of a system design interview
- Unlike scantron school exams, both types will consist of mainly open ended questions. There probably isn't a checklist of things for you to cover one by one. Nor are you expected to drill deep into all of those. When you realize your interviewer is biased toward a particular part of the system, which they usually do, pivot your focus to that area. Other times you focus on your strengths and lead the conversation.

## Differences

During the back end-focused system design interviews, you would spend most of the time talking about things like:

- Back end/server side architecture, hand waving various back end services/components
- Discussing which type of database to use and how to aggregate data across different shards
- Designing SQL table schema
- Choosing the right the cross-region strategy if your service has a global user base
- Any other kinds of system characteristics like latency, availability, fault tolerance, etc

For front end-focused system design interviews, you would spend most of the time talking about stuff like:

- Front end/client side architecture, such as the appropriate rendering pattern to choose - client side rendering, or server side rendering or static generation or something in between?
- What kind of data fetching mechanism to use - REST vs. GRAPHQL vs. gRPC and what should the APIs look like?
- Specifics about UI components
  - A news feed which has an infinite scroll behavior with all the images lazily loaded while ensuring the client side has the aspect ratio of the images upfront to prevent layout shift.
  - An autocomplete UI component which fetches search result data incrementally in batches while receiving images from server pushes in parallel.
  - a gallery page which pulls images and displays them in the correct order despite the asynchrony that comes with the network requests that might cause them to arrive out of order.
- How do you leverage different layers of cache to decrease latency or support offline mode.
- If they want to get framework-specific, which is totally possible, they might even ask you to define a particular React components's props or manage complex state in a React app.

A lot times having one type of system design interviews means you can over simplify the opposite side:

- In a back end system design interview, the client-side/front end is reduced to an API layer - you don't need to consider all the intricacies of the browser or the pesky rerenders your real-time updates would cause.
- In a front end system design interview, you can treat the back end as a black box and you don't need to worry about how things like how to scale a database, or how your choice of using web sockets might affect the load balancers because of the need for sticky sessions support.

But again, this is a summary of my experience and depending on who your interviewers are (are they front end, back end and/or fullstack developers), the scope of the role and which team it is (are you going to be on a front end team or are you expected to work across the stack and stretch into the back end?) your front end system design interview might be a bit of a hybrid where some aspects of back end system design interviews might come up.

Outside of the differences with the technical topics I needed to dig deep into during the interviews, I found there are two other interesting differences that stand out between the two types:

- For front end system design interviews I was often encouraged to treat the interviewer as the **product manager** and we spent some time just fleshing out the brief solution for each user story. For the back end system design interviews, we didn't really get to talk about any user interaction (I am aware that the definition of users of your system might vary, depending on whether it is customer-facing vs. developer-facing)
- These two types of system design interviews also differ a lot in terms of estimating certain system's needs based on the potential scale of the system. The system needs can be storage needs or throughput needs or any other types of requirements.
  - It is common and expected to do these estimation during back end system design interviews since your design decision is only feasible when all of the system needs can realistically be met.
  - But for the front end system design interview, I rarely needed to do any **quantitative estimation** - for example, when I was designing some live feed during a front end system design interview, I didn't need to do estimations like "So let's say each message was roughly 140 characters long and it is utf8 so that's 140 bytes and an average user gets 10000 messages over a certain period of time so we ended up allocating 1.4mb memory on user devices". Again, I am not saying that this would never come up during a front end system design interview. in my experience It is just much, much more rare compared to back end ones.

## Career ceiling

I am going to talk about something that is a little tangential. I don't think this is going to be a hot take but if you just want to pass the upcoming interviews, then you are welcome to skip this part.

I have done interviews for both front end focused roles and general software engineer roles. As I went through the preparation process for the system designs interviews, it just occurred to me that there is indeed a career ceiling for a pure front end focused software engineer role.

Ok so let's first get this out of the way - you can be extremely successful as either a front end developer or a back end developer.

Also it is hard to discuss any topic intelligently when we cannot agree on definitions. By saying front end developers I meant developers/engineers who solely work on the UI of a software system. And by saying career ceiling I meant the potential terminal title and the highest level such a developer/engineer can achieve in the technical individual contributor track.

This is an unspoken thing and a very impolite conversation. And [there are exceptions](https://twitter.com/swyx/status/1236023548227072000) to this but just statistically speaking there seems to be a career ceiling for front end-only developers.

## Fighting the inertia

Part of the ceiling comes from some traditional baggage:

- modern front end development is fairly new compared to the back end counterpart. I have seen some bias in the industry that front end is not real engineering compared to the back end and that needs absolutely to be combated.
- power structure persists for a very long time and that's partially why most of VP Eng and CTOs out there are back end/infra developers.

## Economic reasoning

I had this realization that when I was going through the back end system design interviews vs. the front end system design interviews - the technical topics those interviews tend to cover let me think about some economic reasoning leading to the perception of a "Front end ceiling" as well. Your value to the company really depends on how many machines/compute/storage run through you. As a developer/engineer, that means much money you control and front end-only developers just don't take as much. Of course front end is just as hard and as important especially for consumer facing products but at the end of the day your compute is being run on someone else's machine or device and the company just don't value that as much as the compute that they themselves need to pay for and to scale.

## Short-lived vs. long-running

On top of that, normally the front end/web apps are short-lived on the client side - the user opens the browser tab that loads your app and after 20 minutes they might just close the tab, and all the memory allocated by your app is on their devices from that point onward. On the other hand, the back end servers/services behind probably keep running for months or even years. One implication resulting from this difference is that you can generally get away with bad code that leads to performance problems down the road in front end apps because they are short-lived and the scale of the data they are dealing with is probably small, but you cannot ignore that in a long-running back end service.

Good luck with your interviews.

---

_Follow me on [Twitter](https://twitter.com/he_zhenghao)_
