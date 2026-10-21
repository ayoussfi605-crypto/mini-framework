export default function addprop(vnode, element) {
  if (!vnode.props) return element;

  element.__miniEvents ??= {};

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
      if (typeof value !== "function") continue;

      const eventName = key.startsWith("on") ? key.slice(2).toLowerCase() : key;

      element.addEventListener(eventName, value);
      element.__miniEvents[eventName] = value;
      continue;
    }

    if (value == null || value === false) continue;

    if (value === true) {
      element.setAttribute(key, "");
    } else {
      element.setAttribute(key, String(value));
    }
  }

  return element;
}
