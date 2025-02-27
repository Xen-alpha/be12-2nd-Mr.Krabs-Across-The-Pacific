<script setup>
import { defineProps, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    portfolio:{
    type:Object,
    required: true}
});

const isBookmarked = props.portfolio.bookmark;

const heartsContainer = ref(null); // 하트 컨테이너 참조

const navigateToPortfolio = (idx) => {
    router.push(`/portfolio/detail/${idx}`);
};

const bookBtn = () => {
};
</script>

<template>
    <div class="inside">
        <!-- 뒤에 /:idx 추가 -> 전체 포트폴리오에서 클릭하면 이동  -->
        <!-- <a  class="portfolio" href="/portfolio/1">
            <img class="img" src="../images/sample.jpg" alt="Portfolio Image" />
        </a> -->
        <div class="portfolio" @click="navigateToPortfolio(portfolio.idx)">
            <div class="image-container">
            <img class="img base-img" src="../images/sample.jpg" alt="Base Image" />
            <img class="img overlay-img" src="../images//badge1.png" alt="Overlay Image" />
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
                <button v-if="!isBookmarked" @click.prevent="onWishButton(book)" class="bookmark">
                    <img id="starIcon" src="../images/black-star-filled.svg" />
                </button>
                <button v-if="isBookmarked" @click.prevent="onWishButton(book)" class="bookmark">
                    <img id="starIcon" src="../images/yellow-star-filled.svg"/>
                </button>
            </div>
        </div>                
    </div>

</template>


<style>
    @import './main.css'
</style>