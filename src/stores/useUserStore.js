import axios from "axios";
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
    state: () => ({ isLogin: false, userId: 0, image: "" }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async signup(email, password) {
            console.log("hi")
            const response = await axios
                .post("/api/user/signup", {
                    "email": email,
                    "password": password
                })
                .catch((error) => {
                    console.log(error);
                    return null;
                })
                console.log("hi")
        },
        async login(email, password) {
            const response = await axios
                //.get("/sample/auth/login.json", {
                //.post("/sample/auth/login.json", {
                .post("/api/login", {
                    "id": email,
                    "password": password
                },)
                .catch((error) => {
                    console.log(error);
                    return null
                })
            console.log(response);
            if (response === null) return false;
            this.userIdx = response.data.userIdx;
            //this.image = response.data.image;
            this.isLogin = true;
            return true;
        },

        async logout() {
            const response = await axios
                .get("/api/logout",)
                .catch((error) => {
                    console.error(error);
                    return null
                })
            console.log(response);
            this.userId = null;
            this.image = null;
            this.isLogin = false;
            if (response === null) return false;
            return true;
        },
        async checkLogin() {
            //axios
            //const response = await axios.get("/sample/auth/check.json", {
            const response = await axios.get("test/user/check", {
                withCredentials: true,
            }).catch((error) => {
                //console.error(error);
                console.log("hello");
            });
            if (response == null) return false;
            return true;
        },
        async getUserDetail(id) {
            //axios
        },

        async updateUserDetailReply(password, image) {
            //axios
        },
        async deleteUser() {
            //axios
        },

    }
})