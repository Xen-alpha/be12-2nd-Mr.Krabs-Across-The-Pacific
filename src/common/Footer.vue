<script setup>
</script>
<template>
  <div id="footer">
    <div id="footer-logo"><img src='../images/money.png' style="filter: grayscale(1);padding:.5rem;" width="64"
        height="64">
      <p>Across The Pacific</p>
    </div>
    <div class="footer-menuline">
      <router-link to="/">홈</router-link><br>
      <router-link to="/about">소개</router-link><br>
      <router-link to="/privacy">개인정보처리방침</router-link><br>
    </div>
    <div class="footer-menuline">
      <router-link to="/portfolio">포트폴리오 보기</router-link><br>
      <router-link to="/stocklist">종목 보기</router-link><br>
    </div>
    <div id="footer-icons"></div>
  </div>
</template>
<style>
@import './footer.css'
</style>