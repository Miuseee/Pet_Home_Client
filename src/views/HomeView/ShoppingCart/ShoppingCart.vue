<template>
    <div class="all">
        <div class="step">
            <el-steps :space="200" :active="num">
                <el-step title="清点购物车" />
                <el-step title="选择地址" />
                <el-step title="订单完成" />
            </el-steps>
        </div>
        <div class="shoppingcart" v-show="num === 1 ? true : false">
            <el-table class="table" ref="multipleTableRef" :data="tableData" style="width: 1100px"
                @selection-change="handleSelectionChangeComputed">
                <el-table-column type="selection" width="55" />
                <el-table-column property="commodityName" label="商品名" width="120" />
                <el-table-column property="merchantName" label="商家名" width="120" />
                <el-table-column label="数量" width="120">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.quantity" :min="1" :max="100" @change="handleChange"
                            size="small" style="width: 70px;" />
                    </template>
                </el-table-column>
                <el-table-column label="价格" width="120">
                    <template #default="scope">
                        {{ scope.row.quantity * scope.row.price }}
                    </template>
                </el-table-column>
                <el-table-column label="图片" width="120">
                    <template #default="scope">
                        <img :src="scope.row.imageURL" alt="" style="width: 50px;height: 50px;">
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <el-button size="small">删除</el-button>
                </el-table-column>
            </el-table>
            <div class="all">总计：￥{{ calculateTotalPrice }}</div>
            <div class="combo">
                <el-button @click="continueShop">继续购物</el-button>
                <el-button @click="stepToTwo">去结账</el-button>
            </div>
        </div>
        <div class="address" v-show="num === 2 ? true : false">
            <div class="addform">
                <div class="orderInfo">
                    <div class="userinfo">
                        <h2>请确认如下信息</h2>
                        <div class="name">
                            收货人：{{ userName }}
                        </div>
                        <div class="phone">
                            手机号：{{ }}
                        </div>
                        <div class="address">
                            地址：
                            <el-select v-model="value" clearable placeholder="Select">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>

                    <div class="pay">
                        微信支付
                    </div>
                </div>
                <div class="shoppinglist">
                    <el-table class="table" ref="multipleTableRef" :data="rawModifiedItems" style="width: 1100px">

                        <el-table-column property="commodityName" label="商品名" width="120" />
                        <el-table-column property="merchantName" label="商家名" width="120" />
                        <el-table-column label="数量" width="120">
                            <template #default="scope">
                                <el-input-number v-model="scope.row.quantity" :min="1" :max="100" @change="handleChange"
                                    size="small" style="width: 70px;" />
                            </template>
                        </el-table-column>
                        <el-table-column label="价格" width="120">
                            <template #default="scope">
                                {{ scope.row.quantity * scope.row.price }}
                            </template>
                        </el-table-column>
                        <el-table-column label="图片" width="120">
                            <template #default="scope">
                                <img :src="scope.row.imageURL" alt="" style="width: 50px;height: 50px;">
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <el-button size="small">删除</el-button>
                        </el-table-column>
                    </el-table>
                    <div class="all">总计：￥{{ calculateTotalPrice }}</div>
                </div>

            </div>
            <el-button class="button" @click="stepToThree">结算</el-button>
        </div>
        <div class="finish" v-show="num === 3 ? true : false">
            下单成功
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, toRaw, reactive, onUnmounted } from 'vue';
import { ElTable, ElMessage } from 'element-plus'
import { searchShoppingCart, searchAddress, addOrder } from "@/axios/api"
import router from '@/router';
const userName = ref('')
userName.value = localStorage.getItem('userName') || ''
const tableData = ref<User[]>([]);
onMounted(() => {
    searchShoppingCart<string>(localStorage.getItem('userID')).then((res: any) => {
        if (res.code === 5001) {
            ElMessage.success('查询成功')
            res.data.forEach((value: any, index: any) => {
                tableData.value.push(value)
            })
        }

    })
})
let rawModifiedItems = ref<User[]>([]);
const selectedItems = ref<User[]>([]);  //已选中
const modifiedItems = ref<User[]>([]);  // 已选中和修改的行
const handleSelectionChangeComputed = (val: User[]) => { //将选中的商品加入订单数组
    selectedItems.value = val;
    modifiedItems.value = val;
    rawModifiedItems.value = toRaw(modifiedItems.value);
    console.log('123', rawModifiedItems.value);
};
const calculateTotalPrice = computed(() => {
    let totalPrice = 0;
    selectedItems.value.forEach((item) => {
        totalPrice += item.quantity * item.price;
    });
    return totalPrice;
});
interface User {
    merchantName: string
    commodityName: string
    quantity: number
    price: number
    imgURL: string
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}
const num = ref(1)
const stepToTwo = () => {
    searchAddress<string>(localStorage.getItem('userID')).then((res) => {
        res.data.forEach((value: any) => {
            options.push({ value: value.address, label: value.address });
        });
    });
    num.value = 2

}
const handleChange = (value: number) => {
    console.log(value)


}
const continueShop = () => {
    router.push("/users/home")
}
const stepToThree = () => {
    rawModifiedItems.value.forEach((item) => {
        item.address = value.value
    })

    const transformedData = rawModifiedItems.value.map((item) => ({
        userID: localStorage.getItem('userID') || '',
        commodityID: item.commodityID,
        addressName: item.address,
        quantity: item.quantity.toString()
    }));
    console.log(transformedData);
    addOrder<string>({
        map: transformedData
    }).then((res: any) => {
        if (res.code === 2001) {
            num.value = 3
            setTimeout(() => {
                // 计时结束后跳转到主界面
                router.push('/users/order');
            }, 3000);
        }

    })
}
//地址逻辑
const value = ref('')
const options = reactive([
])
onUnmounted(() => {
    // alert('我朝被销毁了')
})
</script>

<style scoped lang="scss">
.step {
    // margin: 0 auto;
    margin-left: 460px;
    margin-top: 80px;
    margin-bottom: 50px;
}

.address {
    margin: 0 auto;
    width: 1000px;

}

.addform {
    display: inline-block;
    // margin-left: 340px;
    width: 1000px;
    position: relative;

}

.orderInfo {
    position: absolute;
    display: inline-block;
    width: 400px;
    left: 0;
}

.shoppinglist {
    display: inline-block;
    width: 600px;
    height: 300px;
    overflow-y: scroll;
    position: absolute;
    right: 0;
}

.button {
    margin-top: 180px;
}

.shoppingcart {
    width: 775px;
    margin: 0 auto;

    .table {
        margin: 0px auto;
        margin-bottom: 0;
    }

    .combo {
        margin: 10px 200px;
    }
}

.finish {
    margin-left: 650px;
}
</style>