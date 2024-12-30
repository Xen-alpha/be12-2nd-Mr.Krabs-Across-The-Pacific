<script setup>
<<<<<<< HEAD
import { defineProps, ref, reactive } from 'vue';
import stockListItem from './stockListItem.vue';
import { useStockListStore } from '../stores/useStockListStore.js';
=======
import { defineProps, ref, reactive } from "vue";
import stockListItem from "./component/StockListItem.vue";
import { useStockListStore } from "../stores/useStockListStore.js";
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
// import LineChart from '../components/LineChart.vue';

// TODO: API에 offset을 파라미터로 넘겨 페이지네이션을 구현할 것
const props = defineProps({
  offset: Number,
  sectionAction: String,
  text: String,
});
// 어쩔 수 없이 삼항 연산자 사용
const offset = ref(!props.offset ? 0 : props.offset);
const text = ref(!props.text ? "" : props.text);

let canMoveRight = ref(false);
let canMoveLeft = ref(false);

const stockListStore = useStockListStore();
let itemlist = reactive([]);
<<<<<<< HEAD
// TODO: stocklistStore.getStockList 액션으로 교체
=======
// 볼 때 목록 불러오는 API
// TODO: stocklistStore.getStockList 액션으로 교체하여 페이지네이션 구현을 여기로 이전
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
const response = async () => {
  const response = await stockListStore.getStockList(offset, text);
  for (let item of response) {
    itemlist.push(JSON.stringify(item));
  }
  canMoveRight.value = itemlist.length >= 30; // 일단 30개가 되면 활성화는 시킴
  canMoveLeft.value = offset.value > 0;
};
response();
<<<<<<< HEAD

const movePrev = async () => {
  itemlist = reactive([]);
  const response = await stockListStore.getPrevList()
=======
// 이전 30개로 페이지네이션
// TODO: 이 코드를 수정하여 작동하게 만들 것
const movePrev = async () => {
  itemlist = reactive([]);
  const response = await stockListStore.getPrevList();
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
  for (let item of response) {
    itemlist.push(JSON.stringify(item));
  }
  console.log(itemlist);
  canMoveRight.value = itemlist.length >= 30; // 일단 30개가 되면 활성화는 시킴
  canMoveLeft.value = offset.value > 0;
<<<<<<< HEAD
}

const moveNext = async () => {
  itemlist = reactive([]);
  const response = await stockListStore.getNextList()
=======
};
// 다음 30개로 페이지네이션
// TODO: 이 코드를 수정하여 작동하게 만들 것
const moveNext = async () => {
  itemlist = reactive([]);
  const response = await stockListStore.getNextList();
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
  for (let item of response) {
    itemlist.push(JSON.stringify(item));
  }
  console.log(itemlist);
  canMoveRight.value = itemlist.length >= 30; // 일단 30개가 되면 활성화는 시킴
  canMoveLeft.value = offset.value > 0;
<<<<<<< HEAD
}

=======
};
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
</script>

<template>
  <div class="container">
    <h1>{{ props.sectionAction }} 결과</h1>
    <div v-for="item in itemlist">
      <stockListItem :information="item" />
    </div>
    <span class="pagination">
      <div v-if="canMoveRight" @click="movePrev">&lt;</div>
      <div v-else class="inverted-color">&lt;</div>
      <div>&nbsp; {{ Math.floor(offset / 30) }} &nbsp;</div>
      <div v-if="canMoveLeft" @click="moveNext">&gt;</div>
      <div v-else class="inverted-color">&gt;</div>
    </span>
  </div>
</template>
<style scoped>
<<<<<<< HEAD
.container>h1 {
=======
.container > h1 {
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
  margin-top: 6rem;
}

.pagination {
  text-align: center;
  justify-self: center;
}

.inverted-color {
  color: cornflowerblue;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
