---
title: My Experience Working as a Meta (previously Facebook) Engineer
slug: my-experience-working-as-a-meta-facebook-engineer
author: Yangshun Tay
author_title: Engineering Lead at Meta
author_url: https://github.com/yangshun
author_image_url: https://github.com/yangshun.png
tags: [career, facebook, meta]
image: /img/meta-facebook.jpg
hide_table_of_contents: true
---

A number of the folks I referred have completed their interviews and are in the midst of deciding which company's offer to accept for their internship/full-time roles. Hence I figured it might be a good time to write about my experience at Meta (previously Facebook) so far as it could be helpful in helping some of them make their first important career decision!

![Meta logo](/img/meta-facebook.jpg)

<!--truncate-->

## Products

Meta is a huge company and has teams working on all sorts of products. For big tech companies, common products include ads networks, chat, enterprise offerings, video watching, payments, hardware products, industry-leading AI tools, internal tools, etc. the other big tech companies Microsoft, Amazon, Apple and ByteDance have products in some of these areas as well. For many big companies, they are large enough that they build their our own infra and internal tools for most technologies they use because most existing technologies on the market can't meet their scale. Hence, not only will you get the chance to work on consumer products, you might also get to work on some of the lower level infrastructure work that is used by your fellow software engineers - our internal database systems, our internal Docker, our open source projects like React, React Native, GraphQL, PyTorch, Docusaurus, etc.

The impact is huge - every line of code you write has the potential to impact millions (sometimes even billions) of users due to the widespread nature of Meta's products. There was an intern who on their second day of work, changed the placeholder text of facebook.com's search bar by accident to "Hi I'm a Search Bar!" as part of a ramp up task and it was shipped to public for a brief moment before the change got reverted. With great power comes great responsibility!

### Teams in Meta Singapore

Let's talk about some of the teams in Meta Singapore since I currently work in Singapore and many of the readers are based in Singapore.

In Meta SG we have two huge organizations - Commerce Engineering and Ads & Business Growth. Both organizations, like most organizations in Meta, have global impact where the number of users are in the order of millions or more.

Commerce Engineering (hardware sales) is Meta's next up and coming revenue stream and is also the team I work in. Commerce Engineering primarily deals with sale of Meta's hardware devices, from discovery to purchase to warranties, returns and support. If you heard of the Oculus Quest device, which is Meta's flagship VR device, my team is in-charge of building the web storefronts to sell them (currently https://www.oculus.com). In my team, I built the web infrastructure for the Oculus website which tens of other Oculus teams build on top of, built the React components for the web version of the Oculus Design System and also rearchitected the Content Management Platform to be compatible with React. It's definitely one of the highlights of my career to be building a product that contributed to Meta's 2nd highest revenue stream (and still growing)!

On the Ads and Business side, there are multiple teams:

- Business Integrity Review - They work on building tools to catch bad advertisers (advertisers who create ads which violate our policies). They want to maximize Business Integrity outcomes by building a human review system for ads & commerce on Meta, driving end-to-end improvements in the workflows, and providing best-in-class tools to IP rights holders, etc.
- Business Support Platform - They redefine the support experience across all Meta business products, making it available, effective and effortless for all businesses. They make sure businesses can identify the help resources available to them when they need assistance in accomplishing their goals across Meta's suite of business tools. Their tools will also effortlessly help marketers diagnose their issues and connect them to the best solution to solve their problem. They have also some investment into the machine learning space.
- Small Businesses and Growth - They have Multiple sub-projects. There's a system for managing the delivery of communications to businesses, advertisers and creators across Meta's products. The system is used by hundreds of internal teams, manages few hundred million communications a day and supports delivery to hundred over channels on Facebook, Instagram, Email, Push notifications and out-of-app surfaces such as Ads Manager, Meta Business Suite, Commerce Manager, etc. There's also a team working on adding an appointment booking system and restaurant menus to relevant businesses on Meta.

## Career Progression/Compensation

Meta is one of the best companies for ambitious people who want to grow their careers quickly. At Meta, promotions come sooner and we encourage employees to be at their top form. At Meta, our terminal level (level at which there is no pressure to promote) is E5 and most people get from E3 to E4 within 1-1.5 years and from E4 to E5 within 2-2.5 years (this is a pessimistic estimate, I've seen people go from E3 to E5 in under 2 years). As an E5 in Meta SG your annual compensation will be at least 300k annually, which is on par, if not higher than most director-level roles in non-tech industries in SG. Imagine getting to that level of pay within 5 years of your career!

For comparison, Google, which is a similar company to Meta in many ways, has a slower promotion cycle - the average engineer at Google takes more than 2 years to get from L3 to L4, more than 3 years to get from L4 to L5 and more than 4 years to get from L5 to L6. At Google the terminal level is L4 so there's no pressure to promote. None of my peers are L6 at Google but a few are already E6 at Meta and it is quite achievable.

Faster promotions also lead to better pay, so in most cases, Meta pays more than most other companies. Meta is one of the top companies in terms of reputation and prestige especially for engineers.

## Company Prospects

Meta is a tech giant products have over 3 billion active monthly users and Meta relies on ads as their primary source of revenue. Whether you like it or not, Meta products are around to stay for the next couple of years. Even if they are going to die off, it won't be that soon. Stock growth has been relatively strong over the past few years (doubled since I joined in Nov 2017), especially since 2020.

Mark Zuckerberg is also betting on the [metaverse](https://about.fb.com/news/2021/10/founders-letter/). Personally I'm undecided on whether the metaverse is the future.

## Culture

There's so much to say about a company's culture, but hopefully you can infer some things about the company culture from the stuff I wrote above. Since I am an engineer, I will speak more about the engineering aspects of Meta's culture.

- Done is better than perfect - At Meta we have a quote "Done is better than perfect". Shipping something into the hands of users is more important than having perfect engineering. Teams get to decide how they want to build their products, whether to focus on getting MVPs out first and then iterating and improving the engineering later on, however they want.
- Bootcamp - Many engineers at Meta aren't assigned a team before they start at the company. They have to go through this program called Bootcamp, which is a crash course to teach them the useful tools and practices and also match them to their future team. Bootcampers work on Bootcamp tasks, which are small tasks created by various teams across Meta to get acquainted with the tech stack, development flow, and also the various products Meta has to offer. Few weeks into the Bootcamp program, bootcampers start chatting with managers of teams and can choose to work with teams which interest them. Bootcamp ends with the bootcamper decides on a team to join. Bootcamp is a great way for new employees to find teams which interest them the most and lowers the risk of them joining a team that aren't a good fit for them.
- Development efficiency - There are tens of thousands of Software Engineers at Meta, hence we have teams specializing in making the developer experience extremely efficient for us. The default IDE for us is a customized version of VS Code with a ton of useful internal plugins. Engineers can each get a remote server to do development on, which contains the latest code and development environment set up - we can start coding right away without having to figure out how to update dependencies and set up the necessary environment.
- Bottom-up culture - Engineers at Meta get a lot of say regarding the roadmap and wear multiple hats - project roadmapping, project management, data analysis, prototyping, etc on top of the core coding expectations. I'm personally heavily involved in the roadmapping process for my team as my team has a heavier focus on engineering - we build tools for the other product teams within Commerce Engineering to use.
- Hackathons - Hackathons have been an integral part of Meta's culture since it started and many successful products were born out of hackathons. Hackathons are a great way to encourage innovation and promote collaboration between engineers, designers, product managers, etc. In the past, the most successful hackathon projects get shipped - Like button, Facebook timeline, comments tagging. These days, due to the maturity and scale of the company, shipping hackathon projects to the public is rarer but our hackathon culture is still going strong. In a recent hackathon, me and two others built a Kudoboard replacement to solve a problem faced by managers where they had to resort to external services in order to sign group cards to send well wishes to coworkers (farewell/celebrating work anniversaries). We took a weekend to build an initial version of a tool we uncreatively call "Boards", spent the next week or so integrating with internal features like commenting, reactions, GIFs and announced about it in a company-wide group. The response was very encouraging - it has gained significant traction within the company - over 2000 boards and 20000 messages have been written since it was launched in Aug 2021! As a bonus, we'll be getting credit for it in our performance review :)
- Building cool internal tools - At Meta scale, it sometimes make sense for us to build our own internal tooling that has tight integration with our internal ecosystem as opposed to using an external service which might incur significant expenses and also pose security risks. We have teams building and maintaining our own tasks tool, code browsing and reviewing tool, a Q&A tool similar to Stack Overflow, a customized version of VS Code, an interview question bank, interview feedback tool, data visualization and querying tool, and a workflow automation tool similar to IFTTT/Zapier! Someone built a Pokedex app where you can catch a random Pokemon every time you close a task (I'm at 807/899 now!). I also have to mention that we have an internal meme maker which we can use to add customized internal memes to use in our comments in diff reviews and group posts
- Code wins arguments - It's not gender, race or your background that wins debates, it's the work that you produce. Instead of spending time arguing over technical decisions, it is more convincing to write some code to demonstrate the point.
- Beyond coding - We are also expected to contribute to the company beyond our coding, as in our perf evaluation we have a People axis, which measures how much you help and grow the people around you. People give talks, organize events, summits, do interviews, to score in this axis.
- Fun Social Groups - Workplace is Meta's enterprise offering, it's essentially Facebook for companies. We have various interest groups where we can find colleagues to play board games, share cat photos, memes when we want to procrastinate on writing performance reviews, interesting puns, investing tips, and more!

## Mentorship and Growth

Mentorship is readily available at Meta all the way from interns to senior executives. One thing that stood out to me when I first joined Meta was the focus on mentorship. When I first joined the company and was in the Bootcamp program, I had a Bootcamp mentor. After joining a team, I was assigned a senior engineer as my mentor who was also my tech lead. Employees will have weekly 1:1s with their mentor and manager. For interns, each intern at Meta is assigned an intern manager, who will act as their mentor and is usually the person who came up with their internship project. The intern manager will be the main person evaluating the intern's work and they ultimately determine the intern's performance and if they receive a return offer at the end of their internship.

These days, as a tech lead myself, I have around 4 1:1s weekly with mentees and 2 with managers. I'm able to chat with my mentees and mentors about anything - it doesn't have to be about work. I often give my mentees feedback on how they are doing, advice and ideas on how they can be more successful, talk about the things I'm working on and why I made certain decisions.

There are also specialized mentorship programs for those who need it, technical mentorship, career growth mentorship, managerial role transition mentorship, etc.

## Work-Life Balance

At Meta, you get to choose how fast you want to accelerate your career. Some people choose to take up more responsibilities, work more and ship more impact, usually resulting in faster professional growth, higher ratings and pay, while others work at their own comfortable pace; it's really up to the individual. The top performer on my team now is nearly getting to E5 with just around 2 years of working experience. They don't work beyond working hours, they're doing well because they're working smart and working on the most impactful and challenging problems.

Every Meta employee has 21 days of leave/paid time off every year and this year the company gave everyone three company-wide paid holidays on Friday in the summer and also two Meta choice days - effectively more paid time off but they cannot be accrued.

## Transfers and Mobility

It is extremely easy to move around in Meta because Meta understands that mobility is important to the happiness and welfare of employees. People move around quite often and people are eligible to consider team changes from their second year at the company onwards. Meta is a large company comprising of many organizations and each organization has their own unique culture. It can be refreshing to move to another part of the company, working on different domains, different products, experiencing a slightly different engineering culture, yet still be productive because you are using the same engineering tools as before. When engineers move around the company, positive things can happen - they bring the good practices from their previous organizations to the new organizations, networks are strengthened and new connections are formed. Because Meta has offices around the globe, it is also possible to transfer to different countries as long as there are no work authorization issues. Personally I relocated back to Meta Singapore office after working for 2 years in Meta Menlo Park and my manager has worked in **4 different offices** (Menlo Park, London, New York, Singapore) throughout her 9 years at Meta!

For engineers, there are also temporary transfers which we call Hackamonths. Hackamonths are month-long projects proposed by teams where they welcome someone outside their team to work on. At the end of the hackamonth, the participating engineer could return back to their original team or stay on the new team. This provides engineers with the opportunity to try out work and the culture of their new teams before committing to a permanent move.

## What I dislike about Meta

- Imposter syndrome - The company is full of the smartest people in the world. There are many days I feel that the people around me are smarter than me and that I might not belong here.
- Launch processes - With the company undergoing tons of scrutiny these days, we have to be even more careful around how we use our users' data and what we are tracking. Every public launch now has to undergo a review process with legal and security.
- Cross-timezone collaboration - My team frequently works with product managers, designers and other roles who are based in California. Meetings with these folks tend to be in the morning (their evening) and it can be hard to get up in the morning sometimes...
- Fewer low hanging fruits - In a mature company especially if you are working on mature products, sometimes the low hanging fruits have been snapped up and you mostly are left with really tough problems to solve. On the bright side, Meta engineers should be smart and should be able to live up to those challenges.
- Legacy code - Unless you're working on a new product, you inevitably will have to be deal with code others have written. The older the product you work on, the more legacy code you have to deal with and the code quality varies.
