export default function addprop(vnode, element) {
  console.log(vnode.props);

  for (const [key, value] of Object.entries(vnode.props)) {
    if (typeof value == "function") {
      element.addEventListener(key, value);
      continue;
    }

    if (value === null || typeof value === "undefined") {
      continue;
    }
    element.setAttribute(key, value);
  }

  return element;
}
