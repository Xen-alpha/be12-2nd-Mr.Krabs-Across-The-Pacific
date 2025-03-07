<script setup>
import { ref, reactive, onMounted } from 'vue';
import { initializePieChart } from './js/pieChart.js'; // 모듈 가져오기
import { useRoute } from 'vue-router';
import { usePortfolioDetailStore } from '../stores/usePortfolioDetailStore.js';

const props = defineProps({
  portfolioStocks: Object,
  profit: String
})

const chartRef = ref(null);
const route = useRoute();
const portfolioDetailStore = usePortfolioDetailStore();
let portfolioStocks = ref([]);
let total_profit = ref(0);

onMounted(async () => {
  const response = await portfolioDetailStore.getportfolioDetail(route.params.idx);
  portfolioStocks.value = response.result.topStocks;
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d');
    initializePieChart(ctx, portfolioStocks.value); // Chart 초기화 함수 호출
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
