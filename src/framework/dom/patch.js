import createDom from "./createDom.js";

export default function updateDOM($parent, vNew, vOld, index = 0) {
  const $currentChild = $parent.childNodes[index];

  if (!vNew) {
    if ($currentChild) {
      $parent.removeChild($currentChild);
    }
    return;
  }

  if (!vOld) {
    $parent.appendChild(createDom(vNew)); // Fixed: createElement -> createDom
    return;
  }

  if (
    typeof vNew !== typeof vOld ||
    (typeof vNew === "string" && vNew !== vOld) ||
    (typeof vNew === "number" && vNew !== vOld) ||
    vNew.type !== vOld.type
  ) {
    $parent.replaceChild(createDom(vNew), $currentChild); // Fixed: createElement -> createDom
    return;
  }

  // If it's a VNode element node
  if (vNew.type) {
    const oldProps = vOld.props || {};
    const newProps = vNew.props || {};
    const patchProps = { ...oldProps, ...newProps };

    for (const key in patchProps) {
      const oldVal = oldProps[key];
      const newVal = newProps[key];

      if (newVal === undefined || newVal === null) {
        $currentChild.removeAttribute(key);
      } else if (typeof newVal === "function") {
        // Handle event listeners updates if needed, or re-attach
        if (oldVal !== newVal) {
          if (oldVal) $currentChild.removeEventListener(key, oldVal);
          $currentChild.addEventListener(key, newVal);
        }
      } else if (oldVal !== newVal) {
        $currentChild.setAttribute(key, newVal);
      }
    }

    const vNewChildren = vNew.children || [];
    const vOldChildren = vOld.children || [];
    const maxLen = Math.max(vNewChildren.length, vOldChildren.length);

    for (let i = 0; i < maxLen; i++) {
      updateDOM($currentChild, vNewChildren[i], vOldChildren[i], i);
    }
  }
}
