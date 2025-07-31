<template>
  <div class="tabs">
    <button
      v-for="index in indices"
      :key="index"
      :class="{ active: index === selectedIndex }"
      @click="selectIndex(index)"
    >
      {{ index }}
    </button>
  </div>
</template>

<script>
import { useInstrumentsStore } from "../store/useInstrumentsStore";
import {
  getInstrumentSummary,
  getInstrumentHistory,
} from "../services/dataService";

export default {
  setup() {
    const store = useInstrumentsStore();

    const indices = ["IPSA", "IGPA", "NASDAQ"]; // Puedes agregar más índices
    const selectedIndex = store.selectedInstrument; // Estado global

    const selectIndex = async (index) => {
      try {
        store.setInstrument(index); // Cambiar índice seleccionado
        const summary = await getInstrumentSummary(index);
        const history = await getInstrumentHistory(index);
        store.setSummary(summary);
        store.setHistory(history);
      } catch (error) {
        console.error("Error al cambiar de índice:", error);
      }
    };

    return { indices, selectedIndex, selectIndex };
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
