import { mount } from "@vue/test-utils";
import HeaderComponent from "../components/HeaderComponent.vue";

describe("HeaderComponent", () => {
  it("renders without crashing", () => {
    const wrapper = mount(HeaderComponent, {
      props: {
        // si tu componente usa props, pon algunos valores de prueba aquí
        title: "IPSA",
        currentValue: 1000,
        variation: 0.05,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
