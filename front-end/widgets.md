Widgets
==

Here are some commonly seen widgets/components and the considerations we should take into account when designing them.

### Autocomplete

Also known as typeahead box.

#### UX

- Type a minimum number of characters (typically two) for the results to be displayed. This is because short search terms can result in too many matches and irrelevant results may be returned.
- Number of query suggestions should be kept short and scrollbars should be avoided. Shorter list of results are more manageable and reduces the cognitive load on the user. If you have scrollbars it probably means you are displaying too many results!
- Highlight the non-search terms (suggested terms) in the results. This helps the user differentiate the autocomplete suggestions, make it easier to compare.
- Support keyboard shortcuts: Up/down to navigate and enter to search.
- Show a history of recent searches.
- Use placeholder text in the input field to educate users, such as "Type to view suggestions".

#### Performance

- Use windowing/virtual lists when the search results is too long.
- Debounce user input and only search when user stops typing for some time (usually 300ms).

###### References

- https://baymard.com/blog/autocomplete-design

### Carousel

#### UX

- Consider preloading a few images to the left/right of the displayed image during idle time so that as the user navigates, he does not have to wait for the image to be downloaded.
- Allow left/right keyboard navigation of the carousel.

#### Performance

- Lazy load the images. Only load those that the user has a high likelihood of viewing - Current image and a few to the left and right.

### Dropdown

- Dropdowns that are displayed on hover are not mobile friendly as there is no hover event on mobile.
- Dropdown positioning can differ based on position of element on screen. If the element is near the edge and the displayed dropdown will be obscured outside of the viewport, the position of the dropdown can and should be changed.
- If the height of the dropdown is too long, it may extend outside of the screen. Be sure to make the dropdown contents scrollable by setting a `max-height`.

### Modal

- Modals can usually be dismissed by clicking on the backdrop. If the user interacts with the modal content by clicking on it, the backdrop might also receive the click event and be dismissed as a result.

###### References

- https://css-tricks.com/dangers-stopping-event-propagation/

### Tooltip

- Tooltips that are displayed on hover are not mobile friendly as there is no hover event on mobile.
- Tooltip positioning can differ based on position of element on screen. If the element is near the edge and the displayed tooltip will be obscured outside of the viewport, the position of the tooltip can and should be changed.
