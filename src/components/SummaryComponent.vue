<template>
  <div class="summary">
    <h2>Resumen del Instrumento</h2>
    <div v-if="summary">
      <p><strong>Nombre:</strong> {{ summary.name }}</p>
      <p><strong>Valor Actual:</strong> {{ summary.valor_actual }}</p>
      <p><strong>Variación:</strong> {{ summary.variacion }}</p>
      <p><strong>Máximo Diario:</strong> {{ summary.maximo_diario }}</p>
      <p><strong>Mínimo Diario:</strong> {{ summary.minimo_diario }}</p>
    </div>
    <div v-else>
      <p>Seleccione un instrumento para ver su resumen.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMainStore } from "../store";

const store = useMainStore();
const summary = computed(() => store.summary);
</script>

<style scoped>
.summary {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f9f9f9;
}
</style>
