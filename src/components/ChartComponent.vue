<template>
  <div>
    <canvas v-if="hasData" ref="chartCanvas"></canvas>
    <p v-else class="loading">Cargando datos del gráfico...</p>
  </div>
</template>

<script>
import { watch, computed, nextTick, ref } from "vue";
import { useInstrumentsStore } from "../store/useInstrumentsStore";
import Chart from "chart.js/auto";

export default {
  setup() {
    const store = useInstrumentsStore();
    const chartCanvas = ref(null);
    let chart = null;

    const hasData = computed(() => store.history && store.history.length > 0);

    const renderChart = async () => {
      if (!hasData.value) return;

      await nextTick(); // <- Aseguramos que el DOM ya esté actualizado
      const canvas = chartCanvas.value;
      if (!canvas) return; // <- Si aún no está, salimos

      if (chart) chart.destroy();
      const ctx = canvas.getContext("2d");

      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: store.history.map((p) => p.datetimeLastPrice),
          datasets: [
            {
              label: store.selectedInstrument,
              data: store.history.map((p) => p.lastPrice),
              borderColor: "blue",
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    // Redibuja el gráfico cuando cambia el histórico
    watch(() => store.history, renderChart, { immediate: true });

    return { store, hasData, chartCanvas };
  },
};
</script>

<style scoped>
.loading {
  color: #ccc;
  text-align: center;
  margin-top: 20px;
}
</style>
