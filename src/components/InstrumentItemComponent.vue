<template>
  <div class="instrument-item" @click="selectInstrument">
    <span>{{ instrument.codeInstrument }}</span>
    <span :class="variationClass">{{ formattedVariacion }}%</span>
  </div>
</template>

<script>
import { useInstrumentsStore } from "../store/useInstrumentsStore";
import {
  getInstrumentSummary,
  getInstrumentHistory,
} from "../services/dataService";

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
  setup(props) {
    const store = useInstrumentsStore();

    const selectInstrument = async () => {
      store.setInstrument(props.instrument.codeInstrument);

      const summary = await getInstrumentSummary(
        props.instrument.codeInstrument
      );
      const history = await getInstrumentHistory(
        props.instrument.codeInstrument
      );

      store.setSummary(summary);
      store.setHistory(history);
    };

    return { selectInstrument };
  },
};
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
