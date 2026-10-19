import createDom from "../framework/dom/createDom.js";
import h from "../framework/dom/h.js";

const element = createDom(h("div", {}, [h("div", {}, [h("h1", {"id" :"main"}, "heloo")])]));
console.log(element);

document.getElementById("app").appendChild(element);
