<template>
    <div>
        <NavBar class="navbar"></NavBar>
        <el-skeleton :rows="18" animated v-if="loading" style="width: 80%;margin: 120px auto;" />
        <div class="goodsview" v-if="!loading">
            <FlyModel></FlyModel>

            <div class="viewimg">
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
                    ￥ {{ data.price }}
                </div>
                <div class="submit" @click="addCart">
                    <button>添加至购物车</button>
                </div>
                <el-rate class="rate1" v-model="avg" disabled show-score text-color="#ff9900"
                    score-template="{value} points" size="large" />
                <div class="all">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    评论：{{ totalPage }}
                </div>
                <div class="orders">
                    <el-icon>
                        <Document />
                    </el-icon>
                    销量：{{ reviews }}
                </div>
            </div>
        </div>
        <div class="review" v-for="(items, index) in review" :key="index" v-loading="loading">
            <el-divider content-position="right">
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div class="container">
                <div class="user-rating">
                    <div class="username">{{ items.Username }}</div>
                    <el-divider direction="vertical" border-style="dashed" />
                    <el-rate class="rate" v-model="items.Rating" disabled show-score text-color="#ff9900"
                        score-template="{value} points" size="small" />
                </div>
                <div class="comment">{{ items.ReviewContent }}</div>
            </div>
        </div>
        <el-pagination small background :default-page-size="3" layout="prev, pager, next" :total="totalPage"
            :current-page="page" class="mt-4" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { getComName, getBreedName } from '@/axios/api';
import { onMounted, ref } from 'vue';
import { addToShoppingCart, getImg, getReviewsByCom } from '@/axios/api'
import { ElMessage } from 'element-plus'//消息提示框
import { StarFilled } from '@element-plus/icons-vue'
import FlyModel from '@/components/FlyModel.vue';
import NavBar from '@/components/NavBar.vue';
import router from '@/router/index'
let totalPage = ref(1)
let avg = ref(0)
let data: any = ref({})
let review = ref([])
let page = ref(1)
let loading = ref(true)
let reviews = ref(1)
onMounted(async () => {
    try {
        const res1: any = await getComName<string>(localStorage.getItem('commodityID'));
        data.value = res1.data;
        const res2: any = await getBreedName<string>(data.value.breedID);
        data.value.breedName = res2.data;
        const res3: any = await getImg<string>(data.value.commodityID);
        data.value.imgUrl = res3.data;
        const res4: any = await getReviewsByCom<string>({
            params: {
                id: localStorage.getItem('commodityID'),
                page: 1,
                pageSize: 3
            }
        });
        if (res4.code === 5001) {
            review.value = res4.data;
            avg.value = res4.data[0].avg;
            avg.value = parseFloat(avg.value.toFixed(1));
            totalPage.value = res4.data[0].count;
            reviews.value = res4.data[0].orderCount
            loading.value = false
        }
        else {
            totalPage.value = 0
            avg.value = 0
            review.value = [];
            loading.value = false
            reviews.value = 0
        }


    } catch (error) {
        console.error(error);
    }

})

const addCart = () => {
    addToShoppingCart<string>(
        {
            commodityID: localStorage.getItem('commodityID'),
            userID: localStorage.getItem('userID')
        }).then((res: any) => {
            if (res.code === 101) {
                ElMessage.success('添加成功')
                // router.push('/users/shoppingcart')
            }

        })


}
const handleCurrentChange = async (currentpage: any) => {
    const response = await getReviewsByCom<string>({
        params: {
            id: localStorage.getItem('commodityID'),
            page: currentpage,
            pageSize: 3
        }
    });
    const res4: any = response as unknown as { data: any[], code: number }
    if (res4.code === 5001) {
        review.value = res4.data;
        page.value = currentpage
        loading.value = false
    }


}

</script>

<style scoped lang="scss">
.navbar {
    top: 0;
    background-color: #ffffff;
}

.goodsview {
    position: relative;
    display: flex;
    width: 1220px;
    background: rgb(160, 197, 160);
    margin: 130px auto 0 auto;

    .viewimg {
        flex: 3;
        margin-left: 20px;
        margin-top: 20px;
    }

    .viewintro {
        flex: 9;
        padding: 30px 50px;

        .title {
            font-size: 32px;
            font-weight: 600;
            margin-bottom: 18px;
        }

        .breedName {
            margin-top: 5px;
            font-size: 15px;
            color: gray;
            margin-bottom: 10px;
        }

        .intro {
            // background-color: red;
            margin-bottom: 10px;
            font-size: 12;

        }

        .price {
            position: absolute;
            top: 82%;
            left: 44%;
            font-size: 20px;
            color: rgb(206, 0, 0);
        }
    }

    button {
        width: 150px;
        height: 40px;
        font-size: 14px;
        font-weight: 600;
        margin-top: 135px;
        background-color: transparent;
        // border-radius: 10px;
        transition: 0.2s;
    }

    button:hover {
        background-color: #fff;
        // color: rgb(137, 137, 137);

        // border: 1px rgb(159, 146, 146) solid;
    }
}

.review {
    margin: -10px auto;
    width: 1220px;
    height: 90px;
    // background-color: red;
}

.container {
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 10px;

}

.user-rating {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 0px;
}

.username {
    height: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 20px;

}

.comment {
    grid-column: 1 / span 8;
}

::v-deep {
    .el-pagination {
        position: absolute;
        left: 50%;
        bottom: 3%;
        transform: translateX(-50%);
    }

    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
        background-color: rgb(160, 197, 160); // 进行修改未选中背景和字体
        // color: #fff;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: green; // 进行修改选中项背景和字体
        color: #fff;
    }
}

.rate1 {
    position: absolute;
    top: 68%;
    left: 30%;
    transform: scale(1);
}

.all {
    position: absolute;
    bottom: 31%;
    font-size: 13px;
}

.orders {
    position: absolute;
    bottom: 31%;
    left: 38%;
    font-size: 13px;
}
</style>