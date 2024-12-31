<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const passwordconfirm = ref('');

const signup = async () => {
    //const result = await userStore.signup(email.value, password.value);
    //메인페이지로 보내기
    const currentPosition = router.options.history.state.position;
    console.log(currentPosition)
    router.push('./endsignup')
}

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
                                            <h1 class="font-weight-bold">Start ATP</h1>
                                        </div>
                                        <form novalidate="" class="ng-untouched ng-pristine ng-invalid">
                                            <div class="mb-3"><label for="emailInput" class="text-gray-600 small">Email
                                                    address</label>
                                                <input id="emailInput" data-cy="emailInput" type="email"
                                                    aria-describedby="emailHelp" formcontrolname="email" v-model="email"
                                                    class="input-control form-control-solid ng-untouched ng-pristine ng-invalid">
                                                <div class="invalid-feedback">Email required.
                                                </div>
                                            </div>
                                            <div style="display: flex; justify-content: space-between;">
                                                <div class="mb-3" style="width: 18em;">
                                                    <label for="passwordInput" class="small text-gray-600">
                                                        Password
                                                    </label>
                                                    <input id="passwordInput" data-cy="passwordInput" type="password"
                                                        formcontrolname="password" v-model="password"
                                                        class="input-control form-control-solid ng-untouched ng-pristine ng-invalid">

                                                    <div class="invalid-feedback">
                                                        Password required.
                                                    </div>
                                                </div>
                                                <div class="mb-3" style="width: 18em;">
                                                    <label for="passwordInput" class="small text-gray-600">
                                                        Password Confirm
                                                    </label>
                                                    <input id="passwordInput" data-cy="passwordInput" type="password"
                                                        formcontrolname="password" v-model="passwordconfirm"
                                                        class="input-control form-control-solid ng-untouched ng-pristine ng-invalid">

                                                    <div class="invalid-feedback">
                                                        Password do not match.
                                                    </div>
                                                </div>
                                            </div>




                                            <div class="mb-3 d-flex align-items-center" style="flex-direction: row-reverse;">
                                                <button type="button" class="btn btn-primary"
                                                    @click="signup()">Register</button>
                                            </div>
                                        </form>
                                        <p class="small pt-3">
                                            Welcome to Across The Pacific: Smart Stock Portfolio Web Site
                                        </p><!----><!---->
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