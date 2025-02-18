<script setup>
import { defineProps, ref } from 'vue';
import { useUserStore } from '../../stores/useUserStore'
import { useStockReplyStore } from '../../stores/useStockReplyStore';
import { useRouter } from 'vue-router';

const props = defineProps({
    reply: {
        type: Object,
        required: true
    }
})
const router = useRouter();
const stockReplyStore = useStockReplyStore();
const userStore = useUserStore();
const isUpdate = ref(false);
//여기 reply.isLiked 추가해야함.
const isLiked = ref(props.reply?.isLiked || false);
const likesCount = ref(props.reply?.likesCount || 0);
const heartsContainer = ref(null); // 하트 컨테이너 참조


const changeUpdate = () => {
    isUpdate.value = !isUpdate.value;
}

const updateReply = async (replyId) => {
    const content = document.querySelector('#comment'+replyId).innerHTML;
    const result = await stockReplyStore.updateStockReply(replyId, content);
    router.go(0);
}

const deleteReply = async (replyId) => {
    await stockReplyStore.deleteStockReply(replyId);
    router.go(0);
}

const likeReply = async (replyId) => {
    //로그인 안했으면 못누른다.
    if (userStore.userId == null) return;

    //withcredential이용으로 일단 막아둠
    //await stockReplyStore.setReplyLikes(replyId);
    isLiked.value = true;
    likesCount.value = likesCount.value + 1;
    const heart = document.createElement('div');
    heart.textContent = '♥️'; // 하트 모양
    heart.classList.add('flying-heart');
    heartsContainer.value.appendChild(heart);
}
const dislikeReply = async (replyId) => {
    //await stockReplyStore.deleteReplyLikes(replyId);
    isLiked.value = false;
    likesCount.value = likesCount.value - 1;
}

</script>

<template>
    <div class="card shadow mb-4 card-row">
        <div class="card-header py-3" style="width: 15rem;">
            <div style="display: flex; justify-content: space-between;">
                <h5 class="m-0 font-weight-bold text-primary">{{ reply.userName }}</h5>

                <div v-if="userStore.userId==reply.userId">
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle nav-link " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />

                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" @click="changeUpdate">수정</a>
                                <a class="dropdown-item" @click="deleteReply(reply.replyId)">삭제</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <small class="replycard-info text-black-50">
                작성일자: {{ new Date(reply.createdAt).toISOString().split('T')[0] }}
            </small>
            <small v-if="reply.createdAt != reply.updatedAt" class="text-right replycard-info text-black-50">
                (수정됨)
            </small>

            <div>
                <div style="display: flex; align-items: center;" class="me-auto align-items-lg-center">
                    <button class="like-btn ">
                        <font-awesome-icon class="like-icon" v-if="isLiked" @click="dislikeReply(reply.replyId)"
                            :icon="['fas', 'heart']" />
                        <font-awesome-icon class="like-icon" v-else @click="likeReply(reply.replyId)"
                            :icon="['far', 'heart']" />
                        <div class="hearts-container" ref="heartsContainer"></div>
                    </button>
                    <p style="margin-left: 5px;">{{ likesCount }}</p>
                </div>


                <!-- <div class="nav-item dropdown no-arrow mx-1" data-bs-toggle="dropdown">
                    <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                    <a class="dropdown-item" href="#">
                        Profile
                    </a>
                </div> -->
            </div>

        </div>
        <div v-if="!isUpdate" class="card-body">
            <div v-html="reply.content"></div>
        </div>
        <div v-else class="card-body">
            <div :id="'comment'+reply.replyId" role="textbox" aria-multiline="true" class="_editor-expanded_ylcfx_13 border overflow-scroll"
                spellcheck="true" data-slate-editor="true" data-slate-node="value" contenteditable="true" zindex="-1"
                style="background-color: white; position: relative; white-space: pre-wrap; height: 7em;">
                    
                <div v-html="reply.content">
                </div>
            </div>
            <div style="float: right;">
                <input @click="updateReply(reply.replyId, reply.content)" type="button" class="btn btn-light"
                    name="수정완료" value="수정">
                <input @click="changeUpdate" type="button" class="btn btn-light" value="취소">
            </div>
        </div>
    </div>
</template>

<style>
@import '/src/common/sb-admin-2.min.css';
@import 'stockReply.css';
</style>