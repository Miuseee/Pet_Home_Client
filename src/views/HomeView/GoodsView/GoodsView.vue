<template>
    <div>
        <div class="goodsview">
            <div class="viewimg">
                <!-- <img src="https://img13.360buyimg.com/n1/jfs/t1/156037/31/36839/100412/64585c37F5b705105/e012e6725083a6aa.jpg"
                alt=""> -->
                <img :src="data.imgUrl" alt="" style="width: 300px;height:300px ;">
            </div>
            <div class="viewintro">
                <div class="title">
                    {{ data.commodityName }}
                </div>
                <div class="breedName">
                    标签：{{ data.breedName }}
                </div>
                <div class="intro">
                    {{ data.gender }}
                </div>
                <div class="price">
                    价格： ￥{{ data.price }}
                </div>
                <div class="submit" @click="addCart">
                    <button>添加至购物车</button>
                </div>
            </div>
        </div>
        <div class="review">
            <div class="form">
                123
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getComName, getBreedName } from '@/axios/api';
import { onMounted, ref } from 'vue';
import { addToShoppingCart, getImg } from '@/axios/api'
import { ElMessage } from 'element-plus'//消息提示框
import router from '@/router/index'
const textarea = ref('')
let data = ref({})
let cart = []
onMounted(() => {
    getComName<string>(localStorage.getItem('commodityID')).then((res: any) => {
        data.value = res.data
        getBreedName<string>(data.value.breedID).then((res: any) => {
            data.value.breedName = res.data
        })
        getImg<string>(data.value.commodityID).then((res: any) => {
            data.value.imgUrl = res.data
            console.log(data.value);

        })
    })
})
const addCart = () => {
    addToShoppingCart<string>(
        {
            commodityID: localStorage.getItem('commodityID'),
            userID: localStorage.getItem('userID')
        }).then((res: any) => {
            console.log(res);
            if (res.code === 101) {
                ElMessage.success('添加成功')
                router.push('/users/shoppingcart')
            }

        })
    // 获取存储的数组字符串
    const storedArrayString = localStorage.getItem('cart');
    // 将字符串解析为数组
    const storedArray = JSON.parse(storedArrayString);
    // 添加新的数据到数组
    storedArray.push(data.value);
    // 将更新后的数组转换为字符串
    const updatedArrayString = JSON.stringify(storedArray);
    // 将更新后的字符串存储回 localStorage
    localStorage.setItem('cart', updatedArrayString);
    // 存储字符串到 localStorage
    // localStorage.setItem('myArray', arrayString);

}
</script>

<style scoped lang="scss">
.goodsview {
    display: flex;
    width: 1220px;
    background-color: lightgray;
    margin-left: 100px;
    margin-top: 150px;

    .viewimg {
        flex: 3;
    }

    .viewintro {
        flex: 9;
        padding: 30px 60px;


        .title {
            font-size: 25px;
        }

        .breedName {
            margin-top: 5px;
            font-size: 12px;
            color: gray;
        }

        .intro {
            background-color: red;
            margin-top: 5px;
        }

        .price {
            margin-top: 5px;
        }
    }

    button {
        width: 150px;
        height: 40px;
        font-size: 14px;
        font-weight: 600;
        margin-top: 135px;
    }

    button:hover {
        background-color: #fff;
        color: gray;
        border: 1px rgb(159, 146, 146) solid;
    }
}

.review {
    margin-left: 100px;
    margin-top: 20px;
    width: 1220px;
    // background-color: red;
}
</style>