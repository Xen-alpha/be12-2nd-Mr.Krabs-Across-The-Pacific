import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioListStore = defineStore("portfolioList", {
    state: () => ({
        portfolios: [],
        isLoading: false, // 로딩 상태 초기화
        error: null, // 에러 상태 추가
    }),
    actions: {
        async getPortfolioList() {
            try {
                const response = await axios.get("/api/portfolio/list");
                this.portfolios = response.data.result.portfolioList;
                this.isLoading = true;
            } catch (e) {
                this.error = e;
                this.isLoading = false;
            }
            
        },
    },
});