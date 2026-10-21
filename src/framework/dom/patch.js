function updateDOM($parent, vNew, vOld, index = 0) {
  const $currentChild = $parent.childNodes[index];

  if (!vNew) {
    $parent.removeChild($currentChild);
    return;
  }

  if (!vOld) {
    $parent.appendChild(createElement(vNew));
    return;
  }

  if (
    typeof vNew !== typeof vOld ||
    (typeof vNew === "string" && vNew !== vOld) ||
    vNew.type !== vOld.type
  ) {
    $parent.replaceChild(createElement(vNew), $currentChild);
    return;
  }

  if (vNew.type) {
    const patchProps = { ...vOld.props, ...vNew.props };
    for (const key in patchProps) {
      const oldVal = vOld.props[key];
      const newVal = vNew.props[key];
      if (!newVal) {
        $currentChild.removeAttribute(key);
      } else if (oldVal !== newVal) {
        $currentChild.setAttribute(key, newVal);
      }
    }

    const maxLen = Math.max(vNew.children.length, vOld.children.length);
    for (let i = 0; i < maxLen; i++) {
      updateDOM($currentChild, vNew.children[i], vOld.children[i], i);
    }
  }
}
