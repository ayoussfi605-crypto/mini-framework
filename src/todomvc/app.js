import {createDom} from "../framework/dom/createDom.js";
import {h} from "../framework/dom/h.js";
import { addEvent } from '../framework/events/index.js';
import { createRouter } from '../framework/router/index.js';

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


const btn = document.createElement('button');
btn.textContent = 'Test me';

const btn = document.createElement('button');
document.getElementById("app").appendChild(btn);


btn.textContent = 'Test Duplicate Fix';
addEvent(btn, 'onClick', () => console.log('Clicked!'));
addEvent(btn, 'onClick', () => console.log('Clicked!'));

// addEvent(btn, 'onClick', () => {
//   alert('Event API work 100%!');
// });


// Define routes and their actions
const router = createRouter({
  '/': () => console.log('View: All Todos'),
  '/active': () => console.log('View: Active Todos'),
  '/completed': () => console.log('View: Completed Todos')
});

// Start listening to URL changes
router.start();

// Test navigation manually in console or with buttons:
// router.navigate('/active');

document.getElementById("app").appendChild(btn);