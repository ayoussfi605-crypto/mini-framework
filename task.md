# DOM Abstraction and Rendering — Task Breakdown

**Owner:** Yaacoub
**Role:** Developer 1 — DOM Abstraction and Rendering

## Goal

Implement the framework's DOM abstraction without React, Vue, Angular, or another high-level UI framework.

The module must convert JavaScript virtual-node descriptions into real DOM nodes and update the existing DOM when the description changes.

## Module Contract

Agree with the team on the public API and virtual-node format before implementation.

### Suggested Public API

```js
h("div", { class: "nameSubm" },
  h("input", { type: "text", placeholder: "Insert Name" }),
  h("button", { type: "button" }, "Submit")
);

render(view, document.querySelector("#app"));
```

### Suggested Virtual-Node Shape

```js
{
  type: "div",
  props: { class: "nameSubm" },
  children: []
}
```

Use one consistent representation throughout all modules. Document any changes agreed with the team.

---

## 1. h.js — Create Virtual Nodes

### Purpose

Provide the `h()` factory function used by framework users to describe elements.

### Tasks

- [ ] Export an `h(type, props, ...children)` function.
- [ ] Store the element tag/type.
- [ ] Store props and attributes consistently.
- [ ] Store children in a predictable array.
- [ ] Handle omitted or null props.
- [ ] Use the agreed child-normalization function.
- [ ] Do not create real DOM nodes in this module.
- [ ] Document the returned virtual-node shape.

### Acceptance Criteria

- [ ] `h("p", {}, "Hello")` returns a virtual node.
- [ ] Nested `h()` calls remain nested virtual nodes.
- [ ] Missing props do not cause errors.
- [ ] The returned shape matches the team's agreed contract.

---

## 2. normalize.js — Normalize Children

### Purpose

Make child values consistent before the renderer processes them.

### Tasks

- [ ] Export a child-normalization function.
- [ ] Flatten nested child arrays.
- [ ] Convert string and numeric children into the agreed text representation.
- [ ] Ignore null and undefined children.
- [ ] Ignore boolean children, unless the team agrees otherwise.
- [ ] Preserve valid virtual nodes.
- [ ] Define behavior for unsupported child values.
- [ ] Add tests for mixed and nested children.

### Acceptance Criteria

- [ ] Nested arrays become a flat child list.
- [ ] Empty children do not create invalid DOM nodes.
- [ ] Numbers render as text consistently.
- [ ] Virtual nodes remain intact.

---

## 3. createDom.js — Convert VNodes to Real DOM

### Purpose

Create a real DOM node from a normalized virtual node.

### Tasks

- [ ] Export a function such as `createDom(vnode)`.
- [ ] Create text nodes safely for text children.
- [ ] Create elements with `document.createElement()`.
- [ ] Apply props using `setProp.js`.
- [ ] Recursively create each child.
- [ ] Append child nodes in the correct order.
- [ ] Handle empty children.
- [ ] Define clear behavior for invalid virtual nodes.
- [ ] Avoid using `innerHTML` for user-provided text.

### Acceptance Criteria

- [ ] Nested VNodes produce the correct DOM hierarchy.
- [ ] Text is treated as text, not parsed as HTML.
- [ ] Attributes and properties are applied through the shared helper.
- [ ] Child order is preserved.

---

## 4. setProp.js — Set and Remove Properties

### Purpose

Centralize DOM property and attribute updates so initial rendering and patching use the same rules.

### Tasks

- [ ] Export a helper with a documented signature, such as `setProp(element, name, value, previousValue)`.
- [ ] Handle class and id.
- [ ] Handle form properties such as value and checked.
- [ ] Handle common attributes such as type, placeholder, and disabled.
- [ ] Handle boolean attributes consistently.
- [ ] Remove attributes when their values are removed or become false where appropriate.
- [ ] Distinguish DOM properties from HTML attributes when needed.
- [ ] Reserve event props such as onClick for the event system agreed with Developer 3.
- [ ] Avoid assigning arbitrary unknown props without a clear policy.

### Acceptance Criteria

- [ ] Initial props are applied correctly.
- [ ] Changed props replace old values.
- [ ] Removed props are cleared.
- [ ] Input value and checked behave correctly.
- [ ] Event handling follows the team's shared event API.

---

## 5. patch.js — Compare and Update Old/New Trees

### Purpose

Update the existing DOM based on the difference between the previous and next VNode trees, avoiding unnecessary replacement.

### Tasks

- [ ] Agree on the patch function signature.
- [ ] Define how the corresponding DOM node is found.
- [ ] Handle an absent old VNode by creating and inserting the new node.
- [ ] Handle an absent new VNode by removing the old node.
- [ ] Replace a node when its type/tag changes.
- [ ] Update text nodes when their text changes.
- [ ] Compare props and update changed props through setProp.js.
- [ ] Remove props that existed before but are absent now.
- [ ] Recursively patch matching children.
- [ ] Append newly inserted children.
- [ ] Remove excess children.
- [ ] Preserve child order.
- [ ] Start with positional child matching.
- [ ] Consider keyed reconciliation only if project requirements need it.
- [ ] Add tests for each patch case.

### Acceptance Criteria

- [ ] Text changes update the existing text node when possible.
- [ ] Changed props are applied and removed props are cleared.
- [ ] Inserted and removed children appear correctly.
- [ ] Changed element types are replaced correctly.
- [ ] Unchanged parts of the tree are not needlessly recreated.

---

## 6. render.js — Public Rendering API

### Purpose

Expose the function that mounts a VNode and coordinates updates for a target container.

### Tasks

- [ ] Export `render(vnode, container)`.
- [ ] Validate that the target container is provided.
- [ ] Support the initial mount.
- [ ] Keep enough information to compare the previous VNode with the next one.
- [ ] On repeated renders, call patch() rather than recreating the entire app.
- [ ] Define behavior when rendering into a container that already has content.
- [ ] Avoid wiping unrelated DOM outside the framework-owned root.
- [ ] Document the API and its return behavior.

### Acceptance Criteria

- [ ] render(view, container) mounts the view correctly.
- [ ] Rendering a changed view updates the mounted DOM.
- [ ] Repeated rendering does not unnecessarily recreate the whole tree.
- [ ] Invalid arguments fail predictably.

---

## Integration and Shared Responsibilities

- [ ] Export agreed public functions through the framework's shared entry point, such as src/index.js.
- [ ] Coordinate the VNode format with the state-management developer.
- [ ] Coordinate event props and listener lifecycle with Developer 3.
- [ ] Confirm API names and signatures before teammates depend on them.
- [ ] Ensure required TodoMVC classes and IDs can be rendered.
- [ ] Do not add a high-level UI framework.

---

## Final Test Checklist

- [ ] Nested elements and text.
- [ ] Strings, numbers, empty children, and nested arrays.
- [ ] class, id, type, placeholder, value, and checked.
- [ ] Boolean attributes.
- [ ] Changed and removed props.
- [ ] Changed text.
- [ ] Inserted and removed children.
- [ ] Reordered children.
- [ ] Changed element type.
- [ ] Safe rendering of user-provided text.
- [ ] Repeated calls to render().
- [ ] Event integration.
- [ ] Public API documentation and examples.

---

## Definition of Done

The module is complete when:

- Users can create nested UI descriptions through the agreed API.
- The framework mounts the descriptions as real DOM nodes.
- Updates modify the existing DOM without unnecessarily recreating the whole app.
- Props, attributes, text, and children update correctly.
- TodoMVC-required classes and IDs can be rendered.
- Tests pass and the API is documented.
- Teammates can use the module through the shared framework entry point.
