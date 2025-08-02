<template>
  <div class="header">
    <h1>{{ selectedInstrument }}</h1>
    <p>Valor actual: {{ formattedValor }}</p>
    <p :class="variationClass">Variación: {{ formattedVariacion }}%</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useInstrumentsStore } from "../store/useInstrumentsStore";

const store = useInstrumentsStore();

const selectedInstrument = computed(() => store.selectedInstrument);

const formattedValor = computed(() => {
  const val = parseFloat(store.summary?.valor_actual);
  return !isNaN(val) ? val.toFixed(2) : "-";
});

const formattedVariacion = computed(() => {
  const val = parseFloat(store.summary?.variacion);
  return !isNaN(val) ? val.toFixed(2) : "-";
});

const variationClass = computed(() => {
  const val = parseFloat(store.summary?.variacion);
  if (isNaN(val)) return "";
  return val >= 0 ? "positive" : "negative";
});
</script>

<style scoped>
.header {
  padding: 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
