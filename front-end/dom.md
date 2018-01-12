DOM
==

## Glossary

- **Event Delegation** - Event delegation refers to the process of using event propagation (bubbling) to handle events at a higher level in the DOM than the element on which the event originated. It allows us to attach a single event listener for elements that exist now or in the future.

## Node API

Here's a list of the essential and more common DOM `Node` APIs. It is important to know how to traverse and manipulate the DOM in vanilla JS without jQuery.

**Properties**

- `Node.childNodes` - Returns a live `NodeList` containing all the children of this node. `NodeList` being live means that if the children of the Node change, the `NodeList` object is automatically updated.
- `Node.firstChild`
- `Node.lastChild`
- `Node.nextSibling` - Returns a `Node` representing the next node in the tree, or `null` if there isn't such a node.
- `Node.nodeName` - `DIV`, `SPAN`, etc. Note that it is in upper case in HTML documents, and has the same value as `Element.tagName`.
- `Node.parentNode` - Returns a `Node` that is the parent of this node. If there is no such node, like if this node is the top of the tree or if it doesn't participate in a tree, this property returns `null`.
- `Node.parentElement` - Returns an `Element` that is the parent of this node. If the node has no parent, or if that parent is not an `Element`, this property returns `null`.
- `Node.previousSibling` - Returns a `Node` representing the previous node in the tree, or `null` if there isn't such a node.
- `Node.textContent` - Returns / Sets the textual content of an element and all its descendants.

**Methods**

- `Node.appendChild(node)` - Adds the specified `node` argument as the last child to the current node. If the argument referenced an existing node on the DOM tree, the node will be detached from its current position and attached at the new position.
- `Node.cloneNode(node)` - Clone a `Node`, and optionally, all of its contents. By default, it clones the content of the node.
- `Node.contains(node)` - Returns a `Boolean` value indicating whether a node is a descendant of a given node or not.
- `Node.hasChildNodes()` - Returns a `Boolean` indicating if the element has any child nodes, or not.
- `Node.insertBefore(newNode, referenceNode)` - Inserts the first `Node` before the reference node as a child of the current node. If `referenceNode` is `null`, the `newNode` is inserted at the end of the list of child nodes.
- `Node.removeChild(node)` - Removes a child node from the current element, which must be a child of the current node.
- `Node.replaceChild(newChild, oldChild)` - Replaces one child node of the specified node with another node.

## Element API

Here's a list of the essential and more common DOM `Element` APIs. It is important to know how to traverse and manipulate the DOM in vanilla JS without jQuery.

**Properties**

- `Element.attributes` - Returns a `NamedNodeMap` object containing the assigned attributes of the corresponding HTML element.
- `Element.classList` - Returns a `DOMTokenList` containing the list of class attributes.
  - `DOMTokenList.add(String [, String])` - Add specified class values. If these classes already exist in attribute of the element, they are ignored.
  - `DOMTokenList.remove(String [, String])` - Remove specified class values.
  - `DOMTokenList.toggle(String [, force])` - Toggle specified class value. If second argument is present and evaluates to `true`, add the class value, else remove it.
  - `DOMTokenList.contains(String)` - Checks if specified class value exists in class attribute of the element.
- `Element.className` - A `DOMString` representing the class of the element.
- `Element.id`
- `Element.innerHTML` - Returns a `DOMString` representing the markup of the element's content or parse the content string and assigns the resulting nodes as children of the element.
- `Element.tagName` - `DIV`, `SPAN`, etc. Note that it is in upper case in HTML documents, and has the same value as `Node.nodeName`.

**Methods**

- `EventTarget.addEventListener(type, callback, options)` - Registers an event handler to a specific event type on the element. Read up more on the `options` [here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
- `EventTarget.removeEventListener(type, callback, options)` - Removes an event listener from the element. Read up more on the `options` [here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener).
- `Element.closest(selectors)` - Returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter. If there isn't such an ancestor, it returns `null`.
- `Element.getElementsByClassName(classNames)`- Returns a live `HTMLCollection` that contains all descendants of the current element that possess the list of classes given in the parameter.
- `Element.getElementsByTagName(tagName)` - Returns a live `HTMLCollection` containing all descendant elements, of a particular tag name, from the current element.
- `Element.querySelector(selectors)` - Returns the first `Node` which matches the specified selector string relative to the element.
- `Element.querySelectorAll(selectors)` - Returns a `NodeList` of nodes which match the specified selector string relative to the element.
- `ChildNode.remove()` - Removes the element from the children list of its parent. TODO: Check whether it's `Element` or `ChildNode`.
- `Element.setAttribute(attrName, value)` - Sets the value of a named attribute of the current node.
- `Element.removeAttribute(attrName)` - Removes the named attribute from the current node.

## Document API

- `document.getElementById(id)` - An Element object, or null if an element with the specified ID is not in the document.

## Window/Document Events

- `document.addEventListener('DOMContentLoaded', callback)`
  - The `DOMContentLoaded` event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. Similar to `jQuery.ready()` but different because `$.ready` will execute immediately if the `DOMContentLoaded` event has already fired.
  - This corresponds to `document.readyState === 'interactive'`.
- `window.onload = function() {}`
  - `window`'s `load` event is only fired after the DOM and all assets have loaded.
  - This corresponds to `document.readyState === 'complete'`.

## Questions

**What's the difference between `Node.children` and `Node.childNodes`?**

`Node.children` returns a live `HTMLCollection` of the child `elements` of `Node`. `Node.childNodes` returns a `NodeList`, an ordered collection of DOM nodes that are children of the current `Element`. `childNodes` includes all child nodes, including non-element nodes like text and comment nodes. To get a collection of only elements, use `Node.children` instead.

**What's the difference between `NodeList` and `HTMLCollection`?**

A `NodeList` can contain any node type, but an `HTMLCollection` is supposed to only contain `Element` nodes. `HTMLCollection` is always live and is a superset of `NodeList`. `NodeList` need not be live.

**How do you convert an `HTMLCollection` or `NodeList` into an array?**

```js
const nodelist = document.querySelectorAll('div');
// Array.from
const divArray = Array.from(nodelist);
// Array.prototype.slice
const divArray2 = Array.prototype.slice.call(nodelist); // or .apply
// ES2015 Spread
const divArray3 = [...nodeList];
```

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Node
- https://developer.mozilla.org/en-US/docs/Web/API/Element
