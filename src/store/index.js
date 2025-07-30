import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    selectedInstrument: null,
    instruments: [],
    indexData: {
      name: "IPSA",
      currentValue: 6474.37,
      variation: -0.78,
    },
  }),
  actions: {
    setInstruments(data) {
      this.instruments = data;
    },
    setSelectedInstrument(instrument) {
      this.selectedInstrument = instrument;
    },
  },
});
