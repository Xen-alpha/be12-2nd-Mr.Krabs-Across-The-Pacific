<script setup>
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  userIdx: String, // ✅ `params`에서 전달됨
});
// `query`에서 userName 가져오기
const userName = route.query.userName || "Guest"; // ✅ 기본값 설정 가능
</script>

<template>
  <div class="userProfile_block">
    <div class="userProfile_section">
      <div class="userProfile_left">
        <!--TODO : 링크 추가-->
        <a :href="`http://localhost:5173/portfolio/list/${userIdx}`">
          <img alt="profile" fetchpriority="high" width="128" height="128" decoding="async" data-nimg="1"
            style="color:transparent" src="/images/멍자.png">
        </a>
        <div class="userProfile_userinfo">
          <div class="userProfile_name">
            <!--TODO : 링크 추가-->
            <a :href="`http://localhost:5173/portfolio/list/${userIdx}`"> {{ userName }}</a>
          </div>
          <div class="userProfile_descripton">

          </div>
        </div>
      </div>
    </div>
    <hr class="line">
    <div class="userProfile_bottom">
      <div class="userProfile_followInfo">
        <!--TODO : 링크 추가-->
        <a class="userProfile_info" :href="`http://localhost:5173/portfolio/list/${userIdx}`">
          <span class="userProfile_number">0</span>
          <span class="userProfile_text">팔로워</span>
        </a>
        <!--TODO : 링크 추가-->
        <!--TODO : 링크 추가-->
        <a class="userProfile_info" :href="`http://localhost:5173/portfolio/list/${userIdx}`">
          <span class="userProfile_number">0</span>
          <span class="userProfile_text">팔로잉</span>
        </a>
      </div>
      <div class="userProfile_bottomSection">
        <div class="userProfile_icons"></div>
      </div>

    </div>

  </div>
</template>

<style scoped>
@import './userPort.css';
@import './main.css'
</style>