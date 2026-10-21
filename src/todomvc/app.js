import createDom from "../framework/dom/createDom.js";
import h from "../framework/dom/h.js";

const element = createDom(
  h(
    "button",
    {
      class: "btn",
      click: () => {
        console.log("Button clicked!");
      },
    },
    "Click me",
  ),
);
console.log(element);

document.getElementById("app").appendChild(element);
