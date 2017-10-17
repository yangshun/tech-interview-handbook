HTML
==

HTML (Hypertext Markup Language) is the structure that all websites are built on. Anyone working on websites and webapps should have a basic understanding of HTML at the very least. A helpful analogy for understanding the importance of HTML is the house scenario. When building a new house, the process can be split into a few key areas; structure (HTML), aesthetics (CSS) and furniture (Content). The HTML is your basic page structure, without the structure, you cannot change how it looks using CSS, or what content is on the page.

## Glossary

- **Doctype**

## Deprecated Tags

There are a number of tags from past versions of HTML that have become deprecated over time. This means that while they are no longer considered valid elements, most browsers should still be able to read and render them. 

## Script Loading

- `<script>` - HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.
- `<script async>` - The script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes). Use `async` when the script is independent of any other scripts on the page, for example analytics.
- `<script defer>` - The script will be fetched in parallel to HTML parsing and executed when the page has finished parsing. If there are multiple of them, each deferred script is executed in the order they were encoun­tered in the document.
