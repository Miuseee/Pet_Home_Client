<template>
    <div class="shoppingcart">
        <el-table class="table" ref="multipleTableRef" :data="tableData" style="width: 480px"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column property="commodityName" label="商品名" width="120" />
            <el-table-column property="breedName" label="品种名" width="120" />
            <el-table-column property="gender" label="gender" width="120" />
            <el-table-column property="price" label="Price" width="120" />
        </el-table>
        <div class="combo">
            <el-button>继续购物</el-button>
            <el-button>去结账</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTable } from 'element-plus'
import { searchShoppingCart } from "@/axios/api"
let shopingdata = ref([])
let storedArrayString = localStorage.getItem('cart');
// 将字符串解析为数组
const storedArray = storedArrayString !== null ? JSON.parse(storedArrayString) : [];
shopingdata.value = storedArray
const tableData: User[] = [
]

shopingdata.value.forEach((value: any, index: any) => {
    console.log(value);
    tableData.push(value)
})

interface User {
    breedName: string
    commodityName: string
    gender: string
    price: number
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}

</script>

<style scoped lang="scss">
.shoppingcart {
    width: 800px;
    margin: 0 auto;

    .table {
        margin: 200px auto;
        margin-bottom: 0;
    }

    .combo {
        margin: 10px 200px;
    }
}
</style>