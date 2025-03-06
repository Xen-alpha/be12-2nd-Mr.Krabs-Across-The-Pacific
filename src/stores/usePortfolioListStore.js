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
        portfolios: []
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
                    console.log("결과", response.data.result);
                } else {
                    throw new Error("잘못된 응답 형식입니다.");
                }
            } catch (error) {
                console.error;
            } finally {
                this.isLoading = false;
            }
        },
        async getPortfolioBookmark(idx, bookmark){
            this.isLoading = true;
            try {
                const response = await axios.post('/api/portfolio/bookmark', {
                    portfolioIdx: idx,
                    bookmark: bookmark
                });
                console.log(response.data);
                return response.data.result;
            } catch (error) {
                if(error.response.status === 403)
                    window.location.href = "/login";
                console.error;
            } finally {
                this.isLoading = false;
            }
        },
        async searchPortfolioList(page, keyword) {
            this.isLoading = true;
            try {
                const response = await axios.get(`/api/portfolio/search/${keyword}?page=`+Number(page));
                if (response.data?.result) {
                    const { portfolioList, ...pagination } = response.data.result;
                    this.portfolios = portfolioList; // 포트폴리오 목록
                    this.pagination = pagination; // 페이지네이션 데이터
                    console.log("결과", response.data.result);
                } else {
                    throw new Error("잘못된 응답 형식입니다.");
                }
            } catch (error) {
                console.error;
            } finally {
                this.isLoading = false;
            }
        },
    },
});