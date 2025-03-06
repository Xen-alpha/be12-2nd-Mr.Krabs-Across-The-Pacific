<script setup>
import Portfolio from './Portfolio.vue';
import { usePortfolioListStore } from '../stores/usePortfolioListStore';
import { ref, onMounted, computed, watch, watchEffect} from 'vue'
import { useLoadingStore } from '../stores/useLoadingStore'
import { useRoute } from "vue-router";

const selectedOption = ref('View');
const loadingStore = useLoadingStore();
const portfolioList = usePortfolioListStore();
const currentPage = ref(1);
const route = useRoute();

const loadPortfolioList = async () => {
    loadingStore.startLoading();
    if (route.query.keyword) { //포트폴리오 검색
        await portfolioList.searchPortfolioList(currentPage.value - 1, newKeyword);
    } else if (route.params.userIdx) { //userIdx를 이용한 특정 유저의 포트폴리오 목록 조회
        await portfolioList.getUserPortfolioList(currentPage.value - 1, selectedOption.value, route.params.userIdx);
    } else { //기본 페이지
        await portfolioList.getPortfolioList(currentPage.value - 1, selectedOption.value);
    }
    loadingStore.stopLoading();
};

// 🔹 정렬 옵션 변경 시 데이터 다시 불러오기
const selectOption = async (option) => {
    selectedOption.value = option;
    await loadPortfolioList();
};

// 🔹 라우트 변화 감지하여 자동 데이터 로드
watchEffect(loadPortfolioList);

const changePage = async (page) => {
    if (isLoading.value) return; // 중복 요청 방지
    currentPage.value = page;
    isLoading.value = true;    
    try {
        await loadPortfolioList();
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
    <div class="container">
        <router-view name="user" />
        <div class="p_type">
            <div class="p_category">Category</div>
            <div class="p_btn_group">
                <label data-cy="showView" class="btn_active" :class="{ selected: selectedOption === 'CreatedAt' }" @click="selectOption('CreatedAt')">
                    New
                </label>
                <label data-cy="showLikes" class="btn_active" :class="{ selected: selectedOption === 'View' }" @click="selectOption('View')">
                    View
                </label>
                <label data-cy="showBookM" class="btn_active" :class="{ selected: selectedOption === 'Bookmark' }" @click="selectOption('Bookmark')">
                    Bookmark
                </label>
            </div>
        </div>
        <hr class="line">
        <div class="outline">
            <Portfolio 
                v-for="(portfolio, index) in portfolioList.portfolios" 
                :key="index" 
                :portfolio="portfolio" 
            />
        </div>
        <!-- 페이징 버튼 -->
        <div class="pagination">
            <button :disabled="!portfolioList.pagination?.hasPrevious || isLoading" @click="changePage(currentPage-1)"><</button>
            <span>페이지 {{ currentPage }}  / {{ portfolioList.pagination?.totalPages }}</span>
            <button :disabled="!portfolioList.pagination?.hasNext || isLoading" @click="changePage(currentPage+1)">></button>
        </div>
    </div>
</template>

<style>
    @import './main.css'
</style>