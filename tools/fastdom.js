function deepAssign(el, args) {
  const keys = Object.keys(args);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (typeof args[key] === "object") {
      if (!el[key]) {
        el[key] = {};
      }

      deepAssign(el[key], args[key]);
    } else {
      el[key] = args[key];
    }
  }
}

HTMLElement.prototype.addTo = function (parent) {
  parent.appendChild(this);

  return this;
};

HTMLElement.create = function (type, args, children = []) {
  if (Array.isArray(args)) {
    children = args;
    args = null;
  }

  const res = document.createElement(type);

  if (args) {
    deepAssign(res, args);
  }

  if (children.length) {
    for (const child of children) {
      if (Array.isArray(child)) {
        HTMLElement.create(...child).addTo(res);
      } else {
        child.addTo(res);
      }
    }
  }

  return res;
};

const FD = {
  children: (...children) => children,
  create: HTMLElement.create,
};
