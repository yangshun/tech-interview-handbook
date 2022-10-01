---
title: A Glimpse into Front End Interviews
slug: a-glimpse-into-front-end-interviews
author: Kai Li
author_title: Software Engineer at Stripe, ex-Quora
author_url: https://github.com/li-kai
author_image_url: https://github.com/li-kai.png
tags: [front end, leetcode]
hide_table_of_contents: true
---

A glimpse into the front end interview process and questions that frequently come up.

<!--truncate-->

<head>
  <link rel="canonical" href="https://lik.ai/blog/a-glimpse-into-front-end-interviews" />
</head>

## Interview Process

Applying for front end engineer roles is very similar to software engineer roles, but the interviews can be quite different. In my experience, for each company, there tend to be between 3 to 4 sessions. Most of them will be testing on JavaScript and discussion around web development technologies, and the rest on algorithms or behavioral.

One aspect that I have found interesting is that the younger the company, the more questions will lean towards JavaScript. This could be because hiring specifically for front end engineers is relatively new. Older companies used to only hire software engineers without regard if their focus is on the back end or front end.

## JavaScript Rounds

JavaScript is the main focus among all the companies I have interviewed with. It makes sense as front end work nowadays is very JavaScript-heavy. HTML and CSS knowledge is no longer a necessity thanks to component libraries and the likes.

### JavaScript Minutiae

To qualify for some companies, you might need to brush up on the minutiae of JavaScript. Topics like variable hoisting, holey arrays, non-strict mode, and switch case fall through came up. While I do not feel that knowing such things determine who is a better engineer, it is what it is. Here is my [JavaScript cheat sheet](https://repl.it/@li_kai/JavaScript-Cheatsheet).

### JavaScript Topics

After the first assessment, live interviews tend to test on more advanced JavaScript concepts such as the event loop, promises, async/await, scope and closures.

If you have been writing JavaScript applications for some time and have come across a variety of situations, this should not be too hard.

The most frequently asked question I have ever gotten is to implement `debounce` and `throttle`:

```javascript
function debounce(fn, duration) {
  let id;
  return function (...args) {
    if (id) {
      // reset timeout and prevent it from triggering
      // if debounced function is called within duration
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
    }, duration);
  };
}

function throttle(fn, duration) {
  let id;
  return function (...args) {
    if (id) {
      // if throttled function is called within duration,
      // do nothing
      return;
    }

    fn(...args);

    id = setTimeout(() => {
      id = null; // release "lock"
    }, duration);
  };
}

// usage example
const helloWorld = () => {
  console.log('hello world');
};
const debouncedHelloWorld = debounce(helloWorld, 1000);
const throttledHelloWorld = throttle(helloWorld, 1000);
```

The second most frequently asked question is to implement a sequential `Promise.all` of sorts:

```typescript
function sequential(data, fetcher) {
  const helper = (index, results) => {
    if (index === data.length) {
      return results;
    }
    return fetcher(data[index]).then((datum) => {
      results.push(datum);
      return helper(index + 1, results);
    });
  };

  return helper(0, []);
}

// usage example
const fetcher = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(i), 1000);
  });
};
sequential([1, 2, 3], fetcher);
```

## Discussion Rounds

### Web development tools

Regardless of how we wish to deny it, web development tools are an increasingly complex and diverse ecosystem.

Smaller companies, especially start-ups, require engineers who have a good understanding of these tools. Larger companies will be able to abstract tooling complexity away from engineers unless the role demands it.

As such, web development tools like Webpack and Babel have become a common discussion topic.

A good understanding of tools like Webpack would be to be able to explain the following concepts:

- what is bundling
- what is tree-shaking
- what is lazy-loading and why does it matter
- how loaders work

### React or web framework of choice

If the role states that React knowledge is required, you may be expected to answer or code out React components. If you do not have React experience, using other frameworks would be possible, provided that you can explain well what is happening.

This may range from implementing a feature live or simply answering or explaining some React concepts such as `useEffect`'s dependencies array or `shouldComponentUpdate`.

### Work experience

Aside from the two topics mentioned earlier, interviewers might dive into one or two things that they found interesting in your resume and ask you to elaborate.

As I had some experience in writing Babel plugins and jscodeshift code mods, I walked them through how I utilized those tools to help make the company codebase better.

## Implementation Rounds

In all of my interviews, I have only been asked to implement a feature twice. It is not a common question, but it may come up.

This would come down to how well-versed you are with your basics such as HTML and CSS, as well as tools and frameworks. As an example, one of the question I have gotten was to implement an autocomplete search bar like Google's. If you have built something like that before, it is doable within an hour.

Implementation rounds feel very similar to algorithms, as you need to actively find the best solution while thinking out loud and explaining your decisions.

## Algorithm Rounds

As software engineers, we are not unfamiliar with algorithm questions. LeetCode and Hackerrank are common resources used for practicing such questions.

As I knew this was my weakness, this was where I spent the most time. It may be a little ironic that I chose Python over JavaScript as my language of choice for tackling algorithms. JavaScript's lack of a native minheap and binary search implementation made it a slightly worse choice.

For those who are just starting to learn Python or getting back into it, here's my [Python cheat sheet](https://repl.it/@li_kai/Python-Cheatsheet).

## Conclusion

Front end software engineer roles are not very different from general software engineer roles, but they do tend to be more specialized and in some ways, require even more effort.

If you are passionate about this field and interested in what you do, this would not be too high of a hurdle. I hope my experience and tips were useful to you, and good luck in your search!
