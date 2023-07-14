<template>
    <div class="flymodel">
        <div class="user" @click="gotoUserInfo">
            <el-icon>
                <Avatar class="icon" />
            </el-icon>
        </div>
        <div class="order" @click="gotoOrder">
            <el-icon>
                <Tickets class="icon" />
            </el-icon>
        </div>
        <div class="buy" @click="gotoShoppingCart">
            <el-icon>
                <ShoppingCart class="icon" />
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
const gotoUserInfo = () => {
    router.push('/users/person')
}
const gotoOrder = () => {
    router.push('/users/order')
}
const gotoShoppingCart = () => {
    router.push('/users/shoppingcart')
}
</script>

<style scoped lang="scss">
.flymodel {
    position: fixed;
    top: 180px;
    right: 180px;
    width: 50px;
    height: 180px;
    border-radius: 30px;
    background: rgba(182, 10, 10, 0.1);
    border: 2px solid black;
    z-index: 1000;
    // opacity: 0.2;
}

.user {
    height: 60px;
    text-align: center;
    line-height: 60px;
}


.user:hover {
    color: #fff;
    cursor: pointer;
}

.order {
    height: 60px;
    text-align: center;
    line-height: 60px;
}

.order:hover {
    color: #fff;
    cursor: pointer;
}

.buy {
    height: 60px;
    text-align: center;
    line-height: 60px;
}

.buy:hover {
    color: #fff;
    cursor: pointer;
}
</style>