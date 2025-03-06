<script setup>
import { onMounted, ref, onUnmounted} from "vue";

import { useUserStore } from "../stores/useUserStore";
import { useRouter } from "vue-router";
import Login from "../user/Login.vue";

const searchQuery = ref("");
const router = useRouter();

const alerts = [
  {
    date: "December 12, 2019",
    message: "A new monthly report is ready to download!",
    icon: "fas fa-file-alt",
    bg: "bg-primary",
  },
  {
    date: "December 7, 2019",
    message: "$290.29 has been deposited into your account!",
    icon: "fas fa-donate",
    bg: "bg-success",
  },
  {
    date: "December 2, 2019",
    message: "Spending Alert: We've noticed unusually high spending for your account.",
    icon: "fas fa-exclamation-triangle",
    bg: "bg-warning",
  },
];

const userStore = useUserStore();
const goToMyPortfolio=()=>{
  const result = userStore.getUserDetail();
  console.log(result);
  if(result===null){
    router.push("/login")
  }
}


const searchPortfolio = () => {
  if (!searchQuery.value.trim()) {
    alert("검색어를 입력하세요.");
    return;
  }
  router.push({ path: "/", query: { keyword: searchQuery.value } }); // 검색어를 쿼리로 전달
};
const closeNavbar = () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show"); // Bootstrap의 'show' 클래스 제거
      }
    };

onMounted(() => {
      // 라우터 이벤트를 감지하여 Navbar 닫기
      const router = useRouter();
      router.afterEach(() => {
        closeNavbar();
      });
    });

// 로고 클릭 시 검색어 초기화
const resetSearch = () => {
  searchQuery.value = ""; // 검색어 상태 초기화
  router.push({ path: "/" }); // 🔥 keyword 파라미터 제거하여 전체 리스트 표시
};
</script>

<template>
  <nav class="navbar navbar-marketing navbar-expand-lg shadow bg-white navbar-light fixed-top">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand text-black"  @click="resetSearch">>
        <img src="../images/money.png" alt="Across The Pacific Logo"/>
        <span class="ms-2">Across The Pacific</span>
      </router-link>

      <!-- Toggle button for smaller screens -->
      <button
        type="button"
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>

      <!-- Navigation Menu -->
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <!-- Search Bar -->

        <!-- Main Navigation -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item dropdown no-arrow">
            <a id="navbarDropdownThemes" class="dropdown-toggle nav-link pointer" href="#" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Portfolio
              <!-- <font-awesome-icon :icon="['fas', 'chevron-right']" /> -->
            </a>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" @click="goToMyPortfolio">
                내 포트폴리오
              </button>
                <!-- <router-link :to="`/portfolio/list/${userIdx}`" class="dropdown-item"> 내 포트폴리오 </router-link> -->
              </li>
              <li>
                <router-link to="/bookmarks" class="dropdown-item"> 북마크 포트폴리오 </router-link>
              </li>
              <li>
                  <router-link :to="{ name: 'Portfolio', params: { mode: 'create' }, }" class="dropdown-item">
                  포트폴리오 생성
                </router-link  -link>
              </li>
              <li>
                <router-link to="/themes/landing-pages" class="dropdown-item"> 명예의 전당 </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown no-arrow">
            <a id="navbarDropdownTemplates" class="dropdown-toggle nav-link pointer" href="#" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Stock
              <!-- <font-awesome-icon :icon="['fas', 'chevron-right']" /> -->
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/stockList" class="dropdown-item"> 모든 주식 보기 </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="search-nobottom my-navbar-search navbar-nav">
          <form @submit.prevent="searchPortfolio" class="d-sm-inline-block form-inline vw-75 mw-100 navbar-search">
            <div class="input-group">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="검색어를 입력하세요"
                aria-label="Search"
              />
              <button class="btn btn-primary" type="button" 
              @click="searchPortfolio">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </button>
            </div>
          </form>
        </div>

        <div v-if="!userStore.isLogin" class="topbar-divider d-none d-sm-block"></div>
        <!-- Right-side items -->
        <!-- Notifications -->
        <div v-if="!userStore.isLogin" class="navbar-nav align-items-lg-center nav-right">
          <!-- Login Button -->
          <router-link to="/login" class="btn btn-primary mb-3 mb-lg-0"> Log In </router-link>
        </div>
        <div v-else class="navbar-nav align-items-lg-center nav-right">
          <li class="nav-item dropdown no-arrow mx-1" data-bs-toggle="dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <font-awesome-icon :icon="['fas', 'bell']" />
              <span class="badge badge-danger badge-counter">{{ alerts.length }}+</span>
            </a>
            <div class="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in">
              <h6 class="dropdown-header">Alerts Center</h6>
              <template v-for="(alert, index) in alerts" :key="index">
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <div class="me-3">
                    <div :class="['icon-circle', alert.bg]">
                      <i :class="alert.icon + ' text-white'"></i>
                    </div>
                  </div>
                  <div>
                    <div class="small text-gray-500">{{ alert.date }}</div>
                    <span class="font-weight-bold">{{ alert.message }}</span>
                  </div>
                </a>
              </template>
              <a class="dropdown-item text-center small text-gray-500" href="#"> Show All Alerts </a>
            </div>
          </li>

          <div class="topbar-divider d-none d-sm-block"></div>
          <div>
            <li class="nav-item dropdown no-arrow">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img class="img-profile rounded-circle" :src="userStore.image" />
              </a>

              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
                <router-link class="dropdown-item" to="/myprofile">
                  <font-awesome-icon :icon="['fas', 'user']" />
                  Profile
                </router-link>
                <router-link class="dropdown-item" to="/settings">
                  <font-awesome-icon :icon="['fas', 'gear']" />
                  Settings
                </router-link>
                <a class="dropdown-item" href="#">
                  <font-awesome-icon :icon="['fas', 'list']" />
                  Activity Log
                </a>
                <div class="dropdown-divider"></div>
                <button @click="userStore.logout()" class="dropdown-item">
                  <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                  Logout
                </button>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import "./navbar.css";
</style>
