# Developer 2 — State Management and UI Reactivity === -> hicham

## Mission
Implement state management so application data can be changed through a clear API and the UI can respond to those changes. State must be accessible to multiple UI areas when needed.

## Responsibilities
- Create, read, and update state.
- Notify subscribers predictably.
- Connect state changes to the rendering module from Developer 1.

Suggested API (agree on final names and behavior with the team):
```js
const store = createStore({ items: [], filter: "all" });

store.getState();
store.setState(state => ({ ...state, filter: "active" }));

const unsubscribe = store.subscribe((nextState, previousState) => {
  // Update or coordinate the application view.
});
```

## Step-by-step tasks
1. Agree on the state contract. Define how the store is created, read, updated, and observed. Decide whether updates accept objects, callbacks, or both.
2. Implement a store with methods such as `getState`, `setState`, and `subscribe`.
3. Return an unsubscribe function from each subscription so listeners can be removed.
4. Notify subscribers after valid updates. Avoid needless notifications where practical.
5. Document whether updates replace or merge state, and establish a consistent update style to avoid accidental mutation.
6. Coordinate with Developer 1 on how state changes trigger rendering. Avoid creating duplicate subscriptions on each render.
7. Support shared state so multiple UI areas reflect the same change.
8. Test initial state, updates, notifications, unsubscription, UI reactivity, todo filters, and the remaining-items counter.

## Learn and understand
- Application state versus DOM state.
- Subscriptions and unidirectional data flow.
- Immutable update patterns.
- How state changes trigger a view update.
- Cleanup and prevention of duplicate subscriptions or memory leaks.

## Deliverables
- State/store module with a defined public API.
- Tests or repeatable manual checks.
- API examples and explanations for the documentation owner.
- Working integration with rendering and TodoMVC.

## Definition of done
- [ ] State can be created, read, and updated through the framework API.
- [ ] Subscribers are notified and can unsubscribe.
- [ ] UI responds to state changes through the rendering integration.
- [ ] Multiple UI areas can share state.
- [ ] TodoMVC uses state for todos, completion, filters, and the remaining count.
- [ ] The API and update rules are documented.
