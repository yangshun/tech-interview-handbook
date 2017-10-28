Accessibility
==

## Glossary

- **Accessibility** -
- **WAI-ARIA** - Web Accessibility Initiative - Accessible Rich Internet Applications. Commonly shortened to ARIA.

## What is Accessibility?

Making sure that the content and the websites we create are usable to people with impairments or disabilities.

## WebAIM Checklist

The following is a checklist that contains recommendations for implementing HTML-related principles and techniques for those seeking WCAG 2.0 conformance (it is NOT the Web Content Accessibility Guidelines (WCAG) 2.0).

- **Perceivable** - Web content is made available to the senses - sight, hearing, and/or touch.
  - Text Alternatives: Provide text alternatives for any non-text content.
  - Time-based Media: Provide alternatives for time-based media.
  - Adaptable: Create content that can be presented in different ways (for example simpler layout) without losing information or structure.
  - Distinguishable: Make it easier for users to see and hear content including separating foreground from background.
- **Operable** - Interface forms, controls, and navigation are operable.
  - Keyboard Accessible: Make all functionality available from a keyboard.
  - Enough Time: Provide users enough time to read and use content.
  - Seizures: Do not design content in a way that is known to cause seizures.
  - Navigable: Provide ways to help users navigate, find content, and determine where they are.
- **Understandable** - Content and interface are understandable.
  - Readable: Make text content readable and understandable.
  - Predictable: Make Web pages appear and operate in predictable ways.
  - Input Assistance: Help users avoid and correct mistakes.
- **Robust** - Content can be used reliably by a wide variety of user agents, including assistive technologies.
  - Compatible: Maximize compatibility with current and future user agents, including assistive technologies.

**Source:** http://webaim.org/standards/wcag/checklist

## Focus

- Making sure your application has a sensible tab order is important.
- HTML forms and inputs are focusable and handle keyboard events by default.
- Focus tab order relies on the DOM order in the HTML.
- Be careful when using CSS when changing the order of elements on the screen, it can cause the order to be unintuitive and messy.
- `tabindex` attribute:
  - `-1`: Not in the natural tab order, but programatically focusable using JavaScript with `focus()` method. Useful for off-screen content which later appears on screen. Children elements are **NOT** pulled out of the tab order.
  - `0`: In the natural tab order and can be programatically focused.
  - `1` (bigger than 1): In the natural tab order but jumped in front of the tab order regardless of where it is in the DOM. It can be considered an anti-pattern.
- Add focus behavior to interactive controls, like buttons, tabs, dropdowns, stuff that users will interactive with.
- Use skip links to allow users to skip directly to the main content without having to tab through all the navigation.
- `document.activeElement` is useful in tracking the current element that has focus on.

## Semantics

- Using proper labeling not only helps accessibility but it makes the element easier to target for all users!
- Use `<label>` with `for` attributes for form elements.
- Use `alt` attribute for `<img>` elements. Alt text must describe the image.
- TODO

## Navigating Content

- MacOS comes built-in with VoiceOver. Press <kbd>CMD</kbd> + <kbd>F5</kbd> to activate.
  - Activate Web Rotor with <kbd>Ctrl</kbd> + <kbd>Option</kbd> + <kbd>U</kbd>. Web Rotor displays landmarks, headings, links and more on the page and allows you to jump to them directly.
- Heading weight should be decided by its importance on the page and not how big it should look, as the heading tag chosen affects the order the headings are listed on screen readers.
- Use HTML5 semantic tags like `<main>`, `<nav>`, `<header>`, `<aside>`, `<article>`, `<section>`, `<footer>` to indicate landmarks on the page.

## ARIA

- Express semantics that HTML can't express on its own.
- Accessibility tree = DOM + ARIA.
- ARIA attributes
  - Allow us to modify the accessibility tree before they are exposed to assistive technologies.
  - DO NOT modify the element appearance.
  - DO NOT modify element behaviour.
  - DO NOT add focusability.
  - DO NOT add keyboard event handling.
- E.g. for custom checkboxes, adding ARIA attributes is not sufficient, you will need to write your own JavaScript to emulate the native behaviour to synchronize the ARIA attributes and values with the actual visual state, such as toggling using clicks and hitting spacebar. It's probably not worth it to reinvent the wheel by writing your own custom widgets that already exist in HTML5.
- ARIA can add semantics to elements that have no native semantics, such as `<div>`. ARIA can also modify element semantics.
- ARIA allows developers to create accessible widgets that do not exist in HTML5, such as a tree widget.
- `aria-role` attributes tell assistive technologies that the element should follow that role's accessibility patterns. There are well-defined roles in the HTML spec. Do not define them on your own.
  - `tabindex="0"` is usually added to it elements that have `role` added so that it can be focused.
- Assistive labelling
  - `aria-label` is useful for labelling buttons where the content is empty or contains only icons.
  - `aria-labelledby` is similar to `<label>` elements, and can be used on any elements.
    ```html
    /* Normal label example */
    <input type="radio" id="coffee-label">
    <label for="coffee-label">Coffee</label>

    /* aria-labelledby example */
    <div role="radio" aria-labelledby="coffee-label"></div>
    <span id="coffee-label">Coffee</span>
    ```
- ARIA Relationships
  - ARIA relationship attributes create semantic relationships between elements on the page. The `aria-labelledby` attribute in the previous example indicates that the `<div>` is labelled by the element with that `id`.
  - Possible relationship attributes include `aria-activedescendent`, `aria-describedby`, `aria-labelledby`, `aria-owns`, `aria-posinset` and `aria-setsize`.
- With ARIA, you can expose only relevant parts of the page to accessibility tree. Elements can be hidden via:
  - Setting `visibility`: `<button style="visibility: hidden">`.
  - Setting `display`: `<button style="display: none">`.
  - HTML5 `hidden` attribute: `<span hidden>`. This makes the element hidden to everyone.
  - `aria-hidden` attribute: `<div aria-hidden="true">`. This makes the element hidden to screenreaders too. Note that `aria-hidden` attribute requires an explicit value of `true` or `false`.
- Technique for screenreader-only text:
  ```
  .screenreader {
    position: absolute;
    left: -1000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  ```
- `aria-live` attribute can be used to grab the assistive technology's attention to cause it to announce updates to the user. Practically, include `aria-live` attributes in the initial page load. The different `aria-live` values include:
  - `off` (default) - Updates will not be presented unless the region is currently focused.
  - `polite` - Assistive technologies should announce updates at the next graceful opportunity, such as at the end of speaking the current sentence on when the user pauses typing. Such as receiving new chat messages.
  - `assertive` - Highest priority and assistive technologies should notify the user immediately. Examples include server status error alerts.
- `aria-atomic` attribute indicates whether the entire region should be presented as a whole when communicating updates. Such as a date widget comprising of multiple `<input>` fields for day/month/year. When the user changes a field, the full contents of the widget will be read out. It takes in a `true` or `false` value.
- `aria-relevant` attribute indicates what types of changes should be presented to the user.
  - `additions` - Element nodes are added to the DOM within the live region.
  - `removals` - Text or element nodes within the live region are removed from the DOM.
  - `text` - Text is added to any DOM descendant nodes of the live region.
  - `all` - Equivalent to the combination of all values, `additions removals text`.
  - `additions text` (default) - Equivalent to the combination of values, `additions text`.
- `aria-busy` attribute indicates the assistive technologies should ignore changes to the element, such as when things are loading, for example after a temporary connectivity loss. It takes in `true` or `false`. It takes in a `true` or `false` value.

## Style

#### Introduction

- Ensure elements are styled to support the existing accessibility work, such as adding styles for `:focus` and the various ARIA states.
- Flexible user interface that can handle being zoomed or scaled up, for users who have trouble reading smaller text.
- Color choices and the importance of contrast, making sure we are not conveying information just with color alone.

#### Focus

- As much as possible, leave the default focus in place. Do not remove the `:focus` styling just because it does not fit into your design or looks odd! - A good technique is to use a similar styling as `:hover` for `:focus`.
- Some CSS resets would kill off the focus styling, so it's important to be aware of them and get them back.

#### Styling with ARIA

Consider using ARIA attributes in your CSS selectors to reduce some noise in your CSS. For custom toggle buttons, instead of doing this,

```html
<div class="toggle pressed" role="button" tabindex="0" aria-pressed="true"></div> /* On */
<div class="toggle" role="button" tabindex="0" aria-pressed="false"></div> /* Off */

.toggle.pressed {
  ...
}
```

you can do this instead:

```html
<div class="toggle" role="button" tabindex="0" aria-pressed="true"></div> /* On */
<div class="toggle" role="button" tabindex="0" aria-pressed="false"></div> /* Off */

.toggle[aria-pressed="true"] {
  ...
}
```

which removes the need for toggling the `press` class on the element.

#### Responsive Design

Responsive design is also beneficial for accessibility when zooming the page transforms the page into the mobile layout instead.

Use a meta viewport tag:

```
<meta name="viewport" content="width=device-width initial-scale="1">
```

`user-scalable=no` is an anti-pattern for accessibility.

Use relative units like `%`, `em` and `rem`. The differences are as follows:

- `%` - Relative to the containing block.
- `em` - Relative to the `font-size` of the parent.
- `rem` - Relative to the `font-size` of the root, which is the `<html>` element.

Interactive interface elements such as buttons should be large enough, have enough spacing around itself so that they do not overlap with other interactive elements.

#### Color and Contrast

Contrast ratio is the ratio of luminance between the foreground color (such as text) and the background color. For text and images, aim for a large contrast ratio of 7:1 and for larger text (over 18 point or 14 point bold), aim for at least 4.5:1.

Chrome Devtools has an Accessibility audit feature that can flag the contrast issues on your page.

Color should not be used as the sole method of conveying content or distinguishing visual elements, such as only changing the `border-color` of `<input>` fields that have error to red. These changes will not be obvious/visible to people with color blindness. An error message below the field will be helpful.

Some users might be using a High Contrast mode which allows a user to invert the background and foreground colors to read text better. Ensure that your page also looks fine on High Contrast mode which you can simulate with a [Chrome High Contrast extension](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en).

#### Assessing Impact of Accessibility Issues

Fixing accessibility issues is like fixing bugs; it is best looked at through the lens of impact. How can you have the most impact on users with the least amount of effort?

- How frequent is this piece of UI used? Is it part of a critical flow?
- How badly does this accessibility issue affect your users?
- How expensive is it going to cost to fix?

###### References

- https://www.udacity.com/course/web-accessibility--ud891
