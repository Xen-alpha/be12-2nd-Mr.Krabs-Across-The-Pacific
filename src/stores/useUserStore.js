import axios from "axios";
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
    state: () => ({ isLogin: false, userId: 0, image: "" }),
    persist: {
        storage: sessionStorage,
    },
    getter:{
        userId: (state) => state.userId
    },
    actions: {
        async login(email, password) {
            const response = await axios
                .post("/api/login", {
                //.post("/sample/auth/login.json", {
                    "id": email,
                    "password": password
                })
                .catch((error) => {
                    console.log(error);
                    return null
                })
            console.log(response);
            if (response === null) return false;
            this.userId = response.data.result.idx;
            this.image = response.data.result.image;
            this.isLogin = true;
            return true;
        },

        async logout() {
            const response = await axios
                .get("/sample/auth/logout.json",)
                .catch((error) => {
                    console.error(error);
                    return null
                })
            console.log(response);
            if (response === null) return false;
            this.userId = null;
            this.image = null;
            this.isLogin = false;
            return true;
        },
        async checkLogin() {
            //axios
            const response = await axios.get("/sample/auth/check.json", {
                withCredentials: true,
            }).catch((error) => {
                //console.error(error);
                console.log("hello");
            });
            if (response == null) return false;
            return true;
        },
        async getUserDetail() {
            //axios
            try {
                const response = await axios.get('/api/user/mypage');
                return response.data.result;
            } catch (e) {
                console.log("에러:"+ e.message);
                return null;
            }
        },

        async updateUserDetailReply(password, image) {
            //axios
        },
        async deleteUser() {
            //axios
        },

    }
})