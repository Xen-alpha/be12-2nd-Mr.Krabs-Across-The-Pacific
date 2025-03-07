import axios from "axios";
import { defineStore } from "pinia";


export const useStockReplyStore = defineStore("stockReply", {
    state: () => ({replies:[], page:0, isLast:false}),
    actions: {
        async getStockReplyListByCreatedAt(stockId) {
            const response = await axios
            .get("/api/stock/reply/"+stockId+"?page="+this.page)
            //.get("/test/stock/reply?stockId="+stockId);
            //.get("/sample/stockreply/get.json")
            //.get("https://637b1d88-d99f-48ca-b187-81bb20e3ae05.mock.pstmn.io/stockreply"+"?stockId="+stockId+"&offset="+offset)
            console.log(response.data.result);
            this.replies = this.replies.concat(response.data.result.content);
            this.page = this.page+1;
            this.isLast = response.data.result.last;
        },
        async setStockReply(stockId, contents) {
            //axios
            console.log(stockId, contents)
            const response = await axios
                //.post("/sample/stockreply/post.json",
                .post("/api/stock/reply/"+stockId,
                    {
                        "contents": contents,
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
            console.log(replyId)
            const response = await axios
                .post("/api/stock/reply/likes/"+replyId,
                    {},
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