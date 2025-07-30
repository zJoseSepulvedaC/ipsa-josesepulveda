<template>
  <div class="instrument-table">
    <h2>Instrumentos</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Último</th>
          <th>Monto (MM)</th>
          <th>Var Día %</th>
          <th>Var 30D %</th>
          <th>Año Actual %</th>
          <th>12 Meses %</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="instrument in instruments"
          :key="instrument.codeInstrument"
          @click="$emit('update:selected', instrument.codeInstrument)"
          class="instrument-row"
        >
          <td>{{ instrument.shortName }}</td>
          <td>{{ getSummary(instrument.codeInstrument).ultimo ?? "-" }}</td>
          <td>
            {{ formatNumber(getSummary(instrument.codeInstrument).monto) }}
          </td>
          <td :class="getClass(getSummary(instrument.codeInstrument).varDia)">
            {{ formatPercent(getSummary(instrument.codeInstrument).varDia) }}
          </td>
          <td :class="getClass(getSummary(instrument.codeInstrument).var30d)">
            {{ formatPercent(getSummary(instrument.codeInstrument).var30d) }}
          </td>
          <td :class="getClass(getSummary(instrument.codeInstrument).varAno)">
            {{ formatPercent(getSummary(instrument.codeInstrument).varAno) }}
          </td>
          <td :class="getClass(getSummary(instrument.codeInstrument).var12m)">
            {{ formatPercent(getSummary(instrument.codeInstrument).var12m) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    instruments: { type: Array, default: () => [] },
    summaries: { type: Object, default: () => ({}) },
    selected: String,
  },
  methods: {
    getSummary(code) {
      return this.summaries[code] || {};
    },
    formatNumber(num) {
      if (!num) return "-";
      return (parseFloat(num) / 1_000_000).toFixed(2);
    },
    formatPercent(val) {
      if (val == null || isNaN(val)) return "-";
      return parseFloat(val).toFixed(2) + "%";
    },
    getClass(val) {
      if (val > 0) return "positive";
      if (val < 0) return "negative";
      return "";
    },
  },
};
</script>

<style scoped>
.instrument-table {
  background: #1e1e1e;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  color: #fff;
}
th,
td {
  padding: 10px;
  border-bottom: 1px solid #333;
}
.instrument-row {
  cursor: pointer;
}
.instrument-row:hover {
  background: #2a2a2a;
}
.positive {
  color: #00c853;
}
.negative {
  color: #d50000;
}
</style>
