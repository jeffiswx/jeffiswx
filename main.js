import { Dep, effectWatch, reactive } from "./core/index.js";

// ref实现
// const a = new Dep(10);
// let b = 0;
// effectWatch(() => {
//   b = a.value + 10;
//   console.log("b:", b);
// });
// a.value = 20;

// reactive实现
// const user = reactive({
//   age: 18,
// });
// let nextAge = 0;
// effectWatch(() => {
//   nextAge = user.age + 10;
//   console.log("nextAge:", nextAge);
// });
// user.age++;

// 视图实现1
// const obj = reactive({
//   count: 1,
// });
// window.context = obj;
// effectWatch(() => {
//   document.querySelector("#app").textContent = ``
//   const element = document.createElement("div");
//   const text = document.createTextNode("nihao");
//   const text1 = document.createTextNode(obj.count);
//   element.append(text);
//   element.append(text1);
//   document.querySelector("#app").append(element);
// });

// 视图 实现2
// const App = {
//   render(context) {
//     effectWatch(() => {
//       document.querySelector("#app").textContent = ``;
//       const element = document.createElement("div");
//       const text = document.createTextNode("nihao");
//       const text1 = document.createTextNode(context.obj.count);
//       element.append(text);
//       element.append(text1);
//       document.querySelector("#app").append(element);
//     });
//   },
//   setup() {
//     const obj = reactive({
//       count: 1,
//     });
//     window.obj = obj;
//     return {
//       obj,
//     };
//   },
// };
// App.render(App.setup());

import { createApp } from "./core/index.js";
import App from "./App.js";
// 模拟vue3
createApp(App).mount(document.querySelector("#app"));
