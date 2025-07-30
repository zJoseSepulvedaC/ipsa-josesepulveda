<template>
  <div>
    <HeaderComponent :indexName="selected" :summary="summary" />
    <InstrumentListComponent
      :instruments="instruments"
      v-model:selected="selected"
    />
    <ChartComponent :history="history" />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import InstrumentListComponent from "./components/InstrumentListComponent.vue";
import ChartComponent from "./components/ChartComponent.vue";
import {
  getConstituents,
  getInstrumentSummary,
  getInstrumentHistory,
} from "./services/dataService";

export default {
  components: { HeaderComponent, InstrumentListComponent, ChartComponent },
  data() {
    return {
      instruments: [],
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
      const instrumentsData = await getConstituents();
      this.instruments = instrumentsData.constituents || []; // SOLO el array
      const resumen = await getInstrumentSummary(this.selected);
      this.summary = { ...resumen };
      this.history = await getInstrumentHistory(this.selected);
    },
  },
};
</script>
