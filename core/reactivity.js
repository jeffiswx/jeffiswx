export class Dep {
  constructor(value) {
    this._val = value;
    this.effects = new Set();
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(value) {
    this._val = value;
    this.notice();
  }

  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }

  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}
let currentEffect = null;

export function effectWatch(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

const targetMaps = new Map();
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(raw, key);
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(raw, key);
      const result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  });
}
function getDep(raw, key) {
  let desMap = targetMaps.get(raw);
  if (!desMap) {
    desMap = new Map();
    targetMaps.set(raw, desMap);
  }
  let isDep = desMap.get(key);
  if (!isDep) {
    isDep = new Dep();
    desMap.set(key, isDep);
  }
  return isDep;
}
