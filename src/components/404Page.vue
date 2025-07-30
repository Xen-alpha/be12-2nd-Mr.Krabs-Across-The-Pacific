<script>
// 아직 만들지 않은 URL은 이걸 기본값으로 두는 것을 추천함
export default {
  name: "Error404",
};
</script>
<template>
  <div class="errorpage">
    <div class="big-center">404 Not Found</div>
    <div class="small-center">요청한 리소스가 존재하지 않습니다.</div>
  </div>

</template>
<style scoped>
.errorpage {
  margin: 8rem;
  min-height: 320px;
}

.big-center {
  top: 80px;
  text-align: center;
  font-size: large;
}

.small-center {
  text-align: center;
  font-size: small;
}
</style>
