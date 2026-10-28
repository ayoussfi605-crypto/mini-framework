import { h, render, State, createRouter } from "../framework/index.js";

const app = document.querySelector("#app");

if (!app) {
  throw new Error('TodoMVC: missing root element with id="app"');
}

function filterFromPath(path) {
  if (path === "/active") return "active";
  if (path === "/completed") return "completed";
  return "all";
}

function currentPath() {
  return window.location.hash.slice(1) || "/";
}

const store = new State({
  todos: [],
  draft: "",
  filter: filterFromPath(currentPath()),
  editingId: null,
  editTitle: "",
});

let nextId = 0;
let shouldFocusEditor = false;

function createId() {
  nextId += 1;
  return `todo-${nextId}`;
}

function addTodo(title) {
  const text = title.trim();

  if (!text) return;

  const { todos } = store.getState();

  store.setState({
    todos: [
      ...todos,
      {
        id: createId(),
        title: text,
        completed: false,
      },
    ],
    draft: "",
  });
}

function toggleTodo(id) {
  const { todos } = store.getState();

  store.setState({
    todos: todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  });
}

function deleteTodo(id) {
  const state = store.getState();

  store.setState({
    todos: state.todos.filter((todo) => todo.id !== id),
    editingId: state.editingId === id ? null : state.editingId,
    editTitle: state.editingId === id ? "" : state.editTitle,
  });
}

function toggleAll() {
  const { todos } = store.getState();
  const allCompleted = todos.length > 0 && todos.every((todo) => todo.completed);

  store.setState({
    todos: todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    })),
  });
}

function clearCompleted() {
  const state = store.getState();

  store.setState({
    todos: state.todos.filter((todo) => !todo.completed),
    editingId: null,
    editTitle: "",
  });
}

function startEditing(id) {
  const todo = store.getState().todos.find((item) => item.id === id);

  if (!todo) return;

  shouldFocusEditor = true;
  store.setState({
    editingId: id,
    editTitle: todo.title,
  });
}

function commitEdit(id) {
  const { todos, editTitle } = store.getState();
  const title = editTitle.trim();

  if (!title) {
    store.setState({
      todos: todos.filter((todo) => todo.id !== id),
      editingId: null,
      editTitle: "",
    });
    return;
  }

  store.setState({
    todos: todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    ),
    editingId: null,
    editTitle: "",
  });
}

function cancelEdit() {
  store.setState({
    editingId: null,
    editTitle: "",
  });
}

function setFilter(filter) {
  if (store.getState().filter !== filter) {
    store.setState({
      filter,
      editingId: null,
      editTitle: "",
    });
  }
}

const router = createRouter({
  "/": () => setFilter("all"),
  "/active": () => setFilter("active"),
  "/completed": () => setFilter("completed"),
});

function filterLink(label, path, filter, activeFilter) {
  return h(
    "li",
    {},
    h(
      "a",
      {
        href: `#${path}`,
        class: activeFilter === filter ? "selected" : "",
        onClick: (event) => {
          event.preventDefault();
          router.navigate(path);
        },
      },
      label
    )
  );
}

function todoItem(todo, editingId) {
  const classes = [];

  if (todo.completed) classes.push("completed");
  if (editingId === todo.id) classes.push("editing");

  return h(
    "li",
    {
      class: classes.join(" "),
      "data-testid": "todo-item",
    },
    h(
      "div",
      { class: "view" },
      h("input", {
        class: "toggle",
        type: "checkbox",
        "data-testid": "todo-item-toggle",
        checked: todo.completed,
        onChange: () => toggleTodo(todo.id),
      }),
      h(
        "label",
        {
          "data-testid": "todo-item-label",
          onDblClick: () => startEditing(todo.id),
        },
        todo.title
      ),
      h("button", {
        class: "destroy",
        "data-testid": "todo-item-button",
        "aria-label": "Delete todo",
        onClick: () => deleteTodo(todo.id),
      })
    ),
    editingId === todo.id
      ? h("input", {
          class: "edit",
          type: "text",
          "data-testid": "text-input",
          "aria-label": "Edit todo",
          value: store.getState().editTitle,
          onInput: (event) =>
            store.setState({ editTitle: event.target.value }),
          onKeyDown: (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commitEdit(todo.id);
            } else if (event.key === "Escape") {
              event.preventDefault();
              cancelEdit();
            }
          },
          onBlur: () => {
            if (store.getState().editingId === todo.id) {
              commitEdit(todo.id);
            }
          },
        })
      : null
  );
}

function view() {
  const { todos, draft, filter, editingId } = store.getState();

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completed = todos.length - remaining;
  const allCompleted = todos.length > 0 && completed === todos.length;

  return h(
    "section",
    { class: "todoapp", id: "root" },
    h(
      "header",
      { class: "header", "data-testid": "header" },
      h("h1", {}, "todos"),
      h("input", {
        class: "new-todo",
        type: "text",
        "data-testid": "text-input",
        "aria-label": "New Todo Input",
        placeholder: "What needs to be done?",
        autofocus: true,
        value: draft,
        onInput: (event) => store.setState({ draft: event.target.value }),
        onKeyDown: (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addTodo(store.getState().draft);
          }
        },
      })
    ),
    h(
      "main",
      {
        class: "main",
        "data-testid": "main",
        hidden: todos.length === 0,
      },
      h(
        "div",
        { class: "toggle-all-container" },
        h("input", {
          class: "toggle-all",
          id: "toggle-all",
          type: "checkbox",
          "data-testid": "toggle-all",
          checked: allCompleted,
          onChange: toggleAll,
        }),
        h(
          "label",
          { class: "toggle-all-label", for: "toggle-all" },
          "Toggle All Input"
        )
      ),
      h(
        "ul",
        { class: "todo-list", "data-testid": "todo-list" },
        visibleTodos.map((todo) => todoItem(todo, editingId))
      )
    ),
    h(
      "footer",
      {
        class: "footer",
        "data-testid": "footer",
        hidden: todos.length === 0,
      },
      h(
        "span",
        { class: "todo-count" },
        `${remaining} ${remaining === 1 ? "item" : "items"} left!`
      ),
      h(
        "ul",
        { class: "filters", "data-testid": "footer-navigation" },
        filterLink("All", "/", "all", filter),
        filterLink("Active", "/active", "active", filter),
        filterLink("Completed", "/completed", "completed", filter)
      ),
      h(
        "button",
        {
          class: "clear-completed",
          hidden: completed === 0,
          onClick: clearCompleted,
        },
        "Clear completed"
      )
    )
  );
}

function renderApp() {
  render(view(), app);

  if (shouldFocusEditor) {
    shouldFocusEditor = false;

    requestAnimationFrame(() => {
      const editor = app.querySelector(".editing .edit");

      if (editor) {
        editor.focus();
        editor.setSelectionRange(editor.value.length, editor.value.length);
      }
    });
  }
}

store.subscribe(renderApp);
renderApp();
router.start();
