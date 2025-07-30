<template>
  <div class="instrument-list">
    <h2>Instrumentos</h2>
    <InstrumentItemComponent
      v-for="instrument in instruments"
      :key="instrument.codeInstrument"
      :instrument="instrument"
      :selected="selected"
      @click="$emit('update:selected', instrument.codeInstrument)"
    />
  </div>
</template>

<script>
import InstrumentItemComponent from "./InstrumentItemComponent.vue";

export default {
  components: { InstrumentItemComponent },
  props: {
    instruments: {
      type: Array,
      default: () => [],
    },
    selected: String,
  },
};
</script>

<style scoped>
.instrument-list {
  background: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 600px;
}
h2 {
  text-align: center;
  color: #fff;
}
</style>
