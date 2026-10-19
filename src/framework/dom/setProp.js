export default function addprop(vnode, element) {
  for (const [key, value] of Object.entries(vnode.props)) {
    element.setAttribute(key, value);
  }
  return element;
}
