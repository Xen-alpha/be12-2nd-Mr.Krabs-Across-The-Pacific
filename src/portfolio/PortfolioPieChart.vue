<script setup>
import { ref, onMounted } from 'vue';
import { initializePieChart } from './js/pieChart.js'; // 모듈 가져오기

const chartRef = ref(null);

onMounted(() => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d');
    initializePieChart(ctx); // Chart 초기화 함수 호출
  }
});
</script>

<template>
  <div>
    <canvas ref="chartRef" style="max-width: 100%; max-height: 100%;"></canvas>
  </div>
</template>

<style scoped>
canvas {

  max-width: 100%;
  max-height: 100%;
}
</style>
