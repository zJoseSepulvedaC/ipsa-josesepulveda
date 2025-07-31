<template>
  <div>
    <HeaderComponent />
    <TabComponent />
    <!-- NUEVO: pestañas para cambiar índices -->
    <ChartComponent />
    <SearchBarComponent />
    <!-- Barra de búsqueda -->
    <InstrumentTableComponent
      :instruments="filteredInstruments"
      :summaries="summaries"
      @update:selected="onInstrumentSelect"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import TabComponent from "./components/TabComponent.vue"; // <-- NUEVO
import ChartComponent from "./components/ChartComponent.vue";
import SearchBarComponent from "./components/SearchBarComponent.vue";
import InstrumentTableComponent from "./components/InstrumentTableComponent.vue";
import {
  getConstituents,
  getInstrumentSummary,
  getInstrumentHistory,
} from "./services/dataService";
import { useInstrumentsStore } from "./store/useInstrumentsStore";

export default {
  components: {
    HeaderComponent,
    TabComponent, // <-- NUEVO
    ChartComponent,
    SearchBarComponent,
    InstrumentTableComponent,
  },
  setup() {
    const store = useInstrumentsStore();

    const loadInitialData = async () => {
      try {
        // Cargar lista de instrumentos
        const { instruments, summaries } = await getConstituents();
        store.instruments = instruments;
        store.summaries = summaries;

        // Cargar datos iniciales del índice seleccionado
        const summary = await getInstrumentSummary(store.selectedInstrument);
        const history = await getInstrumentHistory(store.selectedInstrument);
        store.setSummary(summary);
        store.setHistory(history);
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
      }
    };

    const onInstrumentSelect = async (newSymbol) => {
      try {
        store.setInstrument(newSymbol);
        const summary = await getInstrumentSummary(newSymbol);
        const history = await getInstrumentHistory(newSymbol);
        store.setSummary(summary);
        store.setHistory(history);
      } catch (error) {
        console.error("Error al cambiar de instrumento:", error);
      }
    };

    loadInitialData();

    return {
      store,
      onInstrumentSelect,
      filteredInstruments: computed(() => store.filteredInstruments),
      summaries: computed(() => store.summaries),
    };
  },
};
</script>
