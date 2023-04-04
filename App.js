import { reactive, effectWatch, h } from "./core/index.js";
window.h = h;
export default {
  render(context) {
    // return h("div", { id: "foo" }, [
    //   h("p", {}, "nihao"),
    //   h("p", {}, String(context.obj.count)),
    // ]);
    // return h("div", { id: "foo", class: "test" }, "nihao");
    // 1.tag 不一样
    // return h(context.obj.tag, {}, "nihao");
    // 2.tag一样 属性不一样
    // return h("div", context.obj.props, "");
    // 3.tag一样，属性删除
    // return h("div", context.obj.props, "");

    // props 1.new -> string old-> string
    // return h("div", {}, context.obj.children);
    // props 2.new -> string old-> array
    // return h("div", {}, context.obj.children);
    // props 3.new -> array old-> string
    // return h("div", {}, context.obj.children);
    // props 4.new -> array old-> array
    return h("div", {}, context.obj.children);
  },
  setup() {
    const obj = reactive({
      count: 1,
      tag: "div",
      props: {
        a: "a",
        b: "test",
      },
      // children: "nihao",
      children: [h("div", {}, "1"), h("div", {}, "2")],
    });
    window.obj = obj;
    return {
      obj,
    };
  },
};
