<template>
  <div class="instrument-item">
    <span>{{ instrument.codeInstrument }}</span>
    <span :class="variationClass">{{ formattedVariacion }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    instrument: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedVariacion() {
      const val = parseFloat(this.instrument.variacion);
      return isNaN(val) ? "-" : val.toFixed(2);
    },
    variationClass() {
      const val = parseFloat(this.instrument.variacion);
      return isNaN(val) ? "" : val >= 0 ? "positive" : "negative";
    },
  },
};
</script>

<style scoped>
.instrument-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #333;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
