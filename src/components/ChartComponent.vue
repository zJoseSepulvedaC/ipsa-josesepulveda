<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler
);

export default {
  props: {
    history: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    history() {
      this.renderChart();
    },
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "short",
      });
    },
    renderChart() {
      if (this.chart) this.chart.destroy();
      const ctx = this.$refs.chartCanvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.history.map((item) =>
            this.formatDate(item.datetimeLastPrice)
          ),
          datasets: [
            {
              label: "Precio",
              data: this.history.map((item) => item.lastPrice),
              borderColor: "blue",
              fill: true,
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Histórico de Precios",
            },
          },
          scales: {
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 45,
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 300px;
}
</style>
