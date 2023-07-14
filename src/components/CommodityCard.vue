<template>
    <div class="card" @click="gotoGoodsView">
        <div class="img">
            <img :src="imgUrl" alt="">
        </div>
        <div class="name">
            {{ props.item.commodityName }}
        </div>
        <div class="price">
            ￥{{ props.item.price }}
        </div>
        <div class="comment">
            10万+
        </div>
        <div class="merchant">
            {{ merchantName }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { getMerchantName, getImg } from '@/axios/api'
import router from '@/router';
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});
let imgUrl = ref("")
let merchantName = ref('')
getMerchantName<string>(Number(props.item.merchantID)).then((res: any) => {
    merchantName.value = res.data
})
getImg<string>(props.item.commodityID).then((res: any) => {
    imgUrl.value = res.data
})
const gotoGoodsView = () => {
    localStorage.setItem("commodityID", props.item.commodityID)
    router.push('/users/goodsview')
}
</script>

<style scoped lang="scss">
.card {
    display: inline-block;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    width: 185.4px;
    height: 285px;
    background-color: rgb(237, 236, 236);
    overflow: hidden;
    box-sizing: border-box;

    .img {

        margin: 25px auto;
        width: 130px;
        height: 130px;
        background-color: #fff;
    }

    img {
        width: 100%;
        height: 100%;
        transition: 0.3s;
    }

    img:hover {
        scale: 1.2;
    }

    .name {
        margin-left: 10px;
        font-size: 20px;
        width: 140px;
        height: 30px;
        line-height: 30px;
        background-color: green;
    }

    .price {
        margin-top: 3px;
        margin-left: 10px;
        color: red;
        background-color: blue;
    }

    .comment {
        margin-top: 3px;
        margin-left: 10px;
        font-size: 12px;
    }

    .merchant {
        margin-top: 3px;
        font-size: 12px;
        margin-left: 10px;
        color: lightgrey;
    }
}

.card:hover {
    box-shadow: inset 0 0 3px #000;
    cursor: pointer;
    // transform: scaleX(0.99) scaleY(0.99);
}
</style>