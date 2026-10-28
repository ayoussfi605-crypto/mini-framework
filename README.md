# Mini Framework + TodoMVC

A small JavaScript UI framework built from scratch, plus a TodoMVC application that uses it. The framework provides a virtual DOM, declarative element creation, DOM rendering and patching, shared state, custom event handling, and hash-based client-side routing.

No React, Vue, Angular, or similar UI framework is used.

## Table of contents

- [Features](#features)
- [Project structure](#project-structure)
- [Requirements and running the project](#requirements-and-running-the-project)
- [Quick start](#quick-start)
- [Creating elements](#creating-elements)
- [Adding attributes and properties](#adding-attributes-and-properties)
- [Nesting elements](#nesting-elements)
- [Handling events](#handling-events)
- [Shared state](#shared-state)
- [Routing](#routing)
- [How the framework works](#how-the-framework-works)
- [API reference](#api-reference)
- [TodoMVC](#todomvc)
- [Manual audit checklist](#manual-audit-checklist)
- [Known limitations](#known-limitations)

## Features

- **Virtual DOM:** describe UI as plain JavaScript objects.
- **Declarative rendering:** create elements with `h()`.
- **Efficient updates:** `render()` mounts once and uses `patch()` on later renders.
- **Shared state:** a `State` store with subscriptions and batched notifications.
- **Custom event API:** handlers are declared as `onClick`, `onInput`, `onChange`, `onSubmit`, `onKeyDown`, `onKeyUp`, and `onDblClick`.
- **Client-side routing:** hash routes such as `#/`, `#/active`, and `#/completed`.
- **TodoMVC:** a working application built entirely with the framework.

## Project structure

```text
.
├── index.html                  # Root entry point; open this to run the app
├── package.json                # Start scripts; no runtime dependencies
├── README.md                   # This documentation
└── src/
    ├── framework/
    │   ├── dom/
    │   │   ├── h.js            # Creates virtual nodes
    │   │   ├── normalize.js    # Normalizes children
    │   │   ├── createDom.js    # Virtual node -> real DOM node
    │   │   ├── setProp.js      # Applies attributes, properties, and events
    │   │   ├── patch.js        # Compares old and new virtual trees
    │   │   └── render.js       # Public mount/update API
    │   ├── events/index.js     # Custom event API and cleanup helpers
    │   ├── router/index.js     # Hash-based router
    │   ├── state/index.js      # Shared state store
    │   ├── index.js            # Public framework entry point
    │   └── README.md           # Short pointer to this document
    ├── todomvc/
    │   ├── app.js              # TodoMVC application
    │   └── styles.css          # TodoMVC styles
    └── docs/README.md          # Documentation pointer
```

## Requirements and running the project

There are no runtime dependencies and no build step. You only need a modern browser and a static file server.

From the repository root:

```bash
npm start
```

Then open:

```text
http://localhost:8080/
```

`npm start` runs `python3 -m http.server 8080`. If you prefer, run the server directly:

```bash
python3 -m http.server 8080
```

Do not open the HTML files with a `file://` URL. JavaScript modules require an HTTP server.

## Quick start

Import the framework through its public entry point:

```javascript
import { h, render, State, createRouter } from "./src/framework/index.js";

const app = document.querySelector("#app");

const view = h(
  "div",
  { class: "greeting" },
  h("h1", {}, "Hello, framework!"),
  h("p", {}, "This UI was described with JavaScript.")
);

render(view, app);
```

`h()` creates a virtual node. `render()` converts it to real DOM and mounts it in the container.

## Creating elements

The element factory has this signature:

```javascript
h(type, props, ...children)
```

| Parameter | Meaning |
|---|---|
| `type` | A non-empty HTML tag name, such as `"div"`, `"button"`, or `"input"`. |
| `props` | A plain object of attributes, properties, and event handlers. Use `{}` or `null` when there are none. |
| `children` | Strings, numbers, virtual nodes, or nested arrays of those values. |

Example:

```javascript
const title = h("h1", { class: "title" }, "My first element");
```

The returned virtual node has this shape:

```javascript
{
  type: "h1",
  props: { class: "title" },
  children: ["My first element"]
}
```

`h()` does not create a real DOM node. It only describes one. `createDom()` and `render()` are responsible for the real DOM.

Children are normalized automatically:

- nested arrays are flattened;
- `null`, `undefined`, and boolean children are ignored;
- numbers become strings;
- text is inserted with `document.createTextNode()`, not `innerHTML`.

This means user-provided text is treated as text and cannot inject HTML.

## Adding attributes and properties

Pass attributes in the `props` object:

```javascript
h(
  "input",
  {
    class: "field",
    id: "name",
    type: "text",
    placeholder: "Insert your name",
    value: "Ada"
  }
);
```

The framework handles:

- normal attributes such as `class`, `id`, `type`, `placeholder`, and `title`;
- live form properties such as `value`, `checked`, and `selected`;
- boolean attributes such as `disabled`, `hidden`, and `autofocus`.

A boolean value of `true` sets the attribute. `false`, `null`, or `undefined` removes it:

```javascript
h("button", { disabled: true }, "Cannot click");
h("button", { disabled: false }, "Can click");
```

When an attribute changes between renders, `patch()` updates it. When an attribute is removed, it is removed from the real DOM.

## Nesting elements

Children can be passed directly or as nested arrays:

```javascript
const card = h(
  "div",
  { class: "card" },
  h("h2", {}, "Product"),
  h("p", {}, "Product description"),
  h(
    "ul",
    { class: "features" },
    h("li", {}, "Fast"),
    h("li", {}, "Small"),
    h("li", {}, "Dependency-free")
  )
);
```

Nested arrays are flattened:

```javascript
h("ul", {}, [
  h("li", {}, "One"),
  h("li", {}, "Two"),
  [h("li", {}, "Three"), h("li", {}, "Four")]
]);
```

The result is a single flat list of `li` children.

## Handling events

Event handlers are declared in `props` using the framework's custom event names:

```javascript
h(
  "button",
  {
    onClick: (event) => {
      console.log("Clicked", event.target);
    }
  },
  "Click me"
);
```

Supported event props:

| Framework prop | Native event |
|---|---|
| `onClick` | `click` |
| `onInput` | `input` |
| `onChange` | `change` |
| `onKeyDown` | `keydown` |
| `onKeyUp` | `keyup` |
| `onSubmit` | `submit` |
| `onDblClick` | `dblclick` |
| `onBlur` | `blur` |
| `onFocus` | `focus` |

The callback receives the native browser event, so you can call `event.preventDefault()` and read `event.target`, `event.key`, and so on.

Examples:

```javascript
h("input", {
  class: "search",
  onInput: (event) => {
    console.log(event.target.value);
  }
});

h("form", {
  onSubmit: (event) => {
    event.preventDefault();
    console.log("Submitted");
  }
}, h("button", {}, "Submit"));

h("label", {
  onDblClick: () => console.log("Edit this item")
}, "Double-click me");
```

The framework registers native listeners internally with `addEventListener()`. Application code should use the custom props instead of calling `addEventListener()` directly.

There is also a keyboard helper:

```javascript
import { handleKey } from "./src/framework/index.js";

h("input", {
  onKeyDown: (event) => {
    handleKey(
      event,
      () => console.log("Enter pressed"),
      () => console.log("Escape pressed")
    );
  }
});
```

## Shared state

Create a store with `new State(initialState)`:

```javascript
import { State } from "./src/framework/index.js";

const store = new State({
  todos: [],
  filter: "all"
});
```

Read the current state:

```javascript
const state = store.getState();
```

Update the state with an object:

```javascript
store.setState({ filter: "active" });
```

Or with a function that receives the current state and returns a patch:

```javascript
store.setState((state) => ({
  todos: [...state.todos, { id: 1, title: "New todo", completed: false }]
}));
```

`setState()` performs a **shallow merge**. It does not replace the whole state object. Update arrays and nested objects immutably:

```javascript
// Correct: create a new array.
store.setState({
  todos: state.todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
});

// Avoid: mutating the existing array in place.
state.todos.push(newTodo);
```

Subscribe to changes:

```javascript
const unsubscribe = store.subscribe((nextState, version) => {
  console.log("State changed:", nextState, version);
});

// Later:
unsubscribe();
```

Subscribers run after a valid update. By default, notifications are batched into a microtask, so multiple updates in one event produce one render. You can choose a different strategy:

```javascript
new State(initialState, { batch: "microtask" }); // default
new State(initialState, { batch: "sync" });      // notify immediately
new State(initialState, { batch: "raf" });       // notify on next animation frame
```

The state store does not render automatically. Connect it to the renderer once:

```javascript
function renderApp() {
  const { count } = store.getState();

  render(
    h(
      "div",
      { class: "counter" },
      h("p", {}, `Count: ${count}`),
      h("button", {
        onClick: () => store.setState((state) => ({ count: state.count + 1 }))
      }, "Increment")
    ),
    app
  );
}

store.subscribe(renderApp);
renderApp();
```

Subscribe once, outside the render function. Subscribing inside a render creates duplicate subscriptions.

## Routing

The router is hash-based. Create it with a map of paths to callbacks:

```javascript
import { createRouter } from "./src/framework/index.js";

const router = createRouter({
  "/": () => showAll(),
  "/active": () => showActive(),
  "/completed": () => showCompleted()
});

router.start();
```

- `start()` listens for `hashchange` and runs the callback for the current URL.
- `navigate(path)` changes the hash, for example `router.navigate("/active")`.
- Unknown routes fall back to the `"/"` route.

URLs look like this:

```text
http://localhost:8080/#/
http://localhost:8080/#/active
http://localhost:8080/#/completed
```

A filter link can use the framework event API and the router together:

```javascript
h("a", {
  href: "#/active",
  class: filter === "active" ? "selected" : "",
  onClick: (event) => {
    event.preventDefault();
    router.navigate("/active");
  }
}, "Active");
```

Because the router listens to `hashchange`, browser Back and Forward work, and reloading a filtered URL restores the filter.

## How the framework works

The rendering pipeline is:

```text
h() -> virtual node tree -> normalizeChildren() -> createDom() -> real DOM
                                                       |
                                          later render: patch(old, new)
```

1. **`h()`** builds a virtual node `{ type, props, children }`.
2. **`normalizeChildren()`** flattens arrays, removes empty values, and converts numbers to strings.
3. **`createDom()`** creates real elements and text nodes recursively. Attributes, properties, and events are applied through `setProp()`.
4. **`render(vnode, container)`** mounts the tree on the first call. On later calls it retrieves the previous virtual tree for that container and calls `patch()`.
5. **`patch()`** compares old and new nodes:
   - different types are replaced;
   - text changes update the existing text node;
   - changed props are applied;
   - removed props are cleared;
   - children are patched recursively;
   - extra children are removed;
   - new children are appended.
6. **`State`** stores application data and notifies subscribers after valid updates.
7. **Event props** such as `onClick` are translated to native events and registered internally.
8. **`createRouter`** synchronizes the URL hash with application state.

### Why this design?

- A virtual tree makes UI a value that can be compared instead of manually edited.
- Patching avoids replacing the entire DOM on every state change.
- A single shared store keeps multiple UI areas consistent.
- A custom event API hides listener management and prevents duplicate registrations.
- Hash routing works without server-side rewrite rules, so the project runs from any static file server.

### Current reconciliation approach

The patcher uses positional child matching. It works well for appending, removing, and updating items in place. It does not implement keyed reconciliation, so it is not optimized for arbitrary list reordering.

## API reference

### `h(type, props, ...children)`

Creates a virtual node.

```javascript
const node = h("p", { class: "text" }, "Hello");
```

Throws `TypeError` if `type` is not a non-empty string or if `props` is not a plain object, `null`, or `undefined`.

### `normalizeChildren(children)`

Normalizes an array of children. Returns a flat array with strings, numbers converted to strings, and virtual nodes.

### `createDom(vnode)`

Creates a real DOM node from a virtual node. Primarily used internally by `render()` and `patch()`.

### `render(vnode, container)`

Mounts or updates a virtual tree in a DOM container.

```javascript
render(h("div", {}, "Hello"), document.querySelector("#app"));
```

- `container` must be a DOM `Element`.
- `vnode` must be a virtual node object.
- The first call replaces the container's current children.
- Later calls patch the existing tree.
- Returns `undefined`.

### `patch(oldVNode, newVNode, container)`

Compares two virtual trees and updates the container. Used internally by `render()`.

### `State(initialState, options)`

Creates a shared state store.

Options:

- `batch`: `"microtask"` (default), `"sync"`, or `"raf"`.

Methods:

- `getState()` returns the current state.
- `setState(update)` accepts an object patch or a function returning an object patch. Returns nothing.
- `subscribe(listener)` registers a listener and returns an unsubscribe function. The listener receives `(state, version)`.

### `createRouter(routes)`

Creates a hash router.

- `routes` is an object whose keys are paths and whose values are callbacks.
- `start()` begins listening for hash changes and runs the current route.
- `navigate(path)` changes the URL hash.

### Event helpers

- `addEvent(element, propName, handler)` registers a custom event prop. If `handler` is not a function, it removes the existing listener for that prop.
- `removeEvent(element, propName)` removes one stored listener from an element.
- `removeEvents(element)` removes all stored listeners from an element.
- `handleKey(event, onEnter, onEscape)` runs a callback for Enter or Escape.

## TodoMVC

The TodoMVC app is in `src/todomvc/app.js`. It uses only the framework APIs:

- `h()` for the entire UI;
- `render()` for mounting and patching;
- `State` for todos, draft text, filter, and editing state;
- `createRouter()` for `#/`, `#/active`, and `#/completed`;
- `onSubmit`, `onClick`, `onChange`, `onInput`, `onKeyDown`, and `onDblClick` for interactions.

Implemented behavior:

- add a todo with Enter;
- clear the input after adding;
- toggle a todo;
- delete a todo;
- double-click to edit;
- Enter saves an edit;
- clicking away saves an edit;
- Escape cancels an edit;
- All / Active / Completed filters;
- URL changes for Active and Completed;
- remaining-items counter;
- footer and main-section visibility;
- toggle-all;
- clear completed.

State shape:

```javascript
{
  todos: [
    { id: "todo-1", title: "Buy milk", completed: false }
  ],
  draft: "",
  filter: "all",          // "all" | "active" | "completed"
  editingId: null,
  editTitle: ""
}
```

## Manual audit checklist

Run the app from the repository root, then verify:

- [ ] The page loads at `http://localhost:8080/`.
- [ ] The TodoMVC header, new-todo input, main section, list, footer, filters, and info footer are visible.
- [ ] The DOM contains `.todoapp`, `.header`, `.new-todo`, `.main`, `.toggle-all`, `.todo-list`, `.footer`, `.todo-count`, `.filters`, `.clear-completed`, and the expected item classes.
- [ ] Adding a todo with Enter adds it and clears the input.
- [ ] The footer appears after the first todo.
- [ ] Checking and unchecking a todo works and adds/removes the `completed` class.
- [ ] Deleting a todo removes it.
- [ ] The remaining-items count updates correctly and uses singular/plural wording.
- [ ] Active shows only unchecked todos.
- [ ] Completed shows only checked todos.
- [ ] Active and Completed change the URL hash.
- [ ] Reloading a filtered URL restores the filter.
- [ ] Browser Back and Forward change the filter.
- [ ] Clear completed removes only completed todos.
- [ ] Toggle-all marks every todo complete or incomplete.
- [ ] Double-clicking a todo opens the edit input.
- [ ] Enter saves an edit; clicking away saves it; Escape cancels it.
- [ ] Editing to an empty title removes the todo.
- [ ] The app uses no React, Vue, Angular, or similar library.

## Known limitations

- No keyed reconciliation; child matching is positional.
- No component functions, hooks, or lifecycle methods.
- The event map is intentionally small. Add new event props in `src/framework/events/index.js` if needed.
- Routing is hash-based; there is no History API mode.
- `render()` keeps one previous virtual tree per container. Do not manually replace the container's children after the first render.
- No server-side rendering, fragments, portals, or SVG namespace handling.
- The framework is educational and not a production replacement for mature UI frameworks.
