<script setup>
import { defineProps, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { usePortfolioDetailStore } from '../stores/usePortfolioDetailStore';
import { usePortfolioListStore } from '../stores/usePortfolioListStore';

const portfolioList = usePortfolioListStore();
const router = useRouter();
const portfolioDetail = usePortfolioDetailStore();

const props = defineProps({
    portfolio:{
    type:Object,
    required: true}
});

const isBookmarked = ref(props.portfolio.bookmark);

const navigateToPortfolio = async (idx) => {
    await portfolioDetail.getPortfolioDetail(idx);
    router.push(`/portfolio/detail/${idx}`);
};

const bookmarkBtn = async (idx, bookmark) => {
    await portfolioList.getPortfolioBookmark(idx, bookmark);
    isBookmarked.value = !isBookmarked.value;
};
</script>

<template>
    <div class="inside">
        <div class="portfolio">
            <div class="image-container">
                <img class="img base-img" @click="navigateToPortfolio(portfolio.idx)" src="../images/sample.jpg" alt="Base Image" />
                <div class="badge-container">
                <!-- badgeList가 비어있지 않은 경우에만 렌더링 -->
                    <div v-if="portfolio.badgeList && portfolio.badgeList.length > 0">
                        <!-- badgeList 배열을 순회 -->
                        <div v-for="badge in portfolio.badgeList" :key="badge.idx">
                            
                            <!-- Badge idx에 따라 다른 이미지를 표시 -->
                            <template v-if="badge.idx === 1">
                                <img class="badge-img" src="../images/badge1.png" alt="Badge 1" />
                            </template>
                            <template v-else-if="badge.idx === 2">
                                <img class="badge-img" src="../images/badge2.png" alt="Badge 2" />
                            </template>
                            <template v-else-if="badge.idx === 3">
                                <img class="badge-img" src="../images/badge3.png" alt="Badge 3" />
                            </template>
                            <template v-else>
                                <!-- idx가 예상하지 않은 값일 때 기본 이미지 또는 빈 요소 처리 -->
                                <img class="badge-img" src="../images/default-badge.png" alt="Default Badge" />
                            </template>

                        </div>
                    </div>
                </div>
                <button v-if="!isBookmarked" @click="bookmarkBtn(portfolio.idx, isBookmarked)" class="bookmark">
                    <!-- <img id="starIcon" src="../images/white-star.svg" class="bookmarkImg"/> -->
                </button>
                <button v-if="isBookmarked" @click="bookmarkBtn(portfolio.idx, isBookmarked)" class="bookmark bookmarkTrue">
                    <!-- <img id="starIcon" src="../images/yellow-star-filled.svg"/> -->
                </button>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_left">
                <div class="p_name">{{portfolio.name}}</div>
                <div class="rate"> 평가 손익 : {{ portfolio.rate }}%</div>
            </div>
            <div class="bottom_right">
                <p class="view">{{ portfolio.viewCnt }} 👀</p>
                <!-- <button class="bookmark" @click="bookBtn">♥️</button> -->
            </div>
        </div>                
    </div>

</template>


<style>
    @import './main.css'
</style>