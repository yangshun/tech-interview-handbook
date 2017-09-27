Performance
==

WIP.

## Glossary

- **Critical Rendering Path** -
- `requestAnimationFrame`

## General Strategies

1. Minimize Bytes.
1. Reduce critical resources.
1. Reduce CRP length. TODO: Explain what CRP length is.

## Loading

- Minify, Compress, Cache assets.
- Browsers have a [preloader](https://andydavies.me/blog/2013/10/22/how-the-browser-pre-loader-makes-pages-load-faster/) to load assets ahead of time.

## Rendering

- Remove whitespace and comments from HTML/CSS/JS file via minification.
- CSS
  - CSS blocks rendering AND JavaScript execution.
  - Split up CSS for fewer rendering blocking CSS stylesheets by using media attributes.
    - Download only the necessary CSS before the browser can start to render.
    - https://developers.google.com/web/fundamentals/design-and-ui/responsive/#css-media-queries
  - Use Simpler selectors.
- JavaScript
  - JS blocks HTML parsing. If the script is external, it will have to be downloaded first. This incurs latency in network and execution.
  - Shift `<script>` tags to the bottom.
  - Async:
    - Scripts that don't modify the DOM or CSSOM can use the `async` attribute to tell the browser not to block DOM parsing and does not need to wait for the CSSOM to be ready.
  - Defer JavaScript execution:
    - There is also a `defer` attribute available. The difference is that with `defer`, the script waits to execute until after the document has been parsed, whereas `async` lets the script run in the background while the document is being parsed.
  - Use web workers for long running operations to move into a web worker thread.
  - Use `requestAnimationFrame`

###### References

- https://bitsofco.de/understanding-the-critical-rendering-path/

## Measuring

- [Navigation Timing API](https://developer.mozilla.org/en/docs/Web/API/Navigation_timing_API) is a JavaScript API for accurately measuring performance on the web. The API provides a simple way to get accurate and detailed timing statistics natively for page navigation and load events.
  - `performance.timing`: An object with the timestamps of the various events on the page. Some uses:
    - Network latency: `responseEnd` - `fetchStart`.
    - The time taken for page load once the page is received from the server: `loadEventEnd` - `responseEnd`.
    - The whole process of navigation and page load: `loadEventEnd` - `navigationStart`.

## Tools

- Yahoo YSlow
- Google PageSpeed Insights
- WebPageTest
- Sitespeed.io
- Google Lighthouse

## Web Performance Rules

- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp
- http://stevesouders.com/hpws/rules.php
- https://developer.yahoo.com/performance/rules.html
- https://browserdiet.com/en/
