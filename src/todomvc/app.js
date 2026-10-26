import { h, render, State } from "../framework/index.js";

const app = document.querySelector("#app");

if (!app) {
  throw new Error('TodoMVC: missing root element with id="app"');
}

const store = new State({
  todos: [],
  draft: "",
});

let nextId = 0;

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
  const { todos } = store.getState();

  store.setState({
    todos: todos.filter((todo) => todo.id !== id),
  });
}

function todoItem(todo) {
  return h(
    "li",
    {
      class: todo.completed ? "completed" : "",
      "data-id": todo.id,
    },
    h(
      "div",
      { class: "view" },
      h("input", {
        class: "toggle",
        type: "checkbox",
        checked: todo.completed,
        onChange: () => toggleTodo(todo.id),
      }),
      h("label", {}, todo.title),
      h("button", {
        class: "destroy",
        onClick: () => deleteTodo(todo.id),
      })
    )
  );
}

function view() {
  const { todos, draft } = store.getState();

  return h(
    "section",
    { class: "todoapp" },
    h(
      "header",
      { class: "header" },
      h("h1", {}, "todos"),
      h(
        "form",
        {
          onSubmit: (event) => {
            event.preventDefault();
            addTodo(store.getState().draft);
          },
        },
        h("input", {
          class: "new-todo",
          placeholder: "What needs to be done?",
          autofocus: true,
          value: draft,
          onInput: (event) => store.setState({ draft: event.target.value }),
        })
      )
    ),
    h(
      "section",
      {
        class: "main",
        hidden: todos.length === 0,
      },
      h(
        "ul",
        { class: "todo-list" },
        todos.map((todo) => todoItem(todo))
      )
    )
  );
}

function renderApp() {
  render(view(), app);
}

store.subscribe(renderApp);
renderApp();
