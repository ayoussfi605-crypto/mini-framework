# TodoMVC Audit Report

**Date:** 2026-10-26  
**Application:** Mini Framework TodoMVC  
**Entry point:** `http://localhost:8080/`  
**Run command:** `npm start` from the repository root

## Environment

- Node.js: `v22.22.1`
- Static server: `python3 -m http.server 8080`
- Browser: Chromium-based browser through the development tooling
- Framework: local `src/framework/` implementation
- UI dependencies: none

## Result

All mandatory functional checks passed.

| Check | Result |
|---|---|
| Framework does not use React, Vue, Angular, or similar | Pass |
| Documentation is Markdown | Pass — `README.md` |
| Documentation has a feature overview | Pass |
| Documentation explains creating elements, attributes, nesting, and events | Pass |
| Documentation explains how the framework works | Pass |
| TodoMVC contains the expected elements, classes, and IDs | Pass |
| Add a todo with Enter | Pass |
| Clear the new-todo input after adding | Pass |
| Footer appears after the first todo | Pass |
| Toggle a todo complete/incomplete | Pass |
| Delete a todo | Pass |
| Active filter shows only unchecked todos | Pass |
| Completed filter shows only checked todos | Pass |
| Clear completed removes only completed todos | Pass |
| Active and Completed change the URL | Pass — `#/active`, `#/completed` |
| Remaining-items counter updates | Pass — singular and plural wording |
| Double-click opens the edit input | Pass |
| Enter saves an edit | Pass |
| Clicking away saves an edit | Pass |
| Escape cancels an edit | Pass |
| Editing to an empty title removes the todo | Pass |
| Toggle-all marks every todo complete/incomplete | Pass |
| Reload restores the filter from the URL | Pass |
| Browser Back/Forward changes the filter | Pass |
| No console errors during the test run | Pass |

## Automated interaction checks

The following interactions were exercised through the browser:

1. Added three todos and confirmed the count and footer.
2. Toggled one todo and confirmed the `completed` class and count.
3. Switched between All, Active, and Completed and confirmed the URL hash.
4. Used browser Back and Forward and confirmed the filter and visible items.
5. Edited a todo with Enter.
6. Edited a todo and saved it on blur.
7. Cancelled an edit with Escape.
8. Saved an empty edit and confirmed the todo was removed.
9. Used toggle-all in both directions.
10. Cleared completed todos.
11. Deleted the final todo and confirmed `.main` and `.footer` were hidden.
12. Reloaded `#/active` and confirmed the Active filter was restored.

## DOM checks

The rendered DOM contains:

- `.todoapp`
- `.header`
- `h1`
- `.new-todo`
- `.main`
- `#toggle-all.toggle-all`
- `.todo-list`
- `li` with `.view`, `.toggle`, `label`, and `.destroy`
- `.edit` while editing
- `.completed` on completed items
- `.editing` on the item being edited
- `.footer`
- `.todo-count`
- `.filters` and `.selected`
- `.clear-completed` when completed items exist
- `footer.info` with the TodoMVC information links

## Known limitations

- Todos are stored in memory. Reloading the page resets the todo list; the selected filter is restored from the URL hash.
- Child reconciliation is positional; there is no keyed reconciliation.
- Routing is hash-based rather than History API based.
- The framework has no component/lifecycle system.
- The event map is intentionally small and lives in `src/framework/events/index.js`.
