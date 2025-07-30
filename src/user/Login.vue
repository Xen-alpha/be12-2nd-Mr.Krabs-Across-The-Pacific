<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const login = async () => {
    const result = await userStore.login(email.value, password.value);
    console.log(result);
    //메인페이지로 보내기
    if (result) {
        router.go(-1);
    }
    email.value = '';
    password.value = '';
}

</script>

<template>
    <div id="layoutAuthentication" class="bg-primary">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div size="large" style="display: flex;justify-content: center;">
                            <div class="col-xl-10 col-lg-12" style="display: flex;justify-content: center;">
                                <div class="main-card">
                                    <div class="card-body under">
                                        <div class="row justify-content-center">
                                            <div class="col-xl-8 col-lg-9">
                                                <form novalidate="" class="ng-untouched ng-pristine ng-invalid">
                                                    <div class="mb-3"><label for="emailInput"
                                                            class="text-gray-600 small">이메일 주소(테스트 계정: senouis@gmail.com)</label>
                                                            <input id="emailInput" data-cy="emailInput"
                                                            type="email" aria-describedby="emailHelp"
                                                            formcontrolname="email" v-model="email"
                                                            class="input-control form-control-solid ng-untouched ng-pristine ng-invalid">
                                                        <div class="invalid-feedback">이메일이 필요합니다.
                                                        </div>
                                                    </div>

                                                    <div class="mb-3"><label for="passwordInput"
                                                            class="small text-gray-600">비밀번호(테스트 계정: example1)</label><input
                                                            id="passwordInput" data-cy="passwordInput" type="password"
                                                            formcontrolname="password" v-model="password"
                                                            class="input-control form-control-solid ng-untouched ng-pristine ng-invalid">
                                                        <div class="invalid-feedback">비밀번호가 필요합니다.
                                                        </div><!----><!---->
                                                    </div>
                                                    <div class="mb-3">
                                                        <a routerlink="/auth/password-reset-request"
                                                            href="/auth/password-reset-request">비밀번호를 잊었나요?</a>
                                                    </div>



                                                    <div class="mb-3 d-flex align-items-center justify-content-between">
                                                        <div class="form-check form-check-solid custom-checkbox">
                                                            <!-- TODO: 쿠키로 이거 만들기
                                                            <input id="checkInput" data-cy="checkInput" type="checkbox"
                                                                formcontrolname="checkbox"
                                                                class="form-check-input small ng-untouched ng-pristine ng-valid">
                                                                
                                                                <label
                                                                for="checkInput" class="form-check-label">패스워드를 기억합니다</label>-->
                                                        </div><button type="button" class="btn btn-primary" @click="login()">로그인</button>
                                                    </div>
                                                </form>
                                                <p class="small pt-3">
                                                    <router-link :href="'/privacy'" target="_blank"
                                                        rel="noreferrer">개인정보 처리방침
                                                    </router-link>
                                                </p><!--약관 넣어야 하나?-->
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="my-0">
                                    <div class="card-body px-5 py-4">
                                        <div class="small text-center">
                                            <router-link to="/signup">회원가입은 여기로!</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
@import './login.css';
</style>