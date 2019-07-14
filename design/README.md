# Design Questions

## Guides

- [Grokking the System Design Interview](https://www.educative.io/collection/5668639101419520/5649050225344512)
- https://github.com/donnemartin/system-design-primer
- https://github.com/checkcheckzz/system-design-interview
- https://github.com/shashank88/system_design
- https://gist.github.com/vasanthk/485d1c25737e8e72759f
- http://www.puncsky.com/blog/2016/02/14/crack-the-system-design-interview/
- https://www.palantir.com/2011/10/how-to-rock-a-systems-design-interview/
- http://blog.gainlo.co/index.php/2017/04/13/system-design-interviews-part-ii-complete-guide-google-interview-preparation/

## Flow

#### A. Understand the problem and scope

- Define the use cases, with interviewer's help.
- Suggest additional features.
- Remove items that interviewer deems out of scope.
- Assume high availability is required, add as a use case.

#### B. Think about constraints

- Ask how many requests per month.
- Ask how many requests per second (they may volunteer it or make you do the math).
- Estimate reads vs. writes percentage.
- Keep 80/20 rule in mind when estimating.
- How much data written per second.
- Total storage required over 5 years.
- How much data reads per second.

#### C. Abstract design

- Layers (service, data, caching).
- Infrastructure: load balancing, messaging.
- Rough overview of any key algorithm that drives the service.
- Consider bottlenecks and determine solutions.

Source: https://github.com/jwasham/coding-interview-university#system-design-scalability-data-handling

## Grading Rubrics

- Problem Solving - How systematic is your approach to solving the problem step-by-step? Break down a problem into its core components.
- Communication - How well do you explain your idea and communicate it with others?
- Evaluation - How do you evaluate your system? Are you aware of the trade-offs made? How can you optimize it?
- Estimation - How fast does your system need to be? How much space does it need? How much load will it experience?

## Specific Topics

- URL Shortener
  - http://stackoverflow.com/questions/742013/how-to-code-a-url-shortener
  - http://blog.gainlo.co/index.php/2016/03/08/system-design-interview-question-create-tinyurl-system/
  - https://www.interviewcake.com/question/python/url-shortener
- Collaborative Editor
  - http://blog.gainlo.co/index.php/2016/03/22/system-design-interview-question-how-to-design-google-docs/
- Photo Sharing App
  - http://blog.gainlo.co/index.php/2016/03/01/system-design-interview-question-create-a-photo-sharing-app/
- Social Network Feed
  - http://blog.gainlo.co/index.php/2016/02/17/system-design-interview-question-how-to-design-twitter-part-1/
  - http://blog.gainlo.co/index.php/2016/02/24/system-design-interview-question-how-to-design-twitter-part-2/
  - http://blog.gainlo.co/index.php/2016/03/29/design-news-feed-system-part-1-system-design-interview-questions/
- Trending Algorithm
  - http://blog.gainlo.co/index.php/2016/05/03/how-to-design-a-trending-algorithm-for-twitter/
- Facebook Chat
  - http://blog.gainlo.co/index.php/2016/04/19/design-facebook-chat-function/
- Key Value Store
  - http://blog.gainlo.co/index.php/2016/06/14/design-a-key-value-store-part-i/
  - http://blog.gainlo.co/index.php/2016/06/21/design-key-value-store-part-ii/
- Recommendation System
  - http://blog.gainlo.co/index.php/2016/05/24/design-a-recommendation-system/
- Cache System
  - http://blog.gainlo.co/index.php/2016/05/17/design-a-cache-system/
- E-commerce Website
  - http://blog.gainlo.co/index.php/2016/08/22/design-ecommerce-website-part/
  - http://blog.gainlo.co/index.php/2016/08/28/design-ecommerce-website-part-ii/
- Web Crawler
  - http://blog.gainlo.co/index.php/2016/06/29/build-web-crawler/
  - http://www.makeuseof.com/tag/how-do-search-engines-work-makeuseof-explains/
  - https://www.quora.com/How-can-I-build-a-web-crawler-from-scratch/answer/Chris-Heller
- YouTube
  - http://blog.gainlo.co/index.php/2016/10/22/design-youtube-part/
  - http://blog.gainlo.co/index.php/2016/11/04/design-youtube-part-ii/
- Hit Counter
  - http://blog.gainlo.co/index.php/2016/09/12/dropbox-interview-design-hit-counter/
- Facebook Graph Search
- Design [Lyft Line](https://www.lyft.com/line).
- Design a promo code system (with same promo code, randomly generated promo code, and promo code with conditions).
- Model a university.
- How would you implement Pacman?
- Sketch out an implementation of Asteroids.
- Implement a spell checker.
- Design the rubik cube.
- Design a high-level interface to be used for card games (e.g. poker, blackjack etc).
