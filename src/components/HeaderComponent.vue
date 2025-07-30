<template>
  <div class="header">
    <h1>{{ indexName }}</h1>
    <p>Valor actual: {{ formattedValor }}</p>
    <p :class="variationClass">Variación: {{ formattedVariacion }}%</p>
  </div>
</template>

<script>
export default {
  props: {
    indexName: String,
    summary: {
      type: Object,
      default: () => ({ valor_actual: "-", variacion: "-" }),
    },
  },
  computed: {
    formattedValor() {
      const val = parseFloat(this.summary.valor_actual);
      return isNaN(val) ? "-" : val.toFixed(2);
    },
    formattedVariacion() {
      const val = parseFloat(this.summary.variacion);
      return isNaN(val) ? "-" : val.toFixed(2);
    },
    variationClass() {
      const val = parseFloat(this.summary.variacion);
      return isNaN(val) ? "" : val >= 0 ? "positive" : "negative";
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  padding: 20px;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
