function createElement(tag) {
  return document.createElement(tag);
}

function patchProps(el, key, prevValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
}

function insert(el, parent) {
  parent.append(el);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function remove(el, parent) {
  parent.removeChild(el);
}

export function mountElement(vnode, container) {
  const { tag, props, children } = vnode;
  // tag
  const el = (vnode.el = createElement(tag));
  // 处理props
  for (const key in props) {
    const val = props[key];
    patchProps(el, key, null, val);
  }
  // 处理children ==> string || array
  if (typeof children === "string") {
    insert(createTextNode(children), el);
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      mountElement(v, el);
    });
  }
  // 写入容器
  insert(el, container);
}

export function diff(n1, n2) {
  // 处理tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(createElement(n2.tag));
  } else {
    // 处理props
    const newProps = n2.props;
    const oldProps = n1.props;
    const el = (n2.el = n1.el);
    if (newProps) {
      for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
          patchProps(el, key, oldProps[key], newProps[key]);
        }
      }
    }
    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null);
        }
      }
    }

    // 处理children
    // 1.new -> string old-> string
    // 2.new -> string old-> array
    // 3.new -> array old-> string
    // 4.new -> array old-> array
    const newChildren = n2.children;
    const oldChildren = n1.children;
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.innerText = newChildren;
        }
      } else if (Array.isArray(oldChildren)) {
        el.innerText = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        el.innerText = ``;
        newChildren.forEach((v) => {
          mountElement(v, el);
        });
      } else if (Array.isArray(oldChildren)) {
        const length = Math.min(newChildren.length, oldChildren.length);

        for (let i = 0; i < length; i++) {
          const newVnode = newChildren[i];
          const oldVnode = oldChildren[i];
          diff(oldVnode, newVnode);
        }

        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            const vnode = newChildren[i];
            mountElement(vnode.el, el);
          }
        }
        if (oldChildren.length > length) {
          for (let i = length; i < oldChildren.length; i++) {
            const vnode = oldChildren[i];
            remove(vnode.el, el);
          }
        }
      }
    }
  }
}
