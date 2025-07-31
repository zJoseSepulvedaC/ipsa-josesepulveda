<template>
  <div class="tabs">
    <button
      v-for="index in indices"
      :key="index"
      :class="{ active: index === store.selectedIndex }"
      @click="changeIndex(index)"
    >
      {{ index }}
    </button>
  </div>
</template>

<script>
import { useInstrumentsStore } from "../store/useInstrumentsStore";

export default {
  emits: ["update:index"], // <- Avisamos al padre el cambio
  setup(props, { emit }) {
    const store = useInstrumentsStore();
    const indices = ["IPSA", "IGPA", "NASDAQ"];

    const changeIndex = (index) => {
      store.setIndex(index); // Guardamos el índice en el store
      emit("update:index", index); // Avisamos al padre
    };

    return { indices, store, changeIndex };
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
button {
  background: #222;
  color: #fff;
  border: 1px solid #444;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background: #333;
}
button.active {
  background: #555;
  border-color: #777;
}
</style>
