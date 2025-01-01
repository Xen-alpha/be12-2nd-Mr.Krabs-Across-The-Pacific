<script setup>
import { onMounted, ref, reactive } from "vue";
import { useUserStore } from "../stores/useUserStore.js";
import { useStockLikesStore } from "../stores/useStockLikesStore.js";

const userStore = useUserStore();

let name = ref("장원영");
let email = ref("example1@gmail.com");
let created = ref("2025-01-01");
let tier = ref("Bronze");
let portnum = ref(0);
let portlikes = ref(0);
let stocklikes = ref(0);

let stockLikesList = reactive({});

const stockLikesStore = useStockLikesStore();

onMounted(async () => {});
</script>
<template>
  <div id="userprofile">
    <div>내 정보</div>
    <div id="userimage"><img src="../images/badge3.webp" width="256" height="256" /></div>
    <div id="username">이름: {{ name }}</div>
    <div id="useremail">이메일: {{ email }}</div>
    <div id="usercreated">가입 일자: {{ created }}</div>
    <div id="usertier">유저 등급: {{ tier }}</div>
    <div id="userportfolio">나의 포트폴리오 수: <router-link to="/mylikes"></router-link>{{ portnum }}</div>
    <div id="userlikes-port">
      나의 포트폴리오 좋아요 수: <router-link to="/bookmarks">{{ portlikes }}</router-link>
    </div>
    <div id="userlikes-stock">
      나의 관심 주식 수: <router-link to="/mylikes">{{ stocklikes }}</router-link>
    </div>
  </div>
  <div style="text-align: center; margin: 1rem">
    <button class="modifyprofile">정보 수정</button>
    <br /><br />
    <button class="danger">회원 탈퇴</button>
  </div>
</template>
<style scoped>
#userprofile {
  text-align: center;
  padding: 8rem;
}

.modifyprofile {
  background-color: #4f74df;
  color: white;
  border-radius: 0.4rem;
}

.danger {
  background-color: red;
  color: white;
  border-radius: 0.4rem;
  border: 1px none;
}
</style>
