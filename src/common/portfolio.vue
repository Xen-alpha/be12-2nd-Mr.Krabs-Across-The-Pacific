<script setup>
import { defineProps, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { usePortfolioDetailStore } from '../stores/usePortfolioDetailStore';

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

const bookmarkBtn = () => {
    isBookmarked.value = !isBookmarked.value;
    console.log(isBookmarked.value);
};
</script>

<template>
    <div class="inside">
        <!-- 뒤에 /:idx 추가 -> 전체 포트폴리오에서 클릭하면 이동  -->
        <!-- <a  class="portfolio" href="/portfolio/1">
            <img class="img" src="../images/sample.jpg" alt="Portfolio Image" />
        </a> -->
        <div class="portfolio">
            <div class="image-container">
            <img class="img base-img" @click="navigateToPortfolio(portfolio.idx)" src="../images/sample.jpg" alt="Base Image" />
            <img class="img overlay-img" src="../images/badge1.png" alt="Overlay Image" />
            <button v-if="!isBookmarked" @click="bookmarkBtn(portfolio.idx)" class="bookmark">
                <!-- <img id="starIcon" src="../images/white-star.svg" class="bookmarkImg"/> -->
            </button>
            <button v-if="isBookmarked" @click="bookmarkBtn(portfolio.idx)" class="bookmark bookmarkTrue">
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