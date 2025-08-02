<template>
  <div>
    <!-- Encabezado -->
    <HeaderComponent />

    <!-- Loader inicial -->
    <div v-if="store.loading" class="no-data">Cargando datos iniciales...</div>

    <!-- Gráfico -->
    <div v-else-if="hasHistory">
      <ChartComponent />
    </div>
    <div v-else class="no-data">No hay datos disponibles del gráfico.</div>

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
import { computed, onMounted } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import ChartComponent from "./components/ChartComponent.vue";
import TabComponent from "./components/TabComponent.vue";
import SearchBarComponent from "./components/SearchBarComponent.vue";
import InstrumentTableComponent from "./components/InstrumentTableComponent.vue";
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

    // Cambio de índice
    const onIndexChange = async (newIndex) => {
      await store.setIndex(newIndex);
    };

    // Cambio de instrumento
    const onInstrumentSelect = async (newSymbol) => {
      await store.setInstrument(newSymbol);
    };

    const hasInstruments = computed(
      () => store.instruments && store.instruments.length > 0
    );
    const hasHistory = computed(
      () => store.history && store.history.length > 0
    );

    // Inicialización al montar el componente
    onMounted(() => {
      store.initData();
    });

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
