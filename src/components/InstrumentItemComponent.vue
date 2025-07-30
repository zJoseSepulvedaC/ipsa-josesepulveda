<template>
  <div
    class="instrument-item"
    :class="{ selected: instrument.codeInstrument === selected }"
    @click="$emit('click')"
  >
    <span>{{ instrument.codeInstrument }}</span>
    <span :class="variationClass"> {{ formattedVariation }}% </span>
  </div>
</template>

<script>
export default {
  props: {
    instrument: {
      type: Object,
      required: true,
    },
    selected: String,
  },
  computed: {
    formattedVariation() {
      const last = parseFloat(this.instrument.price?.lastPrice);
      const close = parseFloat(this.instrument.price?.closePrice);
      if (isNaN(last) || isNaN(close)) return "-";
      return (((last - close) / close) * 100).toFixed(2);
    },
    variationClass() {
      const val = parseFloat(this.formattedVariation);
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
  margin: 5px 0;
  background: #2a2a2a;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.instrument-item.selected {
  background: #444;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
