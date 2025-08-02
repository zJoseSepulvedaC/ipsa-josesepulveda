import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";

describe("Simple Component", () => {
  it("renders a message", () => {
    const TestComponent = defineComponent({
      render() {
        return h("div", "Hola Mundo");
      },
    });

    const wrapper = mount(TestComponent);
    expect(wrapper.text()).toBe("Hola Mundo");
  });
});
