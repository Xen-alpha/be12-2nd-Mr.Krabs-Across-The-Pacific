<script setup>
import { onMounted, ref, reactive } from "vue";
import { useUserStore } from "../stores/useUserStore.js";
import { useStockLikesStore } from "../stores/useStockLikesStore.js";

const userStore = useUserStore();
// 프로파일에 사용할 변수들
let image = ref("");
let oldpassword = ref("");
let newpassword = ref("");

image.value = userStore.image === "" ? "../images/badge3.webp" : userStore.image;

const oldPasswordInput = (ev) => {
  oldpassword.value = ev.target.value;
}

const newPasswordInput = (e) => {
  newpassword.value = ev.target.value;
}


onMounted(async () => {});
</script>
<template>
  <div style="position:relative;left:40%;width:40%;padding:8rem 0;">
    <div >
      <h2>이미지 바꾸기</h2>
      <div class="lineElement">현재 이미지: <img :src="image" width="128" height="128" /></div>
      <div class="lineElement">새 이미지:<input type="file" id="profileimage" /></div>
      <div class="lineElement"><button id="changeimage">이미지 변경</button></div>
    </div>
    <div style="margin-top:1rem;">
      <h2>비밀번호 변경</h2>
      <div class="lineElement">현재 비밀번호&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" id="oldpassword" /></div>
      <div class="lineElement">새 비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" id="newpassword" /></div>
      <div class="lineElement">새 비밀번호 다시 입력<input type="password" id="checknewpassword" /></div>
      <div class="lineElement"><button id="submitPasword">확인</button></div>
    </div>
  </div>
</template>
<style scoped>
.lineElement{
  padding:.5rem;
}

.danger {
  background-color: red;
  color: white;
  border-radius: 0.4rem;
  border: 1px none;
}
</style>
