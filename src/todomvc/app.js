import render from "../framework/dom/render.js";
import State from "../framework/state/index.js";
import h from "../framework/dom/h.js";

const state = new State({ count: 0 });
const app = document.getElementById("app");

function renderApp() {
  const { count } = state.getState();

  const vnode = h("div", { class: "main" }, [
    h("h1", {}, `The counter is ${count}`),
    h(
      "button",
      {
        click: () => {
          state.setState({
            count: state.getState().count + 1,
          });
        },
      },
      "Counter ++",
    ),
  ]);

  render(vnode, app);
}

state.subscribe(renderApp);
renderApp();
