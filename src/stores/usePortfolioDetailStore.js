import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioDetailStore = defineStore("portfolioDetail", {
  state: () => ({
    result:{
      idx:'',
      name:'',
      acquisitionList:[],
    },
    portfolioItem: 
    {
      "idx": 1,
      "name": "My First Portfolio",
      "created_at": "2024-10-02 00:00:00",
      "updated_at": "2024-10-05 12:00:00",
      "author": "User123",
      "acquisitionList": [ // TODO: acquisitionList로 변경
          {
              "image": "https://images.therich.io/images/logo/us/AAPL.png",
              "name": "Apple",
              "stockCode": "AAPL",
              "quantity": 5
          },
          {
              "image": "https://images.therich.io/images/logo/us/MSFT.png",
              "name": "Microsoft",
              "stockCode": "MSFT",
              "quantity": 30
          },
          {
              "image": "https://images.therich.io/images/logo/us/GOOGL.png",
              "name": "Google",
              "stockCode": "GOOGL",
              "quantity": 30
          },
          {
              "image": "https://images.therich.io/images/logo/us/TSLA.png",
              "name": "Tesla",
              "stockCode": "TSLA",
              "quantity": 80
          },
          {
              "image": "https://images.therich.io/images/logo/us/AMZN.png",
              "name": "Amazon",
              "stockCode": "AMZN",
              "quantity": 100
          }
      ],
      "total_profit": "$5,000",
      "total_dividend": "$500",
      "total_tax": "$100",
      "rank": 1
  },
  stockgraphList: []
  }),
  actions: {
    async getPortfolioDetail(idx) {
      try {
        const response = await axios.get(`/api/portfolio/${idx}`);
        if(response.data?.result){
          this.result = response.data.result;
          console.log("포트폴리오 정보 : ", this.result);
          return this.result;
        }else{
          throw new Error("잘못된 응답 형식입니다.");
        }
      } catch (error) {
        console.error("Error fetching portfolio details:", error);
      }
    },
    async getRecentPrice(code) {
      try {
        const response = await axios.get(`/api/stock/recent/${code}`);
        this.stockgraphList = response.data.result;
        return response.data.result;
      } catch (error) {
        console.error("Error fetching portfolio details:", error);
      }
    },
    async getPriceList(code) {
      try {
        const response = await axios.get(`/api/stockgraph/${code}` );
        return response.data.result;
      } catch (error) {
        console.error("Error fetching portfolio details:", error);
      }
    },

    //포트폴리오 클릭시 조회수 증가
    async getPortfolioViewCnt(idx) {
      try {
        await axios.get(`/api/portfolio/view/${idx}`);

      } catch (error) {
        console.error("Error fetching portfolio details:", error);
      }
    },
    async setportfolioDetail(idx) {
      // Implementation for creating a new portfolio detail
    },

    async updateportfolioDetail(idx) {
      // Implementation for updating an existing portfolio detail
    },

    setProfit(value) {
      this.portfolioItem.total_profit = value;
    },

  },
});
