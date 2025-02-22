import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioListStore = defineStore("portfolioList", {
    state: () => ({
        isLoading: false, // 로딩 상태
        pagination: {
            page: 1,
            size: 15,
            totalElements: 0,
            totalPages: 0,
            hasNext: false,
            hasPrevious: false,
        },
        portfolios: [],
    }),
    actions: {
        async getPortfolioList(page, option) {
            this.isLoading = true;
            try {
                const response = await axios.get(`/api/portfolio/list?page=`+Number(page)+`&sort=`+option);
                if (response.data?.result) {
                    const { portfolioList, ...pagination } = response.data.result;
                    this.portfolios = portfolioList; // 포트폴리오 목록
                    this.pagination = pagination; // 페이지네이션 데이터
                } else {
                    throw new Error("잘못된 응답 형식입니다.");
                }
            } catch (error) {
                console.log("code : ", response.data.code);
                console.log("message : ", response.data.message);
            } finally {
                this.isLoading = false;
            }
        }
    },
});