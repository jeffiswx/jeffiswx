import { effectWatch } from "./reactivity.js";
import { mountElement, diff } from "./render.js";
export function createApp(rootComponent) {
  let preSubTree;
  let isMounted = false;
  return {
    mount(rootContainer) {
      const resultSetup = rootComponent.setup();
      effectWatch(() => {
        if (!isMounted) {
          isMounted = true;
          const subTree = rootComponent.render(resultSetup);
          preSubTree = subTree;
          mountElement(subTree, rootContainer);
        } else {
          const subTree = rootComponent.render(resultSetup);
          console.log("new", subTree);
          console.log("old", preSubTree);
          diff(preSubTree,subTree)
          preSubTree = subTree;
        }

        // rootContainer.textContent = ``;
        // const subTree = rootComponent.render(resultSetup);
        // console.log("subTree:", subTree);
        // mountElement(subTree, rootContainer);
      });
    },
  };
}
