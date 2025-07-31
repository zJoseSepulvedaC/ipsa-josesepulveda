<template>
  <div>
    <!-- Encabezado -->
    <HeaderComponent />

    <!-- Gráfico -->
    <div v-if="hasHistory">
      <ChartComponent />
    </div>
    <div v-else class="no-data">Cargando datos del gráfico...</div>

    <!-- Tabs -->
    <TabComponent @update:index="onIndexChange" />

    <!-- Barra de búsqueda -->
    <SearchBarComponent />

    <!-- Tabla de instrumentos -->
    <div v-if="hasInstruments">
      <InstrumentTableComponent
        :instruments="filteredInstruments"
        :summaries="summaries"
        @update:selected="onInstrumentSelect"
      />
    </div>
    <div v-else class="no-data">No hay datos disponibles para este índice.</div>
  </div>
</template>

<script>
import { computed } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import ChartComponent from "./components/ChartComponent.vue";
import TabComponent from "./components/TabComponent.vue";
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
    ChartComponent,
    TabComponent,
    SearchBarComponent,
    InstrumentTableComponent,
  },
  setup() {
    const store = useInstrumentsStore();

    // Cargar datos (índice o instrumento)
    const loadData = async (symbol) => {
      try {
        const { instruments, summaries } = await getConstituents(symbol);
        store.instruments = instruments;
        store.summaries = summaries;

        const summary = await getInstrumentSummary(symbol);
        const history = await getInstrumentHistory(symbol);
        store.setSummary(summary);
        store.setHistory(history);
        store.setInstrument(symbol); // 🔥 Actualizamos el instrumento seleccionado
      } catch (error) {
        console.warn(`No se pudieron cargar los datos para ${symbol}`);
      }
    };

    // Cambio de índice
    const onIndexChange = async (newIndex) => {
      store.setIndex(newIndex);
      await loadData(newIndex);
    };

    // Cambio de instrumento
    // Cambio de instrumento
    // Cambio de instrumento
    const onInstrumentSelect = async (newSymbol) => {
      try {
        store.setInstrument(newSymbol);
        const summary = await getInstrumentSummary(newSymbol);

        // Si el símbolo es un índice (IPSA, IGPA, NASDAQ), cargamos su histórico
        const indices = ["IPSA", "IGPA", "NASDAQ"];
        let history = store.history;

        if (indices.includes(newSymbol)) {
          try {
            history = await getInstrumentHistory(newSymbol);
          } catch (err) {
            console.warn(`Histórico no disponible para ${newSymbol}`);
            history = [];
          }
        } else {
          console.log(
            `No hay histórico para ${newSymbol}. Manteniendo el gráfico del índice.`
          );
        }

        store.setSummary(summary);
        store.setHistory(history);
      } catch (error) {
        console.error("Error al cambiar de instrumento:", error);
      }
    };

    // Computed para saber si hay datos
    const hasInstruments = computed(
      () => store.instruments && store.instruments.length > 0
    );
    const hasHistory = computed(
      () => store.history && store.history.length > 0
    );

    // Inicialización
    loadData(store.selectedIndex || "IPSA");

    return {
      store,
      hasInstruments,
      hasHistory,
      onIndexChange,
      onInstrumentSelect,
      filteredInstruments: computed(() => store.filteredInstruments),
      summaries: computed(() => store.summaries),
    };
  },
};
</script>

<style>
.no-data {
  text-align: center;
  color: #ccc;
  padding: 20px;
  font-size: 1.2em;
}
</style>
