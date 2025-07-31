import { defineStore } from "pinia";

export const useInstrumentsStore = defineStore("instruments", {
  state: () => ({
    selectedInstrument: "IPSA",
    summary: {},
    history: [],
    instruments: [],
    summaries: {},
    searchQuery: "", // Para el filtro
  }),
  getters: {
    filteredInstruments: (state) => {
      if (!state.searchQuery) return state.instruments;
      return state.instruments.filter(
        (inst) =>
          inst.codeInstrument.toLowerCase().includes(state.searchQuery) ||
          inst.nameInstrument?.toLowerCase().includes(state.searchQuery)
      );
    },
  },
  actions: {
    setInstrument(symbol) {
      this.selectedInstrument = symbol;
    },
    setSummary(data) {
      this.summary = data;
    },
    setHistory(data) {
      this.history = data;
    },
  },
});
