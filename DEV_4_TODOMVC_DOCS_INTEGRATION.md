# Developer 4 — TodoMVC, Documentation, and Integration

## Mission
Build the mandatory TodoMVC application using the team's own framework and write Markdown documentation that lets an auditor understand and use the framework. Coordinate integration and verify the mandatory checklist.

Do not use React, Vue, Angular, or another high-level framework to build the framework or TodoMVC.

## Step-by-step tasks

1. **Agree on the public APIs.** Meet with Developers 1–3 and confirm the final APIs for element creation/rendering, state, events, and routing. Get a small working example from each owner before building the app.
2. **Set up the app structure.** Keep framework code separate from the TodoMVC app. Provide root-level setup and run instructions, source files, styles, and dependency details.
3. **Build the TodoMVC structure.** Match the reference example's important elements, IDs, and classes. Include the header/title, new-todo input, main section, toggle-all control, todo list, item checkboxes, labels, destroy controls, footer, remaining count, filter links, and Clear completed control.
4. **Implement adding.** Enter a todo using the input and Enter. Clear the input after a successful add.
5. **Implement completion and deletion.** Check/uncheck a todo and delete an individual todo.
6. **Implement editing.** Double-click a label to edit. Enter saves; Escape cancels.
7. **Implement filters and routing.** Provide All, Active, and Completed. Active and Completed must update the URL, and the app must restore the selected filter from the URL.
8. **Implement the count and footer.** Update the remaining-items count correctly. Show/hide the footer and main section according to the app's state. Show Clear completed when appropriate and remove only completed items when clicked.
9. **Write `DOCUMENTATION.md` or `README.md`.** Include a feature overview, how the framework works, why it is designed this way, how to create elements, add attributes, nest elements, declare events, use shared state, register routes/navigate, and setup/run commands. Provide complete small examples with explanations.
10. **Run the mandatory audit checklist.** Start from the repository root using the documented command. Inspect the DOM in DevTools and compare required classes/IDs with TodoMVC. Test add, toggle, delete, edit, filtering, clear completed, count updates, footer visibility, URL changes, reload, and Back/Forward.
11. **Integrate and report issues.** Send reproducible problems to the relevant developer. Ensure the TodoMVC app uses framework APIs rather than bypassing them with direct DOM manipulation. Ask teammates to verify the docs match the actual API.

## Learn and understand
- TodoMVC's structure and expected interactions.
- How element creation, state, events, and routes work together.
- How to write documentation that avoids guesswork.
- How to inspect IDs/classes using browser developer tools.

## Deliverables
- Working TodoMVC app implemented with the custom framework.
- Markdown documentation.
- Root-level setup/run instructions.
- Completed mandatory acceptance checklist and a list of known limitations, if any.

## Definition of done
- [ ] No high-level framework/library is used.
- [ ] The app runs from the repository root using documented instructions.
- [ ] Required TodoMVC elements, classes, and IDs are present.
- [ ] Add, toggle, delete, edit, filter, and clear-completed behaviors work.
- [ ] Footer and remaining-items count update correctly.
- [ ] Active/Completed filters change the URL and work after reload/Back/Forward.
- [ ] Markdown docs explain the framework and include all required examples.
- [ ] The mandatory checklist has been tested.
