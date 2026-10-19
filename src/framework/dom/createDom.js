import addprop from "./setProp";

export default function createDom(vnode) {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(vnode);
  }

  const element = document.createElement(vnode.type);

  if (vnode.props) {
    element = addprop(vnode, element);
  }

  if (vnode.children) {
    vnode.children.forEach((child) => {
      element.appendChild(createDom(child));
    });
  }

  return element;
}
