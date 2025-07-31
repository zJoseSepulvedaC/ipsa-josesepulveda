<template>
  <div class="header">
    <h1>{{ store.selectedInstrument }}</h1>
    <p>Valor actual: {{ formattedValor }}</p>
    <p :class="variationClass">Variación: {{ formattedVariacion }}%</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useInstrumentsStore } from "../store/useInstrumentsStore";

export default {
  setup() {
    const store = useInstrumentsStore();

    const formattedValor = computed(() => {
      if (!store.summary || !store.summary.valor_actual) return "-";
      const val = parseFloat(store.summary.valor_actual);
      return isNaN(val) ? "-" : val.toFixed(2);
    });

    const formattedVariacion = computed(() => {
      if (!store.summary || !store.summary.variacion) return "-";
      const val = parseFloat(store.summary.variacion);
      return isNaN(val) ? "-" : val.toFixed(2);
    });

    const variationClass = computed(() => {
      if (!store.summary || !store.summary.variacion) return "";
      const val = parseFloat(store.summary.variacion);
      return isNaN(val) ? "" : val >= 0 ? "positive" : "negative";
    });

    return { store, formattedValor, formattedVariacion, variationClass };
  },
};
</script>
