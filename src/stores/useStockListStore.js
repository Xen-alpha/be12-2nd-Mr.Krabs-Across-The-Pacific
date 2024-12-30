<<<<<<< HEAD
import { defineStore } from 'pinia';
import axios from 'axios';

export const useStockListStore = defineStore('stockList', {
    state: () => ({ 
        offset: 0, 
        requestType: "", 
        stockList: [
        {id:1, name:"Tesla", code:"TSLA", market:"nasdaq", price: "26000" }, 
        {id:2, name:"Apple Inc.", code:"AAPL", market:"nasdaq",  price: "46000" },
        {id:3, name:"Microsoft", code:"MSFT", market:"nasdaq",  price: "43200" }
        ],
        stocks: []
    }),
    getters: {
        stockListResult: (state) => state.stockList.slice(state.offset, state.offset + 30),
        stockListOffset: (state) => state.offset
    },
    actions: {
        async getStockListItem(id) {
        try { // TODO: URL 바꾸기
            return await axios.get(`https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/item`, {params:{
            id:id,
            }}).result.slice(offset, offset+ 30);
        } catch (e) {
            this.$state = {stockList:[]};
            return this.$state.stockList;
        }
        },
        async getStockList(offset=0, text="", requestType="") {
        try {
            // TODO: 서버 URL 교체 필요
            const response = await axios.get(`https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/list`, {params:{
            text: text,
            offset:offset,
            requestType:requestType
            }})
            // TODO: 조건에 따른 정렬 기능 추가?
            console.log(response.data);
            return response.data.result.slice(this.$state.offset, this.$state.offset + 30);        
        } catch (e) {
            console.log(e.message);
            this.$state = {stockList:[]};
            return this.$state.stockList;
        }
        },
        canSeePrev(){
        return this.$state.offset >= 30;
        },
        async getNextList() {
        return await this.getStockList(this.$state.offset + 30, this.$state.requestType);
        },
        async getPrevList() {
        if (this.$state.offset >= 30) {
            return await this.getStockList(this.$state.offset -30, this.$state.requestType);
        }
        return this.$state.stockList;
        },
        
        deleteStockList (id) { // Note: set과 update처럼 쓸모가 없는지 애매함
        this.$state.stockList[id] = null;
        return this.$state.stockList;
        },

        //NOTE: portCreate.vue를 위한 임시 주식 데이터
        async getStocks(){
            const response = await axios.get("/sample/stockList.json");
            this.stocks = response.data;
        }
        
    },
})
=======
import { defineStore } from "pinia";
import axios from "axios";

export const useStockListStore = defineStore("stockList", {
  state: () => ({
    offset: 0, // 페이지네이션 오프셋
    sortType: "ascending", // 정렬 기능 대비용 필드, 현재는 Mock 상태
    stockList: [
      { id: 1, name: "Tesla", code: "TSLA", market: "nasdaq", price: "26000", likes: 40, doILikeThis: false },
      { id: 2, name: "Apple Inc.", code: "AAPL", market: "nasdaq", price: "46000", likes: 16, doILikeThis: false },
      { id: 3, name: "Microsoft", code: "MSFT", market: "nasdaq", price: "43200", likes: 4, doILikeThis: false },
    ],
  }),
  getters: {
    stockListResult: (state) => state.stockList.slice(state.offset, state.offset + 30),
    stockListOffset: (state) => state.offset,
    stockListLikes: (state) => state.stockList.map((value) => value.doILikeThis),
  },
  actions: {
    async getStockListItem(id) {
      // 렌더링 및 링크 목적의 단일한 항목의 정보를 요청하여 반환
      try {
        // TODO: 크롤링 서버 URL로 바꾸기
        const response = await axios.get("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/item", {
          params: {
            id: id,
          },
        });
        // console.log(response.data);
        return response.data;
      } catch (e) {
        return this.stockList[id];
      }
    },
    async getStockList(offset = 0, text = "") {
      // 전체 리스트를 반환
      try {
        // TODO: 크롤링 서버 URL로 바꾸기
        const response = await axios.get("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/list", {
          params: {
            text: text,
            offset: offset,
          },
        });
        // console.log(response.data);
        // TODO: 조건에 따른 정렬 기능 추가?(아래는 좋아요 개수 많은 순서대로 정렬이 필요한 경우)
        // response.data.result.sort((a, b) => b.likes - a.likes);
        this.stockList = response.data;
        return response.data.result.slice(this.offset, this.offset + 30);
      } catch (e) {
        // console.log(e.message);
        this.stockList = [];
        return this.stockList;
      }
    },
    async getNextList() {
      // 다음 리스트로 페이지네이션을 위해 변경
      this.offset = this.offset + 30;
      try {
        return await this.getStockList(this.offset, "");
      } catch (e) {
        return this.stockList.slice(this.offset, this.offset + 30);
      }
    },
    async getPrevList() {
      // 이전 리스트로 페이지네이션을 위해 변경
      if (this.offset >= 30) {
        this.offset = this.offset - 30;
      }
      try {
        const result = await this.getStockList(this.offset, "");
        return result;
      } catch (e) {
        return this.stockList.slice(this.offset, this.offset + 30);
      }
    },
    async setStockLikes(id) {
      // Note: 이 함수는 만약 종목 목록에서 직접 좋아요를 누를 경우를 대비해 만들었으며, 필요 없을 수도 있음
      try {
        // TODO: 진짜 서버 URL로 바꾸기
        const result = await axios.post("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock", {
          params: {
            id: id,
            action: "like",
          },
        });
        if (result.status === 200) {
          this.stockList[id].likes += 1;
          return this.stockList[id].likes;
        } else {
          return this.stockList[id].likes;
        }
      } catch (e) {
        return this.stockList[id].likes; // 변경하지 않음
      }
    },
    async deleteStockLikes(id) {
      // Note: 이 함수는 만약 종목 목록에서 직접 좋아요를 해제할 경우를 대비해 만들었으며, 필요 없을 수도 있음
      try {
        // TODO: 진짜 서버 URL로 바꾸기
        const result = await axios.post("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock", {
          params: {
            id: id,
            action: "dislike",
          },
        });
        if (result.status === 200) {
          this.stockList[id].likes -= 1;
          return this.stockList[id].likes;
        } else {
          return this.stockList[id].likes;
        }
      } catch (e) {
        return this.stockList[id].likes; // 변경하지 않음
      }
    },
  },
});
>>>>>>> 50710648f8274fcecc57eb97a29b644d09435463
