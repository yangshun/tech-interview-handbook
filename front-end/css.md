CSS
==

CSS (Cascading Style Sheets) are rules to describe how your HTML elements look. Writing good CSS is hard. It usually takes many years of experience and frustration of shooting yourself in the foot before one is able to write maintainable and scalable CSS. CSS, having a global namespace, is fundamentally designed for web documents, and not really for web apps that favor a components architecture. Hence, experienced front end developers have designed methodologies to guide people on how to write organized CSS for complex projects, such as using [SMACSS](https://smacss.com/), [BEM](http://getbem.com/), [SUIT CSS](http://suitcss.github.io/), etc.

However, the encapsulation of styles that these methodologies bring about are artificially enforced by conventions and guidelines. They break the moment developers do not follow them.

As you might have realized by now, the front end ecosystem is saturated with tools, and unsurprisingly, tools have been invented to [partially solve some of the problems](https://speakerdeck.com/vjeux/react-css-in-js) with writing CSS at scale. "At scale" means that many developers are working on the same large project and touching the same stylesheets. There is no community-agreed approach on writing [CSS in JS](https://github.com/MicheleBertoli/css-in-js) at the moment, and we are hoping that one day a winner would emerge, just like Redux did, among all the Flux implementations. For now, I would recommend [CSS Modules](https://github.com/css-modules/css-modules). CSS modules is an improvement over existing CSS that aims to fix the problem of global namespace in CSS; it enables you to write styles that are local by default and encapsulated to your component. This feature is achieved via tooling. With CSS modules, large teams can write modular and reusable CSS without fear of conflict or overriding other parts of the app. However, at the end of the day, CSS modules are still being compiled into normal globally-namespaced CSS that browsers recognize, and it is still important to learn and understand how raw CSS works.

If you are a total beginner to CSS, Codecademy's [HTML & CSS course](https://www.codecademy.com/learn/learn-html-css) will be a good introduction to you. Next, read up on the [Sass preprocessor](http://sass-lang.com/), an extension of the CSS language which adds syntactic improvements and encourages style reusability. Study the CSS methodologies mentioned above, and lastly, CSS modules.

## Glossary

- [**Box Model**](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model) - The CSS box model describes the rectangular boxes that are generated for elements in the document tree and laid out according to the visual formatting model. Each box has a content area (e.g. text, an image, etc.) and optional surrounding padding, border, and margin areas.
- [**Specificity**](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) - Specificity is how browsers decide which CSS property values are the most relevant to an element and, will therefore be applied. It is a weight that is applied to a given CSS declaration, determined by the number of each selector type in the matching selector. 
  - When multiple declarations have equal specificity, the last declaration found in the CSS is applied to the element. It only applies when the same element is targeted by multiple declarations. As per CSS rules, directly targeted elements will always take precedence over rules which an element inherits from its ancestor.
  - Typically used in type selectors/pseduo elements (`h1`, `div`, `:before`), class/attribute selectors (`.btn`, `[type="radio"]`), pseudo-classes (`:hover`) and ID selectors (`#someElement`).
  - Inline styles added to an element always overwrite any styles in external stylesheets, and thus can be thought of as having the highest specificity.
  - When an important rule (`!important`) is used on a style declaration, this declaration overrides any other declarations. Try to avoid using `!important`, as it breaks  the natural cascading in the stylesheets. Always look for a way to use specificity before even considering `!important`, and only use !important on page-specific CSS that overrides foreign CSS (from external libraries, like Bootstrap).
- [**Positioning**](https://developer.mozilla.org/en-US/docs/Web/CSS/position) - The position CSS property determines how an element will be positioned in a document. The `top`, `right`, `bottom`, and `left` properties would later determine the final location of said positioned element.
  - Initial value: `static`
  - Values that are frequently used: `relative`, `absolute`, `fixed`, `sticky`
- [**Floats**](https://developer.mozilla.org/en-US/docs/Web/CSS/float) - The `float` CSS property determines where an element should be placed - along the left or right side of its container. This allows text and inline elements to wrap around it. Also note, the element would be removed from the normal *flow* of the web page, though still remaining a part of the flow (in contrast to `position: absolute`). For an element to be `float`, it's value must not be `none`.
  - Initial value: `none`
  - Values that are frequently used: `left`, `right`, `inline-start`, `inline-end`.
  - Additional Notes: Usually, there would be cases that you may want to move an item below any floated elements. E.g, you may want some elements like your paragraphs to remain adjacent to floats, but force headings and footers to be on their own line. See [`clear` attribute](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) for more examples

## Writing CSS without Side Effects

TODO

###### References

- https://philipwalton.com/articles/side-effects-in-css/
