<template>
  <div class="instrument-item" @click="selectInstrument">
    <span>{{ instrument.codeInstrument }}</span>
    <span :class="variationClass">{{ formattedVariacion }}%</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useInstrumentsStore } from "../store/useInstrumentsStore";

const props = defineProps({
  instrument: { type: Object, required: true },
});

const store = useInstrumentsStore();

const selectInstrument = () => {
  store.setInstrument(props.instrument.codeInstrument);
};

const formattedVariacion = computed(() => {
  const val = parseFloat(props.instrument?.variacion);
  return isNaN(val) ? "-" : val.toFixed(2);
});

const variationClass = computed(() => {
  const val = parseFloat(props.instrument?.variacion);
  return isNaN(val) ? "" : val >= 0 ? "positive" : "negative";
});
</script>

<style scoped>
.instrument-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #333;
  cursor: pointer;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
