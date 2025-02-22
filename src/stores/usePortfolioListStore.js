import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioListStore = defineStore("portfolioList", {
    state: () => ({
        portfolios: [],
        isLoading: false, // 로딩 상태
        error: null, // 에러 상태
        pagination: {
            page: 1,
            size: 15,
            totalElements: 0,
            totalPages: 0,
            hasNext: false,
            hasPrevious: false,
        },
    }),
    actions: {
        async getPortfolioList(page, option) {
            this.isLoading = true;
            this.error = null;
            
            try {
                // ✅ sortBy 파라미터를 제거하여 백엔드 기본값 사용
                const response = await axios.get(`/api/portfolio/list?page=`+Number(page)+`&sort=`+option);
                
                if (response.data?.result) {
                    const { portfolioList, ...pagination } = response.data.result;
                    
                    this.portfolios = portfolioList; // 포트폴리오 목록
                    this.pagination = pagination; // 페이지네이션 데이터
                } else {
                    throw new Error("잘못된 응답 형식입니다.");
                }
            } catch (error) {
                this.error = error.message || "포트폴리오 목록을 불러오는 중 오류가 발생했습니다.";
                console.error("API 요청 실패:", this.error);
            } finally {
                this.isLoading = false;
            }
        },

        // 페이지 이동 시 호출
        async loadPage(pageNumber) {
            await this.getPortfolioList(pageNumber);
        }
    },
});