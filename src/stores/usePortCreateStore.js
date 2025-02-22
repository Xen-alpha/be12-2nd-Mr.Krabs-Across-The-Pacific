import { defineStore } from 'pinia';
import axios from 'axios';

export const usePortCreateStore = defineStore('portcreate', {
    state: () => ({
       
    }),

    actions: {
        //포트폴리오 생성
        async setPortfolio(payload) {
            try {
                this.isLoading = true; // 로딩 상태 시작
                const response = await axios.post(`/api/portfolio/register`, payload);
                return response.data.result;
            } catch (error) {
                console.log("code : ", response.data.code);
                console.log("message : ", response.data.message);
                throw error;
            } finally {
                this.isLoading = false; // 로딩 상태 종료
            }
        },
        
        //PortCreate.vue에서 포트폴리오 업데이트를 위한 포트폴리오 정보 불러오기
        async getPortfolio(username) {
            try {
                this.isLoading = true; // 로딩 상태 시작
                const response = await axios.get("/sample/createdportfolioList.json");
                // username과 일치하는 유저 검색
                const user = response.data.find(user => user.username === username);
                if (user) { // 일치하는 유저 정보 세팅
                    this.name = user.name;
                    this.username = user.username;
                    this.stocks = user.stocks;
                } else { // 유저가 없는 경우
                    console.error(`User with username "${username}" not found.`);
                }
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }finally {
                this.isLoading = false; // 로딩 상태 종료
            }
        },

        //포트폴리오 수정
        async updatePortfolio(payload) {
            try {
                this.isLoading = true; // 로딩 상태 시작
                const response = await axios.put('/sample/createdportfolioList.json', payload);
                // 수정된 데이터를 state에 반영
                this.name = payload.name; 
                this.stocks = payload.stocks;
                return response.data[0].idx; //TODO : 추후 DB 형식에 맞춰서 수정
            } catch (error) {
                console.error('Error updating portfolio:', error);
                throw error;
            }finally {
                this.isLoading = false; // 로딩 상태 종료
            }
        },
    },
})