<template>
    <div class="order">
        <div class="center">
            <div class="header">
                我的订单
            </div>
            <div class="list">
                订单列表
            </div>
        </div>
        <div class="example-pagination-block">
            <div class="example-demonstration">When you have few pages</div>
            <el-pagination layout="prev, pager, next" :total="50" />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.order {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: lightgrey;
}

.center {
    margin: 80px 150px;

}

.header {
    height: 30px;
    font-size: 20px;
    font-weight: 800;
    padding: 10px;
    background-color: #fff;
}

.list {
    height: 500px;
    font-size: 14px;
    font-weight: 400;
    padding: 10px;
    margin-top: 20px;
    background-color: #fff;
}
</style>