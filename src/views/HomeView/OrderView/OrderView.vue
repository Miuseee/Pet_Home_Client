<template>
    <div class="order">
        <NavBar></NavBar>
        <div class="center">
            <div class="header">
                我的订单
                <span class="home" @click="back">返回首页</span>
            </div>
            <div class="list">
                <el-table :data="filterTableData" style="width: 100%" @cell-click="changeState" v-loading="loading">
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
                            <el-button type="warning" plain disabled v-if="scope.row.OrderStatus === '待发货' ? true : false">
                                {{ scope.row.OrderStatus }}
                            </el-button>
                            <el-popconfirm width="220px" confirm-button-text="确认" cancel-button-text="还未收到"
                                icon-color="#626AEF" title="确定收货？" @confirm="yes(scope.row)">
                                <template #reference>
                                    <el-button type="danger" plain v-if="scope.row.OrderStatus === '确认收货' ? true : false">
                                        {{ scope.row.OrderStatus }}
                                    </el-button>
                                </template>
                            </el-popconfirm>
                            <el-popover v-if="scope.row.OrderStatus === '待评价' ? true : false"
                                :visible="selectedRow === scope.row" placement="top" :width="300">
                                <template #reference>
                                    <el-button type="info" plain>
                                        {{ scope.row.OrderStatus }}
                                    </el-button>
                                </template>
                                <el-form :model="form" v-if="selectedRow === scope.row">
                                    <el-form-item label="评论内容" label-width="70" style="margin-top:  10px;">
                                        <el-input style="max-height: 40px; overflow: auto;" :rows="2" v-model="form.name"
                                            maxlength="50" placeholder="善语结良缘，恶语伤人心" show-word-limit type="textarea" />
                                    </el-form-item>
                                    <el-form-item label-width="0">
                                        <el-row>
                                            <el-text
                                                style="font-size:16px;color: rgb(75, 74, 70);margin-left: 10px;">Rate</el-text>
                                            <el-rate v-model="rate" :texts="['不忍直视', '真一般', '还凑合用', '很不错', '金色传说']"
                                                show-text :colors="colors" size="large" />
                                        </el-row>
                                    </el-form-item>
                                </el-form>
                                <span class="card-footer">
                                    <el-button type="warning" @click="add(scope.row)"
                                        style="margin-left:55px;">提交评论</el-button>
                                    <el-button type="danger" plain @click="changeState(null)">取消</el-button>
                                </span>
                            </el-popover>
                            <el-button type="success" plain disabled v-if="scope.row.OrderStatus === '已完成' ? true : false">
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
                    确认收货
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
import { userOrders, addReview, updateOrder, userOrdersBy } from "@/axios/api.ts";
import { ElMessage } from 'element-plus';
import router from '@/router';
import NavBar from '@/components/NavBar.vue'
const selectedRow = ref(null);
let defaultstatus = ref('')
const changeState = (row: any) => {
    if (selectedRow.value === row) {
        selectedRow.value = null;
    } else {
        selectedRow.value = row;
    }
};

let loading = ref(false);
let rate = ref(1);
const visible = ref(false);
let select = ref(0)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
let status = ref('');
const form = ref({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
});
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
let currentPage = ref(1);
let totalPage = ref(1);
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
    loading.value = true;
    userOrders<string>({
        params: {
            page: 1,
            pageSize: 6,
            id: localStorage.getItem('userID')
        }
    }).then((res: any) => {
        loading.value = false;
        totalPage.value = res.data[0].count;
        userOrdersData.value = res.data;
    });
});
const handleCurrentChange = async (page: any) => {
    if (select.value === 0) {
        loading.value = true;
        currentPage.value = page;
        try {
            const response = await userOrders<string>({
                params: {
                    page: page,
                    pageSize: 6,
                    id: localStorage.getItem('userID')
                }
            });
            const res = response as unknown as { data: any[] }
            userOrdersData.value = res.data;
            loading.value = false;
        } catch (error) {
            console.error(error);
        }
    }
    else {
        loading.value = true;
        currentPage.value = page
        userOrdersBy<string>({
            params: {
                page: page,
                pageSize: 6,
                orderStatus: defaultstatus.value,
                id: localStorage.getItem('userID')
            }
        }).then((res: any) => {
            loading.value = false;
            if (res.data.length === 0) {
                ElMessage.error("无该状态信息");
                return;
            }
            totalPage.value = res.data[0].count;
            userOrdersData.value = res.data;
        });
    }

};
const add = (row: any) => {
    console.log(row);

    addReview<string>({
        userID: localStorage.getItem("userID"),
        commodityID: row.CommodityID,
        reviewContent: form.value.name,
        rating: rate.value
    }).then((res: any) => {
        if (res.code === 5001) {
            updateOrder<string>({
                orderID: row.OrderID,
                userID: localStorage.getItem("userID"),
                commodityID: row.CommodityID,
                orderStatus: '已完成',
                addressName: row.AddressName,
                quantity: row.Quantity
            }).then((res: any) => {

                if (res.code === 4001) {
                    ElMessage.success("订单已全部完成");
                    row.OrderStatus = "已完成";
                }
            });
        }
    });
};
const yes = (row: any) => {
    updateOrder<string>({
        orderID: row.OrderID,
        userID: localStorage.getItem("userID"),
        commodityID: row.CommodityID,
        orderStatus: '待评价',
        addressName: row.AddressName,
        quantity: row.Quantity
    }).then((res: any) => {
        if (res.code === 4001) {
            ElMessage.success("收货成功");
            row.OrderStatus = "待评价";
        }
    });
};
const back = () => {
    router.push('/users/home');
};
const searchBy = (status: string) => {
    defaultstatus.value = status
    loading.value = true;
    select.value = 1

    userOrdersBy<string>({
        params: {
            page: 1,
            pageSize: 6,
            orderStatus: status,
            id: localStorage.getItem('userID')
        }
    }).then((res: any) => {
        loading.value = false;
        console.log(res);

        if (res.data === null) {
            ElMessage.error("无该状态信息");
            return;
        }
        totalPage.value = res.data[0].count;
        userOrdersData.value = res.data;
    });
};
</script>
  
<style scoped lang="scss">
::v-deep .el-header {
    position: relative;
    width: 100%;
    background: rgb(175, 175, 175);
    color: rgb(10, 10, 11);
    min-width: 1000px;
}

.button {
    position: absolute;
    top: 190px;
    right: 30px;
}

.buttoncombo {
    display: flex;
    flex-direction: column;

    .el-button {
        width: 100px;
        margin: 5px auto;
    }
}

.order {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(202, 204, 207);
}

.center {
    margin: 120px 150px;
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
    left: 720px;
    bottom: 190px;
}

.home {
    position: absolute;
    top: 132px;
    right: 170px;
    font-size: 18px;
    font-weight: 600;
}

.home:hover {
    cursor: pointer;
    font-size: 20px;
    transition: 0.3s;
}
</style>
  