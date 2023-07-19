<template>
    <div class="card" @click="gotoGoodsView">
        <div class="card-front">
            <img :src="imgUrl" class="image" />
            <el-skeleton-item v-if="load" variant="image" style="width: 185.4px; height: 185.4px;
            position: absolute; top: 0;" />
            <div style="padding: 14px">
                <span>{{ props.item.CommodityName }}</span>
                <div class="bottom">
                    <time class="time"> ￥{{ props.item.Price }} </time>
                    <el-button text class="button">{{ merchantName }}</el-button>
                </div>
            </div>
        </div>
        <div class="card-back">
            <img :src="imgUrl" class="image" />
            <div class="des" style="position: absolute;bottom:20% ;left: 10%;">
                {{ item.Gender }}
            </div>
            <el-rate style="position: absolute;bottom:10% ;left: 10%;" v-model="value" size="small" disabled show-score
                text-color="#ff9900" score-template="{value} points" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps as myDefineProps, ref } from 'vue'
import { getMerchantName, getImg } from '@/axios/api'
import router from '@/router';

let load = ref(true)
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

let value = ref(0)
console.log(props.item);
if (typeof props.item.avg === 'undefined')
    value.value = 0
else
    value.value = props.item.avg.toFixed(1)
getImg<string>(props.item.CommodityID).then((res: any) => {
    load.value = true
    if (res.code === 5001) {
        imgUrl.value = res.data
        load.value = false
    }
    load.value = false
})
const gotoGoodsView = () => {
    localStorage.setItem("commodityID", props.item.CommodityID)
    router.push('/users/goodsview')
}
</script>

<style scoped lang="scss">
.card {
    display: inline-block;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    width: 185.4px;
    height: 285px;
    background-color: rgb(234, 237, 242);
    // overflow: hidden;
    box-sizing: border-box;
    border-radius: 5px;
    perspective: 1000px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;

    .image {
        width: 185.4px;
        height: 185.4px;
        background-color: #fff;
        transition: 0.3s;
    }


    // image:hover {
    //     scale: 1.2;
    // }

    .name {
        margin: 0px auto;
        text-align: center;
        font-size: 20px;
        width: 140px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        background-color: rgb(255, 255, 255);
    }

    .price {
        margin-top: 3px;
        margin-left: 10px;
        color: red;
        // background-color: rgb(237, 236, 236);
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

// .card {
//     width: 200px;
//     height: 200px;
//     perspective: 1000px;
//     /* 设置透视视角 */
//     position: relative;
//     transform-style: preserve-3d;
//     /* 保持子元素的 3D 效果 */
//     transition: transform 0.5s;
//     /* 添加过渡效果 */
// }

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}



.card-back {
    transform: rotateY(180deg);
}

.card:hover {
    transform: rotateY(180deg);
}
</style>
