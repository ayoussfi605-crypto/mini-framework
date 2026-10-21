export default function addprop(vnode, element) {
  if (!vnode.props) return element;

  for (const [key, value] of Object.entries(vnode.props)) {
    if (value === null || value === undefined) {
      continue;
    }
    element.setAttribute(key, value);
  }

  return element;
}
