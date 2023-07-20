<template>
    <div class="all">
        <NavBar class="navbar"></NavBar>
        <div class="step">
            <el-steps :space="200" :active="num">
                <el-step title="清点购物车" />
                <el-step title="选择地址" />
                <el-step title="订单完成" />
            </el-steps>
        </div>
        <div class="shoppingcart" v-loading="load" v-show="num === 1 ? true : false">
            <el-table class="table" ref="multipleTableRef" :data="tableData" style="width: 1100px"
                @selection-change="handleSelectionChangeComputed">
                <el-table-column type="selection" width="55" />
                <el-table-column property="CommodityName" label="商品名" width="120" />
                <el-table-column property="merchantName" label="商家名" width="120" />
                <el-table-column label="数量" width="120">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.Quantity" :min="1" :max="100" @change="handleChange"
                            size="small" style="width: 70px;" />
                    </template>
                </el-table-column>
                <el-table-column label="价格" width="120">
                    <template #default="scope">
                        {{ scope.row.Quantity * scope.row.Price }}
                    </template>
                </el-table-column>
                <el-table-column label="图片" width="120">
                    <template #default="scope">
                        <img :src="scope.row.ImageURL" alt="" style="width: 50px;height: 50px;">
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="Delete(scope.row.CartID, scope.row.CommodityID, scope.$index)">
                            <template #reference>

                                <el-button size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
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
                            手机号：{{ phone }}
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

                        <el-table-column property="CommodityName" label="商品名" width="120" />
                        <el-table-column property="MerchantName" label="商家名" width="120" />
                        <el-table-column property="Quantity" label="数量" width="110" />
                        <el-table-column label="价格" width="110">
                            <template #default="scope">
                                {{ scope.row.Quantity * scope.row.Price }}
                            </template>
                        </el-table-column>
                        <el-table-column label="图片" width="120">
                            <template #default="scope">
                                <img :src="scope.row.ImageURL" alt="" style="width: 50px;height: 50px;">
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="all">总计：￥{{ calculateTotalPrice }}</div>
                </div>
            </div>
            <el-button class="button" @click="stepToThree">结算</el-button>
            <el-button class="button" @click="back">回到购物车</el-button>
        </div>
        <div class="finish" v-show="num === 3 ? true : false">

            <el-result icon="success" title="您的订单已创建！" sub-title="即将跳转"
                style="margin-right: 800px;width:300px;height: 200px;">

            </el-result>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{
                time }}秒后自动去往订单界面
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, toRaw, onUnmounted } from 'vue';
import { ElTable, ElMessage } from 'element-plus'
import { searchShoppingCart, searchAddress, addOrder, deleteCart } from "@/axios/api"
import router from '@/router';
import NavBar from '@/components/NavBar.vue';
let load = ref(false)
const userName = ref('')
userName.value = localStorage.getItem('userName') || ''
const phone = ref('')
phone.value = localStorage.getItem('phone') || ''
let time = ref(3)
const tableData = ref<User[]>([]);
onMounted(() => {
    load.value = true
    searchShoppingCart<string>(localStorage.getItem('userID')).then((res: any) => {
        if (res.code === 5001) {
            ElMessage.success('查询成功')
            res.data.forEach((value: any, index: any) => {
                tableData.value.push(value)
            })
            load.value = false
        }
        load.value = false
    })
})
let rawModifiedItems = ref<User[]>([]);
const selectedItems = ref<User[]>([]);  //已选中
const modifiedItems = ref<User[]>([]);  // 已选中和修改的行
const handleSelectionChangeComputed = (val: User[]) => { //将选中的商品加入订单数组
    selectedItems.value = val;
    modifiedItems.value = val;
    rawModifiedItems.value = toRaw(modifiedItems.value);
};
const calculateTotalPrice = computed(() => {
    let totalPrice = 0;
    selectedItems.value.forEach((item: any) => {
        totalPrice += item.Quantity * item.Price;
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
const num = ref(1)
const stepToTwo = () => {
    if (rawModifiedItems.value.length === 0) {
        ElMessage.error("您还未选择商品")
        return
    }
    searchAddress<string>(localStorage.getItem('userID')).then((res: any) => {
        options.value = []
        res.data.forEach((value: any) => {
            options.value.push({ value: value.address, label: value.address });
        });
    });
    num.value = 2
}
const handleChange = (value: number) => {

}
const continueShop = () => {
    router.push("/users/home")
}
let transformedData: any
const stepToThree = () => {
    if (value.value === '') {
        ElMessage.error("请输入地址")
        return
    }
    num.value = 3
    rawModifiedItems.value.forEach((item: any) => {
        item.address = value.value
    })
    transformedData = rawModifiedItems.value.map((item: any) => ({
        userID: localStorage.getItem('userID') || '',
        commodityID: item.CommodityID,
        addressName: item.address,
        quantity: item.Quantity.toString(),
        cartID: item.CartID
    }));
    addOrder<string>({
        map: transformedData
    }).then((res: any) => {
        if (res.code === 2001) {
            let timer = setInterval(() => {
                if (time.value > 0) {
                    time.value--;
                } else {
                    clearInterval(timer);
                    time = null;
                }
            }, 1000);
            transformedData.forEach((value, index) => {

                deleteCart<string>({
                    userID: localStorage.getItem("userID"),
                    // cartID: value.cartID,
                    commodityID: value.commodityID
                }).then((res: any) => {
                    if (res.code === 101)
                        alert("wow")
                    else
                        alert("fuck")
                })

            })
            setTimeout(() => {
                router.push('/users/order');
            }, 3000);
        }

    })
}
//地址逻辑
const value = ref('')
let options = ref([
])
const Delete = (cid: any, did: any, index: any) => {
    load.value = true
    deleteCart<string>({
        userID: localStorage.getItem("userID"),
        // cartID: cid,
        commodityID: did
    }).then((res: any) => {
        if (res.code === 101) {
            load.value = false
            tableData.value.splice(index, 1)
        }
        load.value = false
    })
}
onUnmounted(() => {

    // alert('我朝被销毁了')
})
const back = () => {
    num.value = 1
}

</script>

<style scoped lang="scss">
::v-deep .el-header {
    position: relative;
    width: 100%;
    background: rgb(82, 138, 216);
    color: rgb(52, 59, 70);
    min-width: 1000px;
    height: 60px;
}

.navbar {
    position: absolute;
    top: 0;
    background-color: #fff;
}

.step {
    // margin: 0 auto;
    margin-left: 36%;
    margin-top: 12%;
    margin-bottom: 3%;
}

.address {
    margin: 10px auto;
    width: 1000px;

}

.phone {
    margin: 10px 0;
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
    height: 200px;
    // overflow: scroll;
    left: 0;
    z-index: 0;
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
    margin-top: 200px;
    z-index: 100;
}

.shoppingcart {
    width: 775px;
    margin: 0 auto;
    height: 400px;
    overflow-y: scroll;

    .table {
        margin: 0px auto;
        margin-bottom: 0;
    }

    .combo {
        margin: 10px 200px;
        z-index: 100;
    }
}

.finish {
    margin-left: 550px;
}
</style>