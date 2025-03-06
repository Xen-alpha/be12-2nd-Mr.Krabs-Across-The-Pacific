<script setup>
import { defineProps, ref, reactive, computed} from 'vue';
import { useRouter } from 'vue-router';
import { usePortfolioDetailStore } from '../stores/usePortfolioDetailStore';
import { usePortfolioListStore } from '../stores/usePortfolioListStore';
import { useUserStore } from "../stores/useUserStore";

const portfolioList = usePortfolioListStore();
const router = useRouter();
const portfolioDetail = usePortfolioDetailStore();
const userStore = useUserStore();

const props = defineProps({
    portfolio:{
    type:Object,
    required: true}
});

const isBookmarked = ref(props.portfolio.bookmark);

const navigateToPortfolio = async (idx) => {
    await portfolioDetail.getPortfolioViewCnt(idx);
    router.push(`/portfolio/detail/${idx}`);
};

const bookmarkBtn = async (idx, bookmark) => {
    const result = await portfolioList.getPortfolioBookmark(idx, bookmark);
    isBookmarked.value = result;
};

// 뱃지 표시를 위한 함수
const badgeList = (badges) => computed(() => 
    (badges !== undefined && badges !== null) // ❗ undefined/null 체크
    ? [...badges.toString(2)]
        .reverse()
        .reduce((acc, bit, index) => (bit === '1' ? [...acc, index] : acc), [])
    : []
);

</script>

<template>
    <div class="inside">
        <div class="portfolio">
            <div class="image-container">
                <img class="img base-img" @click="navigateToPortfolio(portfolio.idx)" src="../images/sample.jpg" alt="Base Image" />
                <!-- badgeList가 비어있지 않은 경우에만 렌더링 -->
                    <div v-if="portfolio.badges!==0" class="badge-container">
                        <div v-for="badge in badgeList(portfolio.badges).value" :key="badge">
                            <!-- Badge idx에 따라 다른 이미지를 표시 -->
                            <div class="badge-img">
                                <img v-if="badge === 1"  src="../images/badge1.png" alt="Badge 1" />
                                <img v-else-if="badge === 2"  src="../images/badge2.png" alt="Badge 2" />
                                <img v-else-if="badge === 3" src="../images/badge3.png" alt="Badge 3" />
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