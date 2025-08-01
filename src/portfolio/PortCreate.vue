<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';
import { usePortCreateStore } from '../stores/usePortCreateStore';
import { useLoadingStore } from '../stores/useLoadingStore';
import { useStockListStore } from '../stores/useStockListStore';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useUserStore } from '../stores/useUserStore';

const userStore = useUserStore();

const stockList = useStockListStore();
const loadingStore = useLoadingStore();
const portCreate = usePortCreateStore();
const route = useRoute();
const router = useRouter();
// TODO : 유저 정보 받아와서 해당 params에 접근 가능한지 검증
// TODO : 추후 유저 idx 받아오는 식으로 변경
const portStatus = ref({
  portStatus: route.params.mode ?? true,
  username: history.state?.username ?? "null",  // 기본값 "null"
});
const mode = computed(() => route.params.mode ?? 'create'); // 기본값 'create'
const isCreateMode = computed(() => mode.value === 'create');
const isEditMode = computed(() => mode.value === 'update');

watch(() => route.params.mode, (newMode, oldMode) => {
  console.log('현재 모드:', isCreateMode.value ? '생성' : '수정');
  if (newMode !== oldMode) {
    resetData();
    if (newMode === 'update') {
      loadPortfolio(); // 업데이트 모드일 때 데이터 로드
    } 
  }
});
// 페이지 렌더링 시 동작 분기
onMounted(async () => {
  await userStore.routeToLogin();
  //console.log('현재 모드:', isCreateMode.value ? '생성' : '수정');
  if (isEditMode.value) {
    loadPortfolio();
  } else if(isCreateMode){
    resetData();
  }
});

const stockData = ref({ //주식 데이터
  stocks: [{
    name: '',
    quantity: 0,
    price: 0,
    date: '',
    isCh: true
  }]
});
const portfolioData = ref({//포트폴리오 데이터 (포트폴리오 업데이트시 사용)
  name: '포트폴리오',
  username: '',
  stocks: [{
    name: '',
    quantity: 0,
    price: 0,
    date: '',
    isCh: true
  }],
  isEditing: false, // 편집 모드 상태
  editName: '', // 편집 중인 이름
});

const resetData = () => { //버튼 누를 때마다 데이터 초기화
  chartData.value = {
    labels: ['No Data'],
    datasets: [
      {
        data: [0],
        backgroundColor: ['#CCCCCC'],
        hoverBackgroundColor: ['#CCCCCC'],
      },
    ],
  };

  stockData.value = {
    stocks: [{
      name: '',
      quantity: 0,
      price: 0,
      date: '',
      isCh: true,
    }],
  };
  portfolioData.value = {
    name: '포트폴리오',
    username: '',
    stocks: [],
    isEditing: false,
    editName: '',
  };
};

//주식 검색을 위한 설정
const isListVisible = ref(false);
const activeListType = ref(''); // 클릭한 리스트 타입 (생성 : create, 수정 : portfolio)
const showList = (index, type) => {
  isListVisible.value = index;
  activeListType.value = type; // 클릭한 리스트 타입
};
//주식 검색(TODO: 백엔드 검색으로 전환하므로 삭제)
/*
const filteredStocks = computed(() => {
  const sourceData = activeListType.value === 'portfolio' ? portfolioData.value.stocks : stockData.value.stocks;
  //console.log("sourceData:", sourceData);
  //console.log("stocks:", stocks.value);

  return sourceData.map((stock) => {
    const searchQuery = stock.name.toLowerCase();
    return stocks.value.filter((s) =>
      s.name.toLowerCase().includes(searchQuery) ||
      s.code.toLowerCase().includes(searchQuery)
    );
  });
});
*/
//주식 이름 지우기
const nameRemove = (dataType, index) => {
  if (dataType === 'create') {
    stockData.value.stocks[index].name = '';
  } else if (dataType === 'update') {
    portfolioData.value.stocks[index].name = '';
  }
  isListVisible.value = false;
};

let isRequestInProgress = false; //Too many request 방지 플래그
const dataList = ref(1);
//기존 포트폴리오 받아오기
const loadPortfolio = async () => {
  if (isRequestInProgress) return; // 요청 진행 중이면 중단
  isRequestInProgress = true;

  try {
    if (isEditMode) {
      console.log("포트폴리오 불러오기");
      loadingStore.startLoading();
      await portCreate.getPortfolio(portStatus.value.username);  // 포트폴리오 데이터 불러오기

      const portfolio = portCreate.stocks || []; // stocks가 undefined일 경우 빈 배열로 초기화
      // 포트폴리오 이름과 유저 이름
      portfolioData.value.name = portCreate.name || "포트폴리오";
      // 주식 데이터 설정
      portfolioData.value.stocks = [...portfolio];
      dataList.value = portfolio.length; // 동적으로 입력 필드의 개수를 설정
    }
  } catch (error) {
    console.error("Error loading portfolio:", error);
  } finally {
    isRequestInProgress = false;
    loadingStore.stopLoading();
  }
};


const stocks = ref([]);
// 검색한 주식 리스트 가져오기
const searchStock = async (keyword) => {
  loadingStore.startLoading();
  stocks.value = await stockList.getStockListForSearch(keyword);
  loadingStore.stopLoading();
};

const selectStock = (nametarget, index, position) => {
  //const sourceData = activeListType.value === 'portfolio' ? portfolioData : stockData;
  //sourceData.value.stocks[index].name = stockName;
  stockData.value.stocks[index].name = stocks.value[position].name
  nametarget = stocks.value[position].name;
  stockData.value.stocks[index].code = stocks.value[position].code;
  //console.log("stockCode: "+ stockCode[position].code);
  //sourceData.value.stocks[index].code = stockCode[position].code;
  isListVisible.value = false;
};
// blur 시 목록 숨기기
const hideList = () => {
  setTimeout(() => {
    isListVisible.value = false;
    activeListType.value = ''; // 리스트 타입 초기화
  }, 100);
};

//+버튼을 누르면 포트폴리오 입력 추가
const addCount = ref(1);
const addBtn = () => {
  addCount.value++;
  stockData.value.stocks.push({
    name: '',
    quantity: 0,
    price: 0,
    date: '',
    isCh: true,
  });
}
// x 눌러서 주식 삭제 버튼
const stockDelete = (dataType, index) => {
  if (dataType === 'create') {
    // stockData에서 항목 삭제
    if (index >= 0 && index < stockData.value.stocks.length) {
      stockData.value.stocks.splice(index, 1);
      addCount.value = stockData.value.stocks.length; // 남은 항목 수 업데이트
    }
  } else if (dataType === 'portfolio') {
    // portfolioData에서 항목 삭제
    if (index >= 0 && index < portfolioData.value.stocks.length) {
      portfolioData.value.stocks.splice(index, 1);
    }
  } else {
    console.error('Invalid data type provided to stockDelete function');
  }
};

//입력한 주식 값 계산
const sum = computed(() => {
  let total = 0;

  // 포트폴리오 생성
  total += stockData.value.stocks.reduce((sum, stock) => {
    if (stock.isCh) {
      return sum + stock.quantity * stock.price;
    }
    return sum;
  }, 0);

  // 포트폴리오
  if (!portStatus.value) {
    total += portfolioData.value.stocks.reduce((sum, portStock) => {
      if (portStock.isCh) {
        return sum + portStock.quantity * portStock.price;
      }
      return sum;
    }, 0);
  }

  return total;
});

// Create 버튼 클릭 이벤트 (포트폴리오 생성)
const createBtn = async (index) => {
  // 입력값 검증
  const invalidStock = stockData.value.stocks.find(
    (stock) => !stock.name || stock.quantity <= 0 || stock.price <= 0 || !stock.date
  );

  if (invalidStock) {
    toast("비어있는 필드 존재", {
      theme: "auto",
      type: "error",
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
    });
    return; // 함수 중단
  }

  //정상 입력
  loadingStore.startLoading();
  try {
    const response = await portCreate.setPortfolio({
      name: portfolioData.value.name,
      isPublic: true,
      acquisitionList: stockData.value.stocks.map(stock => ({
        name: stock.name,
        price: stock.price,
        code: stock.code,
        quantity: stock.quantity,
        date: stock.date
      }))
    });
    toast("Save!", {
      "theme": "auto",
      "type": "success",
      "position": "bottom-center",
      "autoClose": 1000,
      "hideProgressBar": true
    })
    setTimeout(() => {
      router.push(`/portfolio/detail/${response}`); //만들어진 포트폴리오 페이지로 이동
    }, 1000); // 1초 (autoClose와 같은 시간으로 맞춤)
  } catch (error) {
    toast("error", {
      "theme": "auto",
      "type": "error",
      "position": "bottom-center",
      "autoClose": 1000,
      "hideProgressBar": true
    })
    console.error(`Error creating stock at index ${index}:`, error);
  } finally {
    loadingStore.stopLoading();
  }
};

// 기존 주식 데이터 업데이트
const stockUpdate = async (index) => {
  loadingStore.startLoading();
  try {
    //const updatedStock = portfolioData.value.stocks[index];
    await portCreate.updatePortfolio({
      name: portfolioData.name,
      stocks: portfolioData.value.stocks
    });
    console.log(`Stock at index ${index} updated successfully`);
  } catch (error) {
    toast("Error!", {
      "theme": "auto",
      "type": "error",
      "position": "bottom-center",
      "autoClose": 1000,
      "hideProgressBar": true
    })
    console.error(`Error updating stock at index ${index}:`, error);
  } finally {
    loadingStore.stopLoading();
  }
};
// Update 버튼 클릭 이벤트 (포트폴리오 수정)
const updateBtn = async () => {
  // 입력값 검증
  const invalidPort = portfolioData.value.stocks.find(
    (stock) =>
      !stock.name || // name이 비어 있는 경우
      stock.quantity <= 0 || // quantity가 0 이하인 경우
      stock.price <= 0 || // price가 0 이하인 경우
      !stock.date // date가 비어 있는 경우
  );
  const invalidStock = stockData.value.stocks.find(
    (stock) =>
      !stock.name || // name이 비어 있는 경우
      stock.quantity <= 0 || // quantity가 0 이하인 경우
      stock.price <= 0 || // price가 0 이하인 경우
      !stock.date // date가 비어 있는 경우
  );
  if (invalidPort || invalidStock) {
    toast("비어있는 필드 존재", {
      theme: "auto",
      type: "error",
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
    });
    return; // 함수 중단
  }

  //정상 입력
  loadingStore.startLoading();
  try {
    // 새로 추가한 주식 데이터
    for (let i = 0; i < stockData.value.stocks.length; i++) {
      await createBtn(i); // 인덱스 기반으로 새 주식 데이터 생성
    }
    // 기존 포트폴리오 데이터 업데이트
    for (let i = 0; i < portfolioData.value.stocks.length; i++) {
      await stockUpdate(i); // 인덱스 기반으로 기존 데이터 업데이트
    }
    toast("Save!", {
      "theme": "auto",
      "type": "success",
      "position": "bottom-center",
      "autoClose": 1000,
      "hideProgressBar": true
    })
    setTimeout(() => {
      const portfolioIdx = 1; //TODO : 추후 포트폴리오 PK에 맞춰 수정
      router.push(`/portfolio/${portfolioIdx}`); //만들어진 포트폴리오 페이지로 이동
    }, 1000); // 1초 (autoClose와 같은 시간으로 맞춤)
  } catch (error) {
    toast("Error!", {
      "theme": "auto",
      "type": "error",
      "position": "bottom-center",
      "autoClose": 1000,
      "hideProgressBar": true
    })
    console.error('Error during update operation:', error);
  } finally {
    loadingStore.stopLoading();
  }
};

// 왼쪽영역
ChartJS.register(ArcElement, Tooltip, Legend);
// 포트폴리오 이름 편집 모드 활성화
const enableEditing = () => {
  portfolioData.value.editName = portfolioData.value.name; // 기존 이름을 불러옴
  portfolioData.value.isEditing = true;
};
// 이름 변경 적용 및 편집 모드 비활성화
const applyNameChange = () => {
  portfolioData.value.name = portfolioData.value.editName.trim(); // 이름 저장 (앞뒤 공백 제거)
  portfolioData.value.isEditing = false; // 편집 모드 비활성화
};
// 색상 팔레트 배열
const smartColors = [
  '#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0',
  '#673AB7', '#00BCD4', '#607D8B', '#3F51B5', '#E91E63'
];
// 이미 사용된 색상들을 저장할 배열 (주식 항목과 색상 매칭)
const usedColors = ref([]);
// 팔레트에서 랜덤 색상 생성 (중복 방지)
function generateUniqueColor() {
  let color;
  do {
    color = smartColors[Math.floor(Math.random() * smartColors.length)];
  } while (usedColors.value.includes(color)); // 이미 사용된 색상인지 체크
  usedColors.value.push(color); // 새로 생성된 색상을 사용된 색상 배열에 추가
  return color;
}
// 차트 데이터
const chartData = computed(() => {
  // 1. 체크된 항목만 필터링 (포트폴리오와 추가 항목 병합)
  const allCheckedStocks = [...portfolioData.value.stocks, ...stockData.value.stocks].filter(stock => stock.isCh);

  // 2. 주식 데이터를 그룹화 및 계산
  const groupedStocks = allCheckedStocks.reduce((acc, stock) => {
    const stockValue = stock.quantity * stock.price;
    const existingStock = acc.find(s => s.name === stock.name);
    if (existingStock) {
      existingStock.asset += stockValue;
    } else {
      acc.push({
        name: stock.name,
        asset: stockValue,
      });
    }
    return acc;
  }, []);

  // 3. 차트 데이터 생성
  const labels = groupedStocks.map(stock => stock.name);
  const data = groupedStocks.map(stock => stock.asset);
  const backgroundColor = labels.map((_, index) =>
    usedColors.value[index] || generateUniqueColor()
  );

  return {
    labels: labels.length > 0 ? labels : ['No Data'],
    datasets: [
      {
        data: data.length > 0 ? data : [0],
        backgroundColor,
        hoverBackgroundColor: backgroundColor,
      },
    ],
  };
});
//차트 설정
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      enabled: true,
    },
  }
});

const hideCenterTextPlugin = {// Chart.js 플러그인 추가, 도넛 중앙의 글씨 삭제
  id: 'hideCenterText', // 플러그인 ID
  beforeDraw(chart) {
    if (chart.config.type === 'doughnut') {
      const { ctx } = chart;
      ctx.save(); // 이전 상태 저장
      ctx.clearRect(0, 0, chart.width, chart.height); // 캔버스 전체를 지움
      ctx.restore(); // 상태 복원
    }
  },
};
ChartJS.register(hideCenterTextPlugin); // 플러그인 등록

</script>

<template>
  <div class="page-container">
    <div class="left-section"> <!-- Left Section -->
      <div class="chart_position">
        <div class="donut_name">
          <p v-if="!portfolioData.isEditing" @dblclick="enableEditing" class="editable-text"
            aria-placeholder="portfolio"> {{ portfolioData.name }} </p>
          <input v-model="portfolioData.editName" v-else type="text" @blur="applyNameChange"
            @keydown.enter="applyNameChange" class="editable-input" />
        </div>
        <div class="donut">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <div class="right-section"> <!-- Right Section -->
      <div class="field-labels"> <!-- Field Labels Row -->
        <div class="stock_check"></div>
        <div class="stock_name">Stock</div>
        <div class="stock_quantity">Quantity</div>
        <div class="stock_price">Price</div>
        <div class="stock_date">Date</div>
        <div class="stock_count">Count</div>
        <div class="stock_delete"></div>
      </div>
      <div id="field-wrapper">
        <!--포트폴리오 수정 페이지 - 저장된 포트폴리오 불러오기-->
        <div v-if="isEditMode" class="field-labels" v-for="(portStock, index) in portfolioData.stocks" :key="index">
          <div class="stock_check">
            <input type="checkbox" v-model="portStock.isCh" />
          </div>
          <div class="stock_name">
            <div class="stock_list">
              <input type="text" placeholder="Enter stock name" v-model="portStock.name"
                @focus="showList(index, 'portfolio')" @input="showList(index, 'portfolio')" @blur="hideList" />
              <img :class="['xmark', portStock.name === '' ? 'xmarkhide' : 'xmarkshow']" src="../images/x.svg"
                @click="nameRemove('update', index)" />
              <ul v-if="isListVisible === index && activeListType === 'portfolio'">
                <li v-if="stocks[index] === 0">검색 결과가 없습니다</li>
                <li v-for="(stock, i) in stocks[index]" :key="i" @click="selectStock(index, i)">
                  {{ stock.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="stock_quantity">
            <input type="number" placeholder="0" v-model="portStock.quantity" />
          </div>
          <div class="stock_price">
            <input type="number" placeholder="0" v-model="portStock.price" />
          </div>
          <div class="stock_date">
            <input type="date" v-model="portStock.date" />
          </div>
          <div class="stock_count_p">
            <p>{{ portStock.quantity * portStock.price }}</p>
          </div>
          <div class="stock_delete">
            <button @click="stockDelete('portfolio', index)" class="add-field-button"> X </button>
          </div>
        </div>
        <!--포트폴리오 생성 페이지-->
        <div class="field-labels" v-for="(stock, index) in stockData.stocks" :key="index">
          <div class="stock_check">
            <input type="checkbox" v-model="stock.isCh" />
          </div>
          <div class="stock_name">
            <div class="stock_list">
              <input type="text" placeholder="Enter stock name" v-model="stock.name" @change="searchStock(stock.name)" @focus="showList(index, 'create')"
                @input="showList(index, 'create')" @blur="hideList" />
              <img :class="['xmark', stock.name === '' ? 'xmarkhide' : 'xmarkshow']" src="../images/x.svg"
                @click="nameRemove('create', index)" />
              <ul v-if="isListVisible === index && activeListType === 'create'">
                <li v-if="stocks.length == 0">검색 결과가 없습니다</li>
                <li v-for="(s, i) in stocks" :key="i" @click="selectStock(stock.name, index, i)">
                  {{ s.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="stock_quantity">
            <input type="number" placeholder="0" v-model="stock.quantity" />
          </div>
          <div class="stock_price">
            <input type="number" placeholder="0" v-model="stock.price" />
          </div>
          <div class="stock_date">
            <input type="date" v-model="stock.date" />
          </div>
          <div class="stock_count_p">
            <p>{{ stock.quantity * stock.price }}</p>
          </div>
          <div class="stock_delete">
            <button @click="stockDelete('create', index)" class="add-field-button"> X </button>
          </div>
        </div>
        <!--FIX : 구매 금액 합계 동작 확인-->
        <div class="stock_sum">구매 금액 합계 : ${{ sum }}</div>
        <!--TODO : updateBtn 동작 확인(for문의 영역에 맞춰 각각 나눠서 반영이 되는지)-->
        <div class="field-input">
          <button v-if="isEditMode" @click=updateBtn class="add-field-button createBtn">Update</button>
          <button v-else @click="createBtn(addCount - 1)" class="add-field-button createBtn">Create</button>
          <button @click="addBtn" class="add-field-button addBtn">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './portCreate.css'
</style>