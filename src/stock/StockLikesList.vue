<script setup>
import { defineProps, ref, reactive, onMounted, computed, onBeforeMount } from "vue";
import stockListItem from "./component/StockListItem.vue";
import { useStockLikesStore } from "../stores/useStockLikesStore.js";
import { useLoadingStore } from "../stores/useLoadingStore.js";
import axios from "axios";

// TODO: API에 offset을 파라미터로 넘겨 페이지네이션을 구현할 것(경윤)
const props = defineProps({
  initialList: Object // 상위 모듈에서 최초로 넘겨줄 초기 리스트(없으면 안 됨)
});
// 어쩔 수 없이 삼항 연산자 사용
let offset = ref(0);
const text = ref(!props.text ? "" : props.text);

const stockLikesStore = useStockLikesStore();
const loadingStore = useLoadingStore();
let itemlist = reactive(props.initialList ? props.initialList : stockLikesStore.stockListResult);
let totalLength = ref(stockLikesStore.stockListOffset);

let canMoveLeft = computed(() => {
  return ref(offset > 1);
});
let canMoveRight = computed(() => {
  return ref(offset < Math.floor(totalLength / 30));
});

onBeforeMount(async () => {
  loadingStore.startLoading();
  await stockLikesStore.getStockList(offset, text);
  loadingStore.stopLoading();
})

onMounted(async () => {
  loadingStore.startLoading();
  await stockLikesStore.getStockList(offset, text);
  loadingStore.stopLoading();
});

const onmovePrev = () => {
  offset.value -= 30;
  loadingStore.startLoading();
  stockLikesStore.getStockList(offset, text);
  loadingStore.stopLoading();
};

const onmoveNext = () => {
  offset.value += 30;
  loadingStore.startLoading();
  stockLikesStore.getStockList(offset, text);
  loadingStore.stopLoading();
};


</script>

<template>
  <div class="container">
    <h1>나의 관심 종목</h1>
    <div v-for="item in itemlist">
      <stockListItem :information="item" />
    </div>
    <span class="pagination">
      <button :disabled="canMoveRight" @click="onmovePrev">&lt;</button>
      <div>&nbsp; {{ Math.floor(offset / 30) }} &nbsp;</div>
      <button :disabled="canMoveLeft" @click="onmoveNext">&gt;</button>
    </span>
  </div>
</template>
<style scoped>
.container>h1 {
  margin-top: 6rem;
}

.pagination {
  text-align: center;
  justify-self: center;
}

.inverted-color {
  color: cornflowerblue;
}
</style>
