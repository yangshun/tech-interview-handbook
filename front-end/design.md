Design Questions
==

## Autocomplete Widget

Talk me through a full stack implementation of an autocomplete widget. A user can type text into it, and get back results from a server.
- How would you design a frontend to support the following features:
  - Fetch data from a backend API
  - Render results as a tree (items can have parents/children - it's not just a flat list)
  - Support for checkbox, radio button, icon, and regular list items - items come in many forms
- What does the component's API look like?
- What does the backend API look like?
- What perf considerations are there for complete-as-you-type behavior? Are there any edge cases (for example, if the user types fast and the network is slow)?
- How would you design the network stack and backend in support of fast performance: how do your client/server communicate? How is your data stored on the backend? How do these approaches scale to lots of data and lots of clients?
