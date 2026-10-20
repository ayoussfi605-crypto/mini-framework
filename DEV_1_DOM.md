# Developer 1 — DOM Abstraction and Rendering === -> yaacoub

## Mission
Build the framework's DOM abstraction. Developers describe UI with JavaScript objects/functions, and your module creates and updates real DOM elements. Do not use React, Vue, Angular, or another high-level UI framework.

## Responsibilities
- Define a representation for tags, attributes, and children.
- Create real DOM nodes from that representation.
- Update text, attributes, and children when the UI description changes.
- Coordinate a stable public API with the team.

Suggested API (agree on the final names with the team):
```js
h("div", { class: "nameSubm" },
  h("input", { type: "text", placeholder: "Insert Name" }),
  h("button", { type: "button" }, "Submit")
);
render(view, document.querySelector("#app"));
```

## Step-by-step tasks
1. Agree on the element format: tag, attributes/props, and children. Support nested elements, strings, numbers, and empty children.
2. Implement an element factory such as `h(tag, attrs, ...children)`. Normalize children consistently.
3. Implement rendering from the framework representation to real DOM nodes. Handle text safely and support common attributes/properties such as `class`, `id`, `value`, `checked`, and `placeholder`.
4. Handle boolean attributes and remove attributes when they are no longer present.
5. Implement updates by comparing the previous and next UI descriptions. Update only what changed where practical; avoid recreating the whole app on every update.
6. Support changed text, changed attributes, inserted/removed children, and changed element types.
7. Coordinate with Developer 3 so event properties use the framework's custom event API.
8. Test nested elements, classes/IDs, input values, checked state, changed attributes, removed children, and repeated rendering.

## Learn and understand
- DOM trees, elements versus text nodes, and attributes versus element properties.
- Recursion for nested children.
- Virtual representations and comparing old/new trees.
- Why predictable updates avoid unnecessary DOM replacement.
- Safe handling of text and user-provided strings.

## Deliverables
- DOM abstraction and rendering/update module.
- Tests or a repeatable manual test checklist.
- Short API notes and examples for the documentation owner.
- Integration with the shared framework entry point.

## Definition of done
- [ ] No high-level framework/library is used.
- [ ] Users can create elements, add attributes, and nest children through the framework API.
- [ ] The framework renders the described tree correctly.
- [ ] Updating the description updates the real DOM correctly.
- [ ] TodoMVC-required classes and IDs can be rendered.
- [ ] The API is documented and usable by teammates.
