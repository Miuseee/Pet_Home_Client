<template>
    <div class="order">
        <div class="center">
            <div class="list">
                <el-table :data="filterTableData" style="width: 100%" v-loading="loading">
                    <el-table-column label="商品名" prop="CommodityName" />
                    <el-table-column label="价格" prop="Price" />
                    <el-table-column label="数量" prop="Quantity" />
                    <el-table-column label="图片">
                        <template #default="scope">
                            <img :src="scope.row.ImageURL" />
                        </template>
                    </el-table-column>
                    <el-table-column label="地址">
                        <template #default="scope">
                            {{ scope.row.AddressName }}
                        </template>
                    </el-table-column>
                    <el-table-column label="订单状态">
                        <template #default="scope">
                            <el-popconfirm width="220px" confirm-button-text="确认" cancel-button-text="再想想"
                                icon-color="#626AEF" title="确定发货？" @confirm="yes(scope.row)">
                                <template #reference>
                                    <el-button type="warning" plain v-if="scope.row.OrderStatus === '待发货' ? true : false">
                                        {{ scope.row.OrderStatus }}
                                    </el-button>
                                </template>
                            </el-popconfirm>
                            <el-button type="danger" disabled plain v-if="scope.row.OrderStatus === '确认收货' ? true : false">
                                派送中
                            </el-button>
                            <el-button type="info" disabled plain v-if="scope.row.OrderStatus === '待评价' ? true : false">
                                {{ scope.row.OrderStatus }}
                            </el-button>
                            <el-button type="success" plain v-if="scope.row.OrderStatus === '已完成' ? true : false">
                                {{ scope.row.OrderStatus }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-popover placement="top" width="100px" trigger="hover">
            <template #reference>
                <el-button class="button" style="margin-right: 16px">检索条件</el-button>
            </template>
            <div class="buttoncombo">
                <el-button type="warning" @click="searchBy('待发货')" plain>
                    待发货
                </el-button>
                <el-button type="danger" @click="searchBy('确认收货')" plain>
                    派送中
                </el-button>
                <el-button type="info" @click="searchBy('待评价')" plain>
                    待评价
                </el-button>
                <el-button type="success" @click="searchBy('已完成')" plain>
                    已完成
                </el-button>
            </div>

        </el-popover>
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="totalPage" :default-page-size="6" :current-page="currentPage"
                @current-change="handleCurrentChange" />
        </div>

    </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { merchantOrders, addReview, updateOrder, merchantOrdersBy } from "@/axios/api.ts";
import { ElMessage } from 'element-plus';
let loading = ref(false)
let select = ref(0)
let defaultstatus = ref('')
const form = ref({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
interface User {
    date: string;
    name: string;
    address: string;
    quantity: number;
    totalPrice: number;
    price: number;
    imageURL: string;
    count: number;
    orderStatus: string;
    userName: string;
    commodityName: string;
    merchantName: string;
}
let currentPage = ref(1)
let totalPage = ref(1)
const search = ref('');
const userOrdersData = ref<User[]>([]);
const filterTableData = computed(() =>
    userOrdersData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
);
onMounted(() => {
    loading.value = true
    merchantOrders<string>({
        params: {
            page: 1,
            pageSize: 5,
            id: localStorage.getItem('id')
        }
    }).then((res: any) => {
        loading.value = false
        totalPage.value = res.data[0].count
        userOrdersData.value = res.data;
    });
});
const handleCurrentChange = async (page: any) => {
    if (select.value === 0) {
        loading.value = true
        currentPage.value = page
        try {
            const res: any = await merchantOrders<string>({
                params: {
                    page: page,
                    pageSize: 5,
                    id: localStorage.getItem('id')
                }
            })
            userOrdersData.value = res.data;
            loading.value = false
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        loading.value = true
        merchantOrdersBy<string>({
            params: {
                page: page,
                pageSize: 5,
                orderStatus: defaultstatus.value,
                id: localStorage.getItem('id')
            }
        }).then((res: any) => {
            loading.value = false
            if (res.data.length === 0) {
                ElMessage.error("无该状态信息")
                return
            }
            console.log(res.data);
            totalPage.value = res.data[0].count
            userOrdersData.value = res.data;
        });
    }

}

const yes = (row: any) => {
    updateOrder<string>({
        orderID: row.OrderID,
        userID: localStorage.getItem("userID"),
        commodityID: row.CommodityID,
        orderStatus: '确认收货',
        addressName: row.AddressName,
        quantity: row.Quantity
    }).then((res: any) => {


        if (res.code === 4001) {
            ElMessage.success("已发货")
            row.OrderStatus = "确认收货"
        }

    })
}
const searchBy = (status: string) => {
    defaultstatus.value = status
    select.value = 1
    loading.value = true
    merchantOrdersBy<string>({
        params: {
            page: 1,
            pageSize: 5,
            orderStatus: defaultstatus.value,
            id: localStorage.getItem('id')
        }
    }).then((res: any) => {
        console.log(res);
        loading.value = false
        if (res.data.length === 0) {
            ElMessage.error("无该状态信息")
            return
        }
        totalPage.value = res.data[0].count
        userOrdersData.value = res.data;
    });
}
</script>
  
<style scoped lang="scss">
.order {
    // position: fixed;
    width: 1150px;

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

img {
    width: 50px;
    height: 50px;
}

.example-pagination-block {
    position: absolute;
    left: 700px;
    bottom: 180px;
    // transform: translateX(-50%);
}

.button {
    position: absolute;
    top: 160px;
    right: 40px;
}

.buttoncombo {
    display: flex;
    flex-direction: column;
    // position: absolute;
    // top: 0;

    .el-button {
        width: 100px;
        margin: 5px auto;
    }
}
</style>
  