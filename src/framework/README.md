# Mini Framework

This folder contains the framework implementation.

The complete, up-to-date documentation is in the repository root:

- [README.md](../../README.md)

## Public entry point

Import framework APIs from `src/framework/index.js`:

```javascript
import {
  h,
  render,
  createDom,
  patch,
  normalizeChildren,
  State,
  addEvent,
  removeEvent,
  removeEvents,
  handleKey,
  createRouter
} from "./src/framework/index.js";
```

## Modules

| Module | Responsibility |
|---|---|
| `dom/h.js` | Creates virtual nodes with `h(type, props, ...children)`. |
| `dom/normalize.js` | Flattens and filters children. |
| `dom/createDom.js` | Converts virtual nodes to real DOM nodes. |
| `dom/setProp.js` | Applies attributes, form properties, and events. |
| `dom/patch.js` | Updates the real DOM from old/new virtual trees. |
| `dom/render.js` | Mounts and updates a tree in a container. |
| `state/index.js` | Shared state store with subscriptions and batching. |
| `events/index.js` | Custom event API and listener cleanup. |
| `router/index.js` | Hash-based client-side router. |

## Minimal example

```javascript
import { h, render, State } from "../framework/index.js";

const app = document.querySelector("#app");
const store = new State({ count: 0 });

function renderApp() {
  render(
    h(
      "div",
      {},
      h("p", {}, `Count: ${store.getState().count}`),
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

See the root README for the full API, event names, routing examples, TodoMVC notes, and limitations.
