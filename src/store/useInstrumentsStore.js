import { defineStore } from "pinia";

export const useInstrumentsStore = defineStore("instruments", {
  state: () => ({
    selectedInstrument: "IPSA",
    selectedIndex: "IPSA", // Nuevo: índice seleccionado
    summary: {},
    history: [],
    instruments: [],
    summaries: {},
    searchQuery: "", // Para el filtro
  }),
  getters: {
    filteredInstruments: (state) => {
      let list = state.instruments;

      // Filtrar por índice
      if (state.selectedIndex) {
        list = list.filter(
          (inst) =>
            inst.index?.toLowerCase() === state.selectedIndex.toLowerCase()
        );
      }

      // Filtrar por búsqueda
      if (state.searchQuery) {
        list = list.filter(
          (inst) =>
            inst.codeInstrument.toLowerCase().includes(state.searchQuery) ||
            inst.nameInstrument?.toLowerCase().includes(state.searchQuery)
        );
      }

      return list;
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
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    setIndex(index) {
      this.selectedIndex = index;
      this.selectedInstrument = index; // Cambiamos el instrumento al índice seleccionado
    },
  },
});
