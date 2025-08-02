import { defineStore } from "pinia";
import {
  fetchConstituents,
  fetchSummary,
  fetchHistory,
} from "../services/dataService";

export const useInstrumentsStore = defineStore("instruments", {
  state: () => ({
    selectedInstrument: "IPSA", // Instrumento actual
    selectedIndex: "IPSA", // Índice seleccionado
    summary: {}, // Resumen del instrumento
    history: [], // Histórico del gráfico
    instruments: [], // Lista de instrumentos
    summaries: {}, // Resumen de todos los instrumentos
    searchQuery: "", // Texto de búsqueda
    loading: false, // Estado de carga
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
            inst.codeInstrument
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase()) ||
            inst.nameInstrument
              ?.toLowerCase()
              .includes(state.searchQuery.toLowerCase())
        );
      }

      return list;
    },
  },
  actions: {
    // Cargar toda la información inicial
    async initData() {
      try {
        this.loading = true;
        const { instruments, summaries } = await fetchConstituents(
          this.selectedIndex
        );
        this.instruments = instruments;
        this.summaries = summaries;

        await this.loadInstrumentData(this.selectedInstrument);
      } catch (error) {
        console.warn("Error al inicializar los datos:", error);
      } finally {
        this.loading = false;
      }
    },

    // Cargar datos (resumen + histórico) de un instrumento
    async loadInstrumentData(symbol) {
      try {
        this.loading = true;
        this.summary = await fetchSummary(symbol);
        this.history = await fetchHistory(symbol);
      } catch (error) {
        console.warn(`Error al cargar datos del instrumento ${symbol}:`, error);
      } finally {
        this.loading = false;
      }
    },

    // Cambiar instrumento seleccionado
    async setInstrument(symbol) {
      this.selectedInstrument = symbol;
      await this.loadInstrumentData(symbol);
    },

    // Cambiar índice seleccionado (y recargar lista + datos)
    async setIndex(index) {
      this.selectedIndex = index;
      this.selectedInstrument = index;
      await this.initData();
    },

    // Cambiar búsqueda
    setSearchQuery(query) {
      this.searchQuery = query;
    },
  },
});
