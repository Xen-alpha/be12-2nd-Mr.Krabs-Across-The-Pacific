import { defineStore } from 'pinia';
import axios from 'axios';

export const useStockListStore = defineStore('stockList', {
  state: () => ({ 
    offset: 0, 
    requestType: "", 
    stockList: [
      {id:1, name:"Tesla", code:"TSLA", market:"nasdaq", price: "26000", likes: 40 }, 
      {id:2, name:"Apple Inc.", code:"AAPL", market:"nasdaq",  price: "46000", likes: 16},
      {id:3, name:"Microsoft", code:"MSFT", market:"nasdaq",  price: "43200", likes: 4 }
    ],
  }),
  getters: {
    stockListResult: (state) => state.stockList.slice(state.offset, state.offset + 30),
    stockListOffset: (state) => state.offset
  },
  actions: {
    async getStockListItem(id) {
      try { // TODO: 서버 URL로 바꾸기
        return await axios.get(`https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/item`, {params:{
          id:id,
        }}).result.slice(offset, offset+ 30);
      } catch (e) {
        this.stockList = [];
        return this.stockList;
      }
    },
    async getStockList(offset=0, text="", requestType="") {
      try {
         // TODO: 서버 URL로 바꾸기
        const response = await axios.get(`https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/list`, {params:{
          text: text,
          offset:offset,
          requestType:requestType
        }})
        console.log(response.data);
        // TODO: 조건에 따른 정렬 기능 추가?
        response.data.result.sort((a,b) => b.likes - a.likes);

        return response.data.result.slice(this.offset, this.offset + 30);        
      } catch (e) {
        // console.log(e.message);
        this.stockList = [];
        return this.stockList;
      }
    },
    async getNextList() {
      this.offset = this.offset + 30;
      return await this.getStockList(this.offset, this.requestType);
    },
    async getPrevList() {
      if (this.offset >= 30) {
        this.offset = this.offset - 30;
        return await this.getStockList(this.offset, this.requestType);
      }
      return this.$state.stockList;
    },
    deleteStockList (id) { // Note: set과 update처럼 쓸모가 없는지 애매함
       this.$state.stockList[id] = null;
       return this.$state.stockList;
    }
  },
  
})