import { addEvent } from "../events/index.js";

export default function addprop(vnode, element) {
  if (!vnode.props) return element;

  for (const [key, value] of Object.entries(vnode.props)) {
    if (key === "key") continue;

    const isEvent =
      key.startsWith("on") ||
      [
        "click",
        "dblclick",
        "input",
        "change",
        "submit",
        "keydown",
        "keyup",
        "focus",
        "blur",
      ].includes(key);

    if (isEvent) {
      const eventName = key.startsWith("on") ? key.slice(2).toLowerCase() : key;

      if (typeof value !== "function") continue;

      const previousHandler = element.__miniEvents[eventName];

      if (previousHandler) {
        element.removeEventListener(eventName, previousHandler);
      }

      element.addEventListener(eventName, value);
      element.__miniEvents[eventName] = value;
      continue;
    }

    // Handle live form properties.
    if (key === "value" && "value" in element) {
      element.value = value == null ? "" : String(value);
      continue;
    }

    if (key === "checked" && "checked" in element) {
      element.checked = Boolean(value);
      continue;
    }

    if (key === "selected" && "selected" in element) {
      element.selected = Boolean(value);
      continue;
    }

    if (value == null || value === false) {
      element.removeAttribute(key);
      continue;
    }

    if (value === true) {
      element.setAttribute(key, "");
    } else {
      element.setAttribute(key, String(value));
    }
  }

  return element;
}