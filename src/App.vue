<template>
  <div>
    <HeaderComponent :indexName="selected" :summary="summary" />
    <ChartComponent :history="history" />
    <InstrumentTableComponent
      :instruments="instruments"
      :summaries="summaries"
      v-model:selected="selected"
    />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import ChartComponent from "./components/ChartComponent.vue";
import InstrumentTableComponent from "./components/InstrumentTableComponent.vue";
import {
  getConstituents,
  getInstrumentSummary,
  getInstrumentHistory,
} from "./services/dataService";

export default {
  components: { HeaderComponent, ChartComponent, InstrumentTableComponent },
  data() {
    return {
      instruments: [],
      summaries: {}, // ahora cargaremos los resúmenes reales
      summary: { valor_actual: "-", variacion: "-" },
      history: [],
      selected: "IPSA",
    };
  },
  async mounted() {
    await this.loadData();
  },
  watch: {
    selected() {
      this.loadData();
    },
  },
  methods: {
    async loadData() {
      try {
        // Obtenemos instrumentos y sus resúmenes desde el servicio
        const { instruments, summaries } = await getConstituents();
        this.instruments = instruments;
        this.summaries = summaries;

        console.log("Instrumentos cargados:", this.instruments);
        console.log("Summaries cargados:", this.summaries);

        // Resumen e histórico del índice seleccionado
        const resumen = await getInstrumentSummary(this.selected);
        this.summary = { ...resumen };
        this.history = await getInstrumentHistory(this.selected);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    },
  },
};
</script>
