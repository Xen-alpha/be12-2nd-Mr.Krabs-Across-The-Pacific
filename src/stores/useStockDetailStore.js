import { defineStore } from "pinia";
import axios from 'axios';
export const useStockDetailStore = defineStore("stockDetail", {
    state: () => ({
        name: "테슬라",
        code: "TSLA",
        market: "NASDAQ",
    }),
    actions: {
        async getStockDetail(stockId) {
            const response = await axios
                .get('/test/stock/detail?idx='+stockId)
                    .catch((error)=> {
                        console.log(error);
                    })

                //.get('/sample/stock/get.json');
                //.get('https://637b1d88-d99f-48ca-b187-81bb20e3ae05.mock.pstmn.io/stock?idx='+stockId)
            console.log(response);
            this.name = response.data.result.name;
            this.code = response.data.result.code;
            this.market = response.data.result.market;
        }
    }
})