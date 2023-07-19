<template>
    <div class="flymodel">
        <el-tooltip content="<span>用户中心</span>" raw-content placement="left">
            <div class="user" @click="gotoUserInfo">
                <el-icon>
                    <Avatar class="icon" />
                </el-icon>
            </div>
        </el-tooltip>
        <div class="order" @click="gotoOrder">
            <el-tooltip content="<span>我的订单</span>" raw-content placement="left">
                <el-icon>
                    <Tickets class="icon" />
                </el-icon>
            </el-tooltip>
        </div>
        <div class="buy" @click="gotoShoppingCart">

            <el-tooltip content="<span>购物车</span>" raw-content placement="left">

                <el-icon>
                    <ShoppingCart class="icon" />
                </el-icon>

            </el-tooltip>
            <div class="number" style="
            position: absolute;
            top: 130px;
            left: 30px;
            width: 12px;
            height: 12px;
            font-size: 12px;
            line-height: 12px;
            background-color: red;
            border-radius: 50%;
            padding: 2px;
            color: white;">
                {{ count }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { searchShoppingCart } from '@/axios/api';
import { ref, watch } from 'vue';
let count = ref(0)

const gotoUserInfo = () => {
    router.push('/users/person')
}
const gotoOrder = () => {
    router.push('/users/order')
}
const gotoShoppingCart = () => {
    router.push('/users/shoppingcart')
}
setInterval(() => {
    searchShoppingCart<string>(localStorage.getItem('userID')).then((res: any) => {
        count.value = 0
        if (res.code === 5001) {
            res.data.forEach((value: any, index: any) => {
                count.value++

            })
        }
    })
}, 1000)

</script>

<style scoped lang="scss">
.flymodel {
    position: fixed;
    top: 20%;
    right: 16%;
    width: 50px;
    height: 180px;
    border-radius: 30px;
    background: transparent;
    opacity: 0.7;
    border: 2px solid black;
    z-index: 1000;
}

.user {
    height: 60px;
    text-align: center;
    line-height: 60px;
}


.user:hover {
    color: #ffffff;
    cursor: pointer;
}

.order {
    height: 60px;
    text-align: center;
    line-height: 60px;
}

.order:hover {
    color: #ffffff;
    cursor: pointer;
}

.buy {
    height: 60px;
    text-align: center;
    line-height: 60px;
}

.buy:hover {
    color: #ffffff;
    cursor: pointer;
}
</style>