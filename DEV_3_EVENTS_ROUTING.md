# Developer 3 — Custom Event Handling and Routing === -> ayoub

## Mission
Create the framework's custom event API and a simple client-side routing system. Developers using the framework should not need to call native `addEventListener()` directly.

## Suggested API
Agree on the final API with the team before implementation:
```js
h("button", {
  onClick: () => doSomething(),
  onKeyDown: event => handleKey(event)
}, "Click me");

const router = createRouter({
  "/": HomeView,
  "/about": AboutView
});
router.navigate("/about");
router.start();
```

## Part A — Event handling

1. Define supported event names, for example `onClick`, `onInput`, `onChange`, `onKeyDown`, and `onSubmit`.
2. Decide how callbacks receive the event and how they can prevent default browser behavior.
3. Register events internally using native browser event facilities where appropriate, while keeping those details hidden from framework users.
4. Ensure changed handlers are replaced correctly and removed elements no longer respond.
5. Prevent duplicate event registrations after repeated renders.
6. Support the events TodoMVC needs: submit to add, input while typing/editing, toggle, delete, filter, clear completed, double-click to edit, and Enter/Escape keyboard behavior.
7. Test that each action fires once, updated handlers run, and removed elements no longer respond.

## Part B — Routing

1. Choose a URL strategy with the team: History API (`pushState`/`popstate`) or hash-based routing.
2. Map paths to views or route callbacks and define default/unknown-route behavior.
3. Implement a framework navigation method such as `navigate(path)`.
4. Ensure navigation updates the URL and the app's visible filter/view.
5. Handle browser Back and Forward.
6. Coordinate with Developer 2 so URL state and application state stay synchronized.
7. Test direct loading, Active/Completed filters, Back/Forward, and reloading a filtered URL.

## Learn and understand
- Browser events, event objects, bubbling, keyboard events, and form submission.
- Why a framework exposes a consistent event API.
- Event cleanup and duplicate-listener bugs.
- URL paths or hashes and browser History API behavior.
- Synchronizing URL state with application state.

## Deliverables
- Custom event module integrated with the renderer.
- Router module with a documented public API.
- Tests or repeatable manual checks.
- Examples and explanations for framework documentation.

## Definition of done
- [ ] Users define events through the framework API without directly using `addEventListener()`.
- [ ] TodoMVC-required events, including double-click and keyboard actions, work.
- [ ] Rerendering does not cause duplicate event execution.
- [ ] Active and Completed filters update the URL.
- [ ] Direct URL loading and Back/Forward work correctly.
- [ ] Event and routing APIs are documented.
