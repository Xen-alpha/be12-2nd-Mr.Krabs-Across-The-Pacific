<script setup>
</script>
<template>
    <div id="layoutAuthentication" class="bg-primary">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="main-card" style="min-width: 650px;">
                        <div class="card-body under row justify-content-center">
                            <div class="col-xl-8 col-lg-9">
                                <div>
                                    <img src="../images/money.png" alt="Across The Pacific Logo" />

                                    <h1 class="font-weight-bold">Welcome! Now you can create<br> Your Own Portfolio</h1>
                                    <br>
                                    <router-link to="/login">로그인하러 가기</router-link><br>
                                    <router-link to="/">메인으로 돌아가기</router-link>  
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
@import './login.css';
</style>