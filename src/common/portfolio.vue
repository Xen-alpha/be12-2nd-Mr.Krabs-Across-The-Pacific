<script setup>
import { defineProps, ref, reactive } from 'vue';

const props = defineProps({
  portfolio:{
    type:Object,
    required: true}
});

const isBookmarked = props.portfolio.bookmark;

const heartsContainer = ref(null); // 하트 컨테이너 참조
const bookBtn = () => {
};
</script>

<template>
    <div class="inside">
        <!-- 뒤에 /:idx 추가 -> 전체 포트폴리오에서 클릭하면 이동  -->
        <!-- <a  class="portfolio" href="/portfolio/1">
            <img class="img" src="../images/sample.jpg" alt="Portfolio Image" />
        </a> -->
        <router-link class="portfolio"
        :to="`/portfolio/${portfolio.idx}`" >
            <img class="img" src="../images/sample.jpg" alt="Portfolio Image" />
        </router-link>
        <div class="bottom">
            <div class="bottom_left">
                <div class="p_name">{{portfolio.name}}</div>
                <div class="badge">
                    <!--TODO : 포트폴리오 뱃지 데이터 가져오기-->
                    <img src="../images/badge1.webp" alt="badge1" class="badge_img">
                    <img src="../images/badge2.webp" alt="badge2" class="badge_img">
                    <img src="../images/badge3.webp" alt="badge3" class="badge_img">
                </div>
            </div>
            <div class="rate"> 평가 손익 : {{ portfolio.rate }}%</div>
            <div class="bottom_right">
                <p class="view">{{ portfolio.viewCnt }} 👀</p>
                <!-- <button class="bookmark" @click="bookBtn">♥️</button> -->
                <button v-if="!isBookmarked" @click.prevent="onWishButton(book)" class="bookmark">
                    <img id="starIcon" src="/images/black-star-filled.svg" />
                </button>
                <button v-if="isBookmarked" @click.prevent="onWishButton(book)" class="bookmark">
                    <img id="starIcon" src="/images/yellow-star-filled.svg"/>
                </button>
            </div>
        </div>                
    </div>

</template>


<style>
    @import './main.css'
</style>