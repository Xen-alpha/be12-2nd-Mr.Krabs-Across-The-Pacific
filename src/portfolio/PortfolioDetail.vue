<script setup>
import { ref, onMounted, watch } from 'vue';
import PortfolioReply from './PortfolioReply.vue';
import PortfolioStock from './PortfolioStock.vue';
import PortfolioPieChart from './PortfolioPieChart.vue';
import PortfolioAreaChart from './PortfolioAreaChart.vue';
import { usePortfolioDetailStore } from '../stores/usePortfolioDetailStore';
import { usePortfolioRepliesStore } from '../stores/usePortfolioRepliesStore';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const portfolioDetailStore = usePortfolioDetailStore();
const portfolioRepliesStore = usePortfolioRepliesStore();

const portfolioStocks = ref([]);
// const portfolioReplies = ref([]);

const portfolioDetail = ref({
  idx:'',
  name:'',
  own:'',
  profileImage:'',
  acquisitionList:[]
})

const portfolioReplies = ref([]);
const page = ref(0); // 현재 페이지 번호
const size = 10; // 한 번에 불러올 개수

onMounted(async () => {
    // Portfolio detail 데이터 가져오기
    // await portfolioDetailStore.getportfolioDetail(route.params.idx);
    // await portfolioRepliesStore.getPortfolioRepliesByCreatedAt(route.params.idx);
    // console.log("Portfolio Detail Loaded:", portfolioDetailStore.portfolioItem);

    // const response =  await portfolioDetailStore.getPortfolioDetail(route.params.idx);
    // console.log("포트폴리오 이름 : ", response.name);
    // result.value.name = response.name;
    
    // Portfolio replies 데이터 가져오기
    // portfolioReplies.value = await portfolioRepliesStore.getPortfolioRepliesByCreatedAt(route.params.idx);
    // console.log("Portfolio Replies Loaded:", portfolioReplies.value);
    portfolioStocks.value = portfolioDetailStore.portfolioItem.portfolio_quantity || {};
    // portfolioReplies.value = portfolioRepliesStore.portfolioReplies || [];


    //포트폴리오 상세 정보 가져오기
    await portfolioDetailStore.getPortfolioDetail(route.params.idx);
    portfolioDetail.value = portfolioDetailStore.result;
    // 포트폴리오 댓글 가져오기 (초기 로드)
    // await loadReplies();
});

const loadReplies = async $state => {
  try {
    const response = await portfolioRepliesStore.getPortfolioRepliesByCreatedAt(route.params.idx, page.value, size);
    if (response.length < 1) {
      console.log("더 이상 불러올 데이터 없음.");
      $state.complete();
    }else{
      portfolioReplies.value.push(...response);
      // portfolioReplies.value = [...portfolioReplies.value, ...response];
      $state.loaded();
    }
    page.value++;
  } catch (error) {
    console.error("댓글 불러오기 실패:", error);
    $state.error();
  }
};


// 포트폴리오 댓글 불러오기 (페이지네이션)
// const loadReplies = async () => {
//   if (isLoading.value || !portfolioReplies.value.hasNext) return; // 중복 요청 방지, 다음 페이지 없으면 중단
//   isLoading.value = true;

//   try {
//     await portfolioRepliesStore.getPortfolioRepliesByCreatedAt(route.params.idx, page.value, size);

//     const newReplies = portfolioRepliesStore.result.content;
//     portfolioReplies.value.content.push(...newReplies); // 기존 댓글 목록에 추가
//     portfolioReplies.value.hasNext = portfolioRepliesStore.result.hasNext; // 다음 페이지 여부 업데이트

//     if (portfolioReplies.value.hasNext) {
//       page.value++; // 다음 페이지 증가
//     }
//   } catch (error) {
//     console.error("댓글 불러오기 실패:", error);
//   } finally {
//     isLoading.value = false;
//   }
// };



const newReplyContent = ref(""); // 새 댓글 내용
// 댓글 내용 업데이트 핸들러
const updateContent = (event) => {
  newReplyContent.value = event.target.innerText; // contenteditable의 텍스트 추출
};

const submitReply = async () => {
  if (!newReplyContent.value.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }

  const newReply = {
    userName: "현재 사용자", // 사용자 이름
    content: newReplyContent.value,
    createdAt: new Date().toISOString(), // 현재 시간
    updatedAt: new Date().toISOString(),
  };

  try {
    await portfolioRepliesStore.setPortfolioReply(route.params.idx, newReply);
    newReplyContent.value = ""; // 댓글 입력창 초기화
    alert("댓글이 성공적으로 저장되었습니다.");
  } catch (error) {
    alert("댓글 저장 중 오류가 발생했습니다.");
  }
};

const username = '멍자';
// const updateBtn = () => {
//   router.push({
//     path: '/editport',
//     state: { username:"멍자", portfolioIdx: 1, portStatus: false},
//   });
// };
const updateBtn = () => {
  router.push({
    name: 'Portfolio', // 라우트 이름
    params: { mode: 'update' },
    state: { username:"멍자", portfolioIdx: 1,}
  });
};

const deleteBtn = () => {
  const isConfirmed = confirm('정말로 삭제하시겠습니까?');
  if (isConfirmed) {
    router.push({
      path: `/portfoliolist/${username}`
    });
  }
};

</script>

<template>
  <div class="container">
    <div id="page-top">
      <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content1">
            <!-- Begin Page Content -->
            <!-- 만약 페이지 구성 이상해지면  class="container-fluid1 를 class="container-fluid 로 변경-->
            <div class="container-fluid1">
              <!-- Page Heading -->
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <router-link :to="`/portfoliolist/${username}`">
                  <img alt="profile" fetchpriority="high" width="128" height="128" decoding="async" data-nimg="1"
                    style="color:transparent" :src="portfolioDetail.profileImage || '/images/멍자.png'"  />
                </router-link>
                <div>
                  <h1 class="h3 mb-0 text-gray-800">{{ portfolioDetail.name }}</h1>
                </div>
                <div>
                  <button v-if="portfolioDetail.own" class="updateBtn" @click="updateBtn">수정</button>
                  <button v-if="portfolioDetail.own" class="deleteBtn" @click="deleteBtn">삭제</button>
                </div>
              </div>
              <!-- Content Row -->
              <div class="row">
                <!-- Earnings (Monthly) Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            STARTED WITH(투자 금액)</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Earnings (Monthly) Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                            CURRENT ASSETS(현재 자산)</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Earnings (Monthly) Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-info shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-info text-uppercase mb-1">PROFIT
                            RATE(수익률)
                          </div>
                          <div class="row no-gutters align-items-center">
                            <div class="col-auto">
                              <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">+112%</div>
                            </div>
                            <div class="col">
                              <div class="progress progress-sm mr-2">
                                <div class="progress-bar bg-info" role="progressbar" style="width: 50%"
                                  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pending Requests Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            RATINGS(평가 손익)</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-comments fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Content Row -->

              <div class="row">
                <!-- Pie Chart -->
                <div class="col-xl-8 col-lg-7">
                  <div class="card shadow mb-4">
                    <!-- Card Header - Dropdown -->
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                      <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                          aria-labelledby="dropdownMenuLink">
                          <div class="dropdown-header">Dropdown Header:</div>
                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body" style="white-space:pre-wrap; overflow-wrap: break-word;">
                      <PortfolioPieChart />
                    </div>
                  </div>
                </div>
                <!-- Portfolio 종목 Column (6/12) -->
                <div class="col-xl-4 col-lg-5">
                  <!-- 포트폴리오 종목 카드 -->
                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <PortfolioStock :portfolioStocks="portfolioDetailStore.portfolioItem.portfolio_Stocks" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


              </div>
              <!-- Content Row -->
              <div class="row">
                <!-- Area Chart -->
                <div class="col-xl-12 col-lg-12">
                  <div class="card shadow mb-4">
                    <!-- Card Header - Dropdown -->
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                      <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                          aria-labelledby="dropdownMenuLink">
                          <div class="dropdown-header">Dropdown Header:</div>
                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body" style="white-space:pre-wrap; overflow-wrap: break-word;">
                        <PortfolioAreaChart />
                    </div>
                  </div>
                </div>

      </div>

      <!-- Reply -->
      <div class="reply">
        <div class="compose-wrapper">
          <div class="avatar">
            <span class="user user--refresh">
              <!-- 아바타 -->
            </span>
          </div>
          <div class="textarea-outer-wrapper textarea-outer-wrapper--refresh">
            <div class="textarea-wrapper textarea-wrapper--embedv2" data-role="textarea" dir="auto">
              <div class="_container_ylcfx_1">
                <div class="_editor-container-expanded_ylcfx_37">
                  <!-- Placeholder -->
                  <div class="_placeholder_s9avi_1" v-if="!newReplyContent.trim()">댓글을 입력하세요</div>

                  <!-- Contenteditable div -->
                  <div role="textbox" aria-multiline="true" class="_editor-expanded_ylcfx_13 border" spellcheck="true"
                    data-slate-editor="true" data-slate-node="value" contenteditable="true" zindex="-1"
                    style="background-color: white; position: relative; white-space: pre-wrap; overflow-wrap: break-word;"
                    @input="updateContent"></div>
                </div>
                <div class="container-btn _toolbar_k0g7a_47">
                  <div class="_toolbar-primary_k0g7a_51">
                    <div class="_actions_k0g7a_78">
                      <button @click="submitReply"
                        class="comment-btn _button_8fv5d_1 _button-fill_8fv5d_15 _submit_k0g7a_84 bt" type="button">
                        <span class="_submit-text_k0g7a_122" style="color: white;">Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="reply-section-title">댓글</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Approach -->
          <PortfolioReply v-for="reply in portfolioReplies" :reply="reply" :key="reply.idx" />
          <!-- <InfiniteLoading @infinite="loadReplies"/> -->
          <InfiniteLoading @infinite="loadReplies">
            <template #complete><div></div></template>
          </InfiniteLoading>
        </div>

        <!-- /.container-fluid -->

      </div>
    </div>
    <!-- End of Main Content -->


  </div>

</template>



<style scoped>
@import '../common/sb-admin-2.min.css';
@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';
@import './portfolioDetail.css'
</style>