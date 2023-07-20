<template>
    <el-carousel :interval="5000" type="card" height="350px">
        <el-carousel-item v-for="(item, index) in data" :class="'class-' + index" :key="index"
            @click="gotoView(item.CommodityID)">
            <i className="triangle"></i>
            <div className="topNo">
                <span className="num">Top{{ index + 1 }}</span>
            </div>
            <div class="">
                <h2>{{ item.CommodityName }}</h2>
            </div>
            <img :src="item.ImageURL" alt="">
            <el-rate v-model="item.Rating" disabled show-score text-color="#ff9900" score-template="{value} points" />
            <!-- <el-rate v-model="item.Rating" disabled show-score text-color="#ff9900" score-template="{value} points" /> -->
        </el-carousel-item>
    </el-carousel>
</template>
<script setup lang="ts">
import { orderRate, getImg } from "@/axios/api.ts"
import { onMounted, ref } from "vue";
import { Ref } from '@vue/reactivity';
interface Product {
    CommodityID: number;
    CommodityName: string;
    ImageURL: string;
    Rating: any;
    Name: string
}
const data: Ref<Product[]> = ref([
    { CommodityID: 1, Name: 'Product 1', ImageURL: '', Rating: 1 },
    { CommodityID: 2, Name: 'Product 2', ImageURL: '', Rating: 1 },
] as Product[]);
const gotoView = (cid: any) => {
    // router.push("/users/goodsview")
    window.open('/users/goodsview', '_blank');
    localStorage.setItem("commodityID", cid)
}
onMounted(async () => {
    try {
        const response = await orderRate<string>({
            params: {
                page: 1
            }
        });
        const res = response as unknown as { data: any[] }
        data.value = res.data
        console.log("nmdb", data.value)
        data.value.sort((a, b) => b.Rating - a.Rating);
        data.value = data.value.slice(0, 6);

    } catch (error) {
        console.error(error);
    }
    data.value.forEach((value: any, index: any) => {
        value.Rating = value.Rating.toFixed(1);
        if (value.Rating > 5)
            value.Rating = 5
    })
})
</script>
<style scoped>
.el-carousel__item:nth-child(2n) {
    background-color: rgb(198, 198, 198);
    color: rgb(233, 233, 233);
    border-radius: 10px;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #416087;
    color: #ffffff;
    border-radius: 10px;
}

.el-rate {
    margin: 220px 80px;
    color: #fff;
}

h2 {
    text-align: center;
}

img {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
}

.class-0 {
    /* color: #c0bebe !important; */

    .topNo {
        background: linear-gradient(180deg,
                rgba(245, 210, 127, 1) 0%,
                rgba(255, 225, 161, 1) 6.527614569200764%,
                rgba(209, 158, 84, 1) 100%);
        height: 38px;
        right: 10px;
        position: absolute;
        top: 0;
        width: 38px;
        z-index: 11;
    }

    .triangle {
        height: 32px;
        overflow: hidden;
        width: 32px;

        /* text-align: center; */
        &:before {
            background-color: #d19e54;
            border-radius: 4px;
            content: '';
            height: 29px;
            right: 24px;
            position: absolute;
            top: 35px;
            transform: scaleY(0.4) translate(30%, -30px) rotate(45deg);
            width: 29px;
        }
    }
}

.class-1 {
    color: rgb(205, 205, 205);

    .topNo {
        background: linear-gradient(#C0C0C0, 80%, #a4a4a4);
        height: 38px;
        right: 10px;
        position: absolute;
        top: 0;
        width: 38px;
        z-index: 11;
    }

    .triangle {
        height: 32px;
        overflow: hidden;
        width: 32px;

        /* text-align: center; */
        &:before {
            background: #a4a4a4;
            border-radius: 4px;
            content: '';
            height: 29px;
            right: 24px;
            position: absolute;
            top: 35px;
            transform: scaleY(0.4) translate(30%, -30px) rotate(45deg);
            width: 29px;
        }
    }
}

.class-2 {
    color: #fff;

    .topNo {
        background: linear-gradient(#ed9b48, 70%, #c37328);
        height: 38px;
        right: 10px;
        position: absolute;
        top: 0;
        width: 38px;
        z-index: 11;
    }

    .triangle {
        height: 32px;
        overflow: hidden;
        width: 32px;

        /* text-align: center; */
        &:before {
            background: #c37328;
            border-radius: 4px;
            content: '';
            height: 29px;
            right: 24px;
            position: absolute;
            top: 35px;
            transform: scaleY(0.4) translate(30%, -30px) rotate(45deg);
            width: 29px;
        }
    }
}

.class-3,
.class-4,
.class-5 {
    color: gray !important;

    .topNo {
        background: #ffffff;
        height: 38px;
        right: 10px;
        position: absolute;
        top: 0;
        width: 38px;
        z-index: 11;
    }

    .triangle {
        height: 32px;
        overflow: hidden;
        width: 32px;

        /* text-align: center; */
        &:before {
            background: #ffffff;
            border-radius: 4px;
            content: '';
            height: 29px;
            right: 24px;
            position: absolute;
            top: 35px;
            transform: scaleY(0.4) translate(30%, -30px) rotate(45deg);
            width: 29px;
        }
    }
}

.num {
    position: absolute;
    /* margin: auto; */
    font-size: 14px;
    top: 10px;
    left: 4px;
}
</style>
  