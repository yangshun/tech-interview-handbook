Preparing for a Coding Interview
==

### Picking a Programming Language

Before anything else, you need to pick a programming language to do your interviews in. Most companies will let you code in any language you want, the only exception I know being Google, where they only allow candidates to pick from Java, C++ or Python for their algorithmic coding interviews. Most of the time, I would recommend that you use a language that you are extremely familiar with rather than picking up a new language just for doing interviews because the company uses that language heavily.

There are some languages which are more suitable than others for coding interviews and some languages you absolutely want to avoid. From my experience interviewing as an interviewer, most candidates pick Python or Java. Other commonly seen languages include JavaScript, Ruby and C++. I would absolutely avoid lower level languages like C or Go, simply because they lack in many standard library functions and data structures.

Personally, Python is my de facto choice for coding algorithms during interviews because it is succinct and has a pretty huge library of functions and data structures available. One of my top reasons for recommending Python is that it uses consistent APIs that operate on different data structures, such as `len()`, `for ... in ...` and slicing notation on sequences (strings/lists/tuples). Getting the last element in a sequence is `arr[-1]` and reversing it is simply `arr[::-1]`. You can achieve a lot with minimal syntax in Python.

Java is a decent choice too but having to constantly declare types in your code means extra keystrokes which results in slower coding/typing speed. This issue will be more apparent when you have to write on a whiteboard during on-site interviews. The reasons for choosing/not choosing C++ are similar to Java. Ultimately, Python, Java and C++ are decent choices of languages. If you have been using Java at work for a while now and do not have time to be comfortably familiar with another language, I would recommend just sticking to Java instead of picking up Python from scratch just for interviews to avoid having to context switch between languages during work vs interviews. Most of the time, the bottleneck is in the thinking and not the writing.

One exception to the convention of allowing you to "pick any programming language you want" is when you are interviewing for a domain-specific position, such as Front End/iOS/Android Engineer roles, in which you would need to be familiar with coding algorithms in JavaScript, Objective-C/Swift and Java respectively. If you need to use a data structure that the language does not support, such as a Queue or Heap in JavaScript, perhaps try asking the interviewer whether you can assume that you have a data structure that implements certain methods with specified time complexities. If the implementation of that data structure is not crucial to solving the problem, the interviewer will usually allow it. In reality, being aware of existing data structures and selecting the appropriate ones to tackle the problem at hand is more important than knowing the intricate implementation details.

### Review your CS101

If you have been out of college for a while, it is highly advisable to review CS fundamentals — Algorithms and Data Structures. Personally, I prefer to review as I practice, so I scan through my college notes and review the various algorithms as I work on algorithm problems from LeetCode and Cracking the Coding Interview.

This [interviews repository](https://github.com/kdn251/interviews) by Kevin Naughton Jr. served as a quick refresher for me.

The Medium publication [basecs](https://medium.com/basecs) by [Vaidehi Joshi](https://medium.com/@vaidehijoshi) is also a great and light-hearted resource to recap on the various data structures and algorithms.

If you are interested in how data structures are implemented, check out [Lago](https://github.com/yangshun/lago), a Data Structures and Algorithms library for JavaScript. It is pretty much still WIP but I intend to make it into a library that is able to be used in production and also a reference resource for revising Data Structures and Algorithms.

### Mastery through Practice

Next, gain familiarity and mastery of the algorithms and data structures in your chosen programming language:

1. Practice coding algorithms using your chosen language. While [Cracking the Coding Interview](http://www.crackingthecodinginterview.com/) is a good resource for practice, I prefer being able to type code, run it and get instant feedback. There are various Online Judges such as [LeetCode](https://leetcode.com/), [HackerRank](https://www.hackerrank.com/) and [CodeForces](http://codeforces.com/) for you to practice questions online and get used to the language. From experience, LeetCode questions are the most similar to the kind of questions being asked in interviews whereas HackerRank and CodeForces questions are more similar to competitive programming questions. If you practice enough LeetCode questions, there is a good chance that you would have seen/done your actual interview question (or some variant) on LeetCode before. If you are more of a visual person, [Coderust](https://www.educative.io/collection/5642554087309312/5679846214598656) explains the common algorithm questions through step-by-step visualizations which makes understanding the solutions much easier.
2. Learn and understand the time and space complexities of the common operations in your chosen language. For Python, this [page](https://wiki.python.org/moin/TimeComplexity) will come in handy. Also find out the underlying sorting algorithm that is being used in the language's `sort()` function and its time and space complexity (in Python its Timsort which is a hybrid sort). After completing a question on LeetCode, I usually add the time and space complexities of the written code as comments above the function body to remind myself to analyze the algorithm after I am done with the implementation.
3. Read up on the recommended coding style for your language and stick to it. If you have chosen Python, refer to the PEP 8 Style Guide. If you have chosen Java, refer to Google's Java Style Guide.
4. Find out and be familiar with the common pitfalls and caveats of the language. If you point out them out during the interview and intelligently avoid falling into them, you will usually impress the interviewer and that results in bonus points in your feedback, regardless of whether the interviewer is familiar with the language or not.
5. Gain a broad exposure to questions from various topics. In the second half of the article I mention algorithm topics and practice questions for each topic. Do around 100–200 LeetCode questions and you should be good.

Practice, practice and more practice!

### Phases of a Coding Interview

Congratulations, you are ready to put your skills into practice! In a real coding interview, you will be given a technical question by the interviewer, write code in a real-time collaborative editor (phone screen) or on a whiteboard (on-site) to solve the problem within 30–45 minutes. This is where the real fun begins!

Your interviewer will be looking out for signals that you fit the requirements of the role and it is up to you to display those signals to them. Initially it may feel weird to be talking while you are coding as most programmers do not have the habit of explaining out loud as they are typing code. However, it is hard for the interviewer to know what you are thinking just by looking at the code that you type. If you communicate your approach to the interviewer before you start coding, you can validate your approach with them and the both of you can agree upon an acceptable approach.

**Before the Interview (Remote)**

For phone screens/remote interviews, prepare paper and pen/pencil to jot down and visualize stuff. If you are given a question on trees and graphs, it usually helps if you draw out some examples of the data structure given in the question.

Use earphones and make sure you are in a quiet environment. You definitely do not want to be holding a phone in one hand and only be able to type with the other. Try avoiding using speakers because if the echo is bad, communication is harder and repeating of words will just result in loss of valuable time.

**Self Introduction**

TODO

**Upon Getting the Question**

Many candidates jump into coding the moment they hear the question. That is usually a big mistake. Take a moment to repeat the question back at the interviewer and make sure that you understand exactly what they are asking. If you misunderstood and when you repeat back the question, they will clarify.

Always seek clarification about the question upon hearing it even if it you think it is clear to you. You might discover something that you have missed out and it also sends a signal to the interviewer that you are a careful person who pays attention to details. Some interviewers deliberately omit important details to see if you ask the right questions. Consider asking the following questions:

- How big is the size of the input?
- How big is the range of values?
- What kind of values are there? Are there negative numbers? Floating points? Will there be empty inputs?
- Are there duplicates within the input?
- What are some extreme cases of the input?
- How is the input stored? If you are given a dictionary of words, is it a list of strings or a Trie?

After you have sufficiently clarified the scope and intention of the problem, explain your high level approach to the interviewer even if it is a naive solution. If you are stuck, consider various approaches and explain out loud why it will/will not work. Sometimes your interviewer might drop hints and lead you towards the right path.

Start with a brute force approach, communicate it to the interviewer, explain the time and space complexity and why it is bad. It is unlikely that the brute force approach will be one that you will be coding. At this point, the interviewer will usually pop the dreaded "Can we do better?" question, meaning that they are looking for a more optimal approach. In my opinion, this is usually the hardest part of the interview. In general, look for repeated work and try to optimize them by potentially caching the calculated result somewhere and reference it later, rather than having to compute it all over again. There are some tips on tackling topic-specific questions that I dive into details below.

Only start coding after you and your interviewer have agreed on an approach and has given you the green light.

**Starting to Code**

Write your code with good coding style. Reading code written by others is usually not an enjoyable task. Reading horribly-formatted code by others makes it worse. Your goal is to make your interviewer understand the code you have written so that they can quickly evaluate if your code does what you say it does and whether it solves the given problem. Use clear variable names, avoid single letter names unless they are for iteration. However, if you are coding on a whiteboard, you might not want to use extremely verbose variable names for the sake of reducing the amount you have to write.

Always be explaining what you are currently writing/typing to the interviewer. This is not about literally reading out what you are typing to the interviewer. Talk about the section of the code you are currently implementing at a higher level, explain why it is written as such and what it is trying to achieve.

When you copy and paste code, consider whether it is necessary. Sometimes it is, sometimes it is not. If you find yourself copying and pasting one large chunk of code spanning multiple lines, it is probably an indicator that you can refactor by containing those lines into a function. If it is just a single line you copied, usually it is fine. Do remember to change the respective variables in your copied line of code where relevant. Copy-paste errors are a common source of bugs even in day-to-day coding!

**After Coding**

After you have finished coding, do not immediately announce to the interviewer that you are done. In most cases, your code is usually not perfect and contains some bugs or syntax errors. What you need to do now is to review your code.

Firstly, look through your code from start to finish as if it is the first time you are seeing it, as if it was written by someone else and you are trying to spot bugs in it. That's exactly what your interviewer will be doing. Look through and fix any minor issues you may find.

Next, come up with small test cases and step through the code (not your algorithm!) with those sample input. Interviewers like it when you read their mind and what they usually do after you have finished coding would be to get you to write tests. It is a huge plus if you write tests for your code even before prompts from them. You should be emulating a debugger when stepping through and jot down or say out the values of certain variables as you step through the lines of code.

If there are huge duplicated chunks of code in your solution, it would be a good chance to refactor it and demonstrate to the interviewer that you are one who values code quality. Also look out for places where you can do [short-circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation).

Lastly, give the time/space complexity of your code and explain why it is such. You can even annotate certain chunks of your code with the various time/space complexities to demonstrate your understanding of your code and the APIs of your chosen programming language. Explain any trade-offs in your current approach vs alternative approaches, possibly in terms of time/space.

If your interviewer is happy with the solution, the interview usually ends here. It is also not uncommon that the interviewer asks you extension questions, such as how you would handle the problem if the whole input is too large to fit into memory, or if the input arrives as a stream. This is a common follow-up question at Google where they care a lot about scale. The answer is usually a divide-and-conquer approach — perform distributed processing of the data and only read certain chunks of the input from disk into memory, write the output back to disk and combine them later on.

### Practicing via Mock Interviews

Interviewing is a skill that you can get better at. The steps mentioned above can be rehearsed over and over again until you have fully internalized them and following those steps become second nature to you. A good way to practice is to find a friend to partner with and the both of you can take turns to interview each other.

A great resource for practicing mock coding interviews would be [interviewing.io](https://interviewing.io/). interviewing.io provides free, anonymous practice technical interviews with Google and Facebook engineers, which can lead to real jobs and internships. By virtue of being anonymous during the interview, the inclusive interview process is de-biased and low risk. At the end of the interview, both interviewer and interviewees can provide feedback to each other for the purpose of improvement. Doing well in your mock interviews will unlock the jobs page and allow candidates to book interviews (also anonymously) with top companies like Uber, Lyft, Quora, Asana and more. For those who are totally new to technical interviews, you can even view a [demo interview](https://start.interviewing.io/interview/9hV9r4HEONf9/replay) on the site (requires sign in). Read more about them [here](https://techcrunch.com/2017/09/27/interviewing-io-hopes-to-close-the-engineer-diversity-gap-with-anonymous-interviews/).

I have used interviewing.io both as an interviewer and an interviewee and found the experience to be really great! [Aline Lerner](https://twitter.com/alinelernerLLC), the CEO and co-founder of interviewing.io and her team are passionate about revolutionizing the technical interview process and helping candidates to improve their skills at interviewing. She has also published a number of technical interview-related articles on the [interviewing.io blog](http://blog.interviewing.io/). interviewing.io is still in beta now but I recommend signing up as early as possible to increase the likelihood of getting an invite.

Another platform that allows you to practice coding interviews is [Pramp](https://pramp.com/). Where interviewing.io matches potential job seekers with seasoned technical interviewers, Pramp takes a different approach. Pramp pairs you up with another peer who is also a job seeker and both of you take turns to assume the role of interviewer and interviewee. Pramp also prepares questions for you, along with suggested solutions and prompts to guide the interviewee.

Personally, I am not that fond of Pramp's approach because if I were to interview someone, I would rather choose a question I am familiar with. Also, many users of the platform do not have the experience of being interviewers and that can result in a horrible interview experience. There was once where my matched peer, as the interviewer, did not have the right understanding of the question and attempted to lead me down the wrong path of solving the question. However, this is more of a problem of the candidate than the platform though.

### Conclusion

Coding interviews are tough. But fortunately, you can get better at them by studying and practicing for them, and doing mock interviews.
To recap, to do well in coding interviews:

1. Decide on a programming language
1. Study CS fundamentals
1. Practice solving algorithm questions
1. Internalize the [Do's and Don'ts of interviews](./cheatsheet.md)
1. Practice doing mock interviews
1. Interview successfully to get the job

By following these steps, you will improve your coding interview skills, and be one step closer (or probably more) to landing your dream job.

All the best!
