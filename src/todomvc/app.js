import {createDom} from "../framework/dom/createDom.js";
import {h} from "../framework/dom/h.js";
import { addEvent } from '../framework/events/index.js';

const element = createDom(h("div", {}, [h("div", {}, [h("h1", {"id" :"main"}, "heloo")])]));
console.log(element);

document.getElementById("app").appendChild(element);


const btn = document.createElement('button');
btn.textContent = 'Test me';

addEvent(btn, 'onClick', () => {
  alert('Event API work 100%!');
});

document.getElementById("app").appendChild(btn);