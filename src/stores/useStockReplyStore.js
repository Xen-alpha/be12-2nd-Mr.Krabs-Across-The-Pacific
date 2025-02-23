import axios from "axios";
import { defineStore } from "pinia";


export const useStockReplyStore = defineStore("stockReply", {
    state: () => ({replies:[]}),
    actions: {
        async getStockReplyListByCreatedAt(stockId, offset) {
            const response = await axios
            //.get("/test/stock/reply?stockId="+stockId);
            .get("/sample/stockreply/get.json")
            //.get("https://637b1d88-d99f-48ca-b187-81bb20e3ae05.mock.pstmn.io/stockreply"+"?stockId="+stockId+"&offset="+offset)
            this.replies = response.data.replies;
        },
        async setStockReply(stockId, content) {
            //axios
            const response = await axios
                .post("/sample/stockreply/post.json",
                    {
                        "stockId": stockId,
                        "content": content,
                    },
                    { withCredentials: true }
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        },
        async updateStockReply(replyId, content) {
            const response = await axios
                .put("/sample/stockreply/put.json", 
                    {
                        "replyId": replyId,
                        "content": content
                    },
                    { withCredentials: true }
                )  
                .catch((error)=> {
                    console.error(error);
                });
            return response.data;
            //axios
        },
        async deleteStockReply(replyId) {
            const response = await axios
                .delete("/sample/stockreply",
                    {
                        "replyId": replyId
                    },
                    { withCredentials: true }
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        },
        async setReplyLikes(replyId) {
            const response = await axios
                .post("/sample/stockreplylikes",
                    { "replyId": replyId },
                    {withCredentials: true}
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        },        
        async deleteReplyLikes(replyId) {
            const response = await axios
                .delete("/sample/stockreplylikes",
                    { "replyId": replyId },
                    {withCredentials: true}
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        }
    }
})