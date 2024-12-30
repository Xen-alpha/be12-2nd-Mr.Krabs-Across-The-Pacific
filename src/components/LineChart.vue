<script setup>
<<<<<<< HEAD
=======
/**
 *  Alert: 작동하지 않습니다! 이 모듈로 라우트하지 마세요!
 *  이 모듈은 차트 관련 연습용으로 별도 분리한 모듈입니다.
 */
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
// import { defineProps } from 'vue';
// mport { usePortfolioDetailsStore } from '../stores/usePortfolioDetailsStore.js';
// let portfolioStore = usePortfolioDetailsStore();
// let rawdata = portfolioStore.getportfolioDetail(idx);
// TODO: rawdata를 가공해서 종목 별로 항목과 현 가치를 계산해 labels와 datasets.data에 삽입
</script>
<script>
// Alert: 작동하지 않습니다! 이 모듈로 라우트하지 마세요!
<<<<<<< HEAD
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
=======
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463

// import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default {
<<<<<<< HEAD
  name: 'LineChart',
=======
  name: "LineChart",
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
  components: { Line },
  computed: {
    chartData() {
      return {
<<<<<<< HEAD
        labels: ['January', 'February', 'March'],
=======
        labels: ["January", "February", "March"],
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
        datasets: [{ data: [40, 20, 12], tension: 0, pointStyle: false }],
      }; /* mutable chart data */
    },
    chartOptions() {
      return {
        responsive: true,
      };
    },
<<<<<<< HEAD
  }
}
=======
  },
};
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
</script>
<template>
  <LineChart :data="chartData" :options="chartOptions" />
</template>
<<<<<<< HEAD
<style scoped></style>
=======
<style scoped></style>
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
