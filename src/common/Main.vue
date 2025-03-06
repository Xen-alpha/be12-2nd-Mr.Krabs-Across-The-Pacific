<script setup>
import Portfolio from './Portfolio.vue';
import { usePortfolioListStore } from '../stores/usePortfolioListStore';
import { ref, onMounted, computed } from 'vue'
import { useLoadingStore } from '../stores/useLoadingStore'

const selectedOption = ref('View');
const loadingStore = useLoadingStore();
const portfolioList = usePortfolioListStore();
const currentPage = ref(1);

// 페이지 로딩 시 포트폴리오 목록 불러오기
onMounted(async () => {
    loadingStore.startLoading();
    await portfolioList.getPortfolioList(currentPage.value-1, 'View');
    loadingStore.stopLoading();
});

// 정렬 옵션 선택 시 데이터를 다시 불러오기
const selectOption = async (option) => {
    selectedOption.value = option;
    loadingStore.startLoading();
    await portfolioList.getPortfolioList(currentPage.value-1, selectedOption.value);
    loadingStore.stopLoading();
};

const changePage = async (page) => {
    if (isLoading.value) return; // 중복 요청 방지
    currentPage.value = page;
    isLoading.value = true;    
    try {
        await portfolioList.getPortfolioList(currentPage.value - 1, selectedOption.value);
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