<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const userStore = useUserStore();

let userid = ref(route.params.username);

let username = ref("장원영");
let userimage = ref("../images/across_the_pacific.png")
let follower = ref(0);
let following = ref(0);

onMounted(async () => {
  const userinfo = await userStore.getUserDetail();
  console.log(userinfo);
  username.value = userinfo.name;
  if (userinfo.image !== "") userimage.value = userinfo.image;
  follower.value = userinfo.followers_count;
  following.value = userinfo.followings_count;
});


</script>

<template>
  <div class="userProfile_block">
    <div class="userProfile_section">
      <div class="userProfile_left">
        <!--TODO : 링크 추가-->
        <a :href="`http://localhost:5173/portfoliolist/${username}`">
          <img alt="profile" fetchpriority="high" width="128" height="128" decoding="async" data-nimg="1"
            style="color:transparent" :src=userimage>
        </a>
        <div class="userProfile_userinfo">
          <div class="userProfile_name">
            <!--TODO : 링크 추가-->
            <a :href="`http://localhost:5173/myprofile`">{{ username }}</a>
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
        <a class="userProfile_info" :href="`http://localhost:5173/portfoliolist/${username}`">
          <span class="userProfile_number">{{ follower }}</span>
          <span class="userProfile_text">팔로워</span>
        </a>
        <!--TODO : 링크 추가-->
        <!--TODO : 링크 추가-->
        <a class="userProfile_info" :href="`http://localhost:5173/portfoliolist/${username}`">
          <span class="userProfile_number">{{ following }}</span>
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