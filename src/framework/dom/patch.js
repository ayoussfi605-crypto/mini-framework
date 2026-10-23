import createDom from "./createDom.js";

function updateProps(element, oldProps = {}, newProps = {}) {
  const keys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);

  for (const key of keys) {
    const oldValue = oldProps[key];
    const newValue = newProps[key];

    if (oldValue === newValue) continue;
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

      element.__miniEvents ??= {};

      const previousHandler = element.__miniEvents[eventName];

      if (previousHandler) {
        element.removeEventListener(eventName, previousHandler);
        delete element.__miniEvents[eventName];
      }

      if (typeof newValue === "function") {
        element.addEventListener(eventName, newValue);
        element.__miniEvents[eventName] = newValue;
      }

      continue;
    }

    if (key === "value" && "value" in element) {
      const value = newValue == null ? "" : String(newValue);

      if (element.value !== value) {
        element.value = value;
      }

      continue;
    }

    if (key === "checked" && "checked" in element) {
      element.checked = Boolean(newValue);
      continue;
    }

    if (key === "selected" && "selected" in element) {
      element.selected = Boolean(newValue);
      continue;
    }

    if (newValue == null || newValue === false) {
      element.removeAttribute(key);
      continue;
    }

    if (newValue === true) {
      element.setAttribute(key, "");
      continue;
    }

    element.setAttribute(key, String(newValue));
  }
}

function updateDOM(parent, newVNode, oldVNode, index = 0) {
  const current = parent.childNodes[index];

  if (newVNode == null) {
    if (current) parent.removeChild(current);
    return;
  }

  if (oldVNode == null) {
    parent.insertBefore(createDom(newVNode), current ?? null);
    return;
  }

  const newIsPrimitive =
    typeof newVNode === "string" || typeof newVNode === "number";

  const oldIsPrimitive =
    typeof oldVNode === "string" || typeof oldVNode === "number";

  if (newIsPrimitive || oldIsPrimitive) {
    if (
      newIsPrimitive &&
      oldIsPrimitive &&
      typeof newVNode === typeof oldVNode
    ) {
      if (String(newVNode) !== String(oldVNode)) {
        current.nodeValue = String(newVNode);
      }
    } else {
      parent.replaceChild(createDom(newVNode), current);
    }

    return;
  }

  if (newVNode.type !== oldVNode.type) {
    parent.replaceChild(createDom(newVNode), current);
    return;
  }

  updateProps(current, oldVNode.props, newVNode.props);

  const oldChildren = oldVNode.children ?? [];
  const newChildren = newVNode.children ?? [];

  const sharedLength = Math.min(oldChildren.length, newChildren.length);

  for (let i = 0; i < sharedLength; i++) {
    updateDOM(current, newChildren[i], oldChildren[i], i);
  }

  for (let i = oldChildren.length - 1; i >= newChildren.length; i--) {
    current.removeChild(current.childNodes[i]);
  }
  for (let i = oldChildren.length; i < newChildren.length; i++) {
    current.appendChild(createDom(newChildren[i]));
  }
}

export default function patch(oldVNode, newVNode, container) {
  updateDOM(container, newVNode, oldVNode, 0);
}
