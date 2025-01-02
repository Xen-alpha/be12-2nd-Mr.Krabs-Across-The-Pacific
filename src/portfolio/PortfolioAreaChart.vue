<script setup>
import { ref, onMounted } from 'vue';
import { initializeAreaChart } from '../portfolio/js/areaChart.js';

const chartRef = ref(null);

onMounted(() => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d');
    initializeAreaChart(ctx); // Chart 초기화
  }
});
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px; /* 원하는 높이 설정 */
  position: relative;
  overflow: hidden;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
