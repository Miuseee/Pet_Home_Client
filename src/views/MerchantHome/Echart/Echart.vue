<template>
    <el-col :span="8">
        <el-card shadow="hover"
            style="height: 80px;position: absolute;font-weight: 600;left:20%;top:11%;padding:20px;font-size: 25px;">
            ￥总销售额：{{
                money }}
        </el-card>
    </el-col>
    <div class="echart" id="main" style="width: 400px; height: 400px;position: absolute;top: 45%;"></div>

    <el-row :gutter="16" style="width: 600px;right: 10%;position: absolute;">
        <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="goods">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            总上架商品
                            <el-tooltip effect="dark" content="已经通过审核的商品数量" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="review">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            总评论数
                            <el-tooltip effect="dark" content="您上架的所有商品数目" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="total" title="总销量">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            订单总数
                            <el-tooltip effect="dark" content="您的订单总数统计" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
            </div>
        </el-col>
    </el-row>
    <div class="star" style="width: 800px;height: 300px;display: flex;position: absolute;bottom: 15%;right: 1%;">
        <div class="span"
            style="position: absolute;top: -20%;left: 50%;transform: translateX(-50%);font-size: 30px;font-weight: 600;">
            好评前三！</div>
        <el-card v-for="(item, index) in sortArr" :key="index" :body-style="{ padding: '0px', flex: 1 }"
            style="margin-left: 40px;">
            <img :src="item.ImageURL" class="image" style="width: 200px;height: 200px;" />
            <div style="padding: 14px">
                <span>{{ item.CommodityName }}</span>
                <div class="bottom">
                    <time class="time"><el-icon>
                            <ChatDotRound />
                        </el-icon>&nbsp;&nbsp;{{ item.reviewsCount }}</time>
                    <el-rate v-model="item.avg" size="small" disabled show-score text-color="#ff9900"
                        score-template="{value}" />
                </div>
            </div>
        </el-card>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import * as echarts from 'echarts';
import { myBroSun, merchantOrders } from "@/axios/api"
import {
    Warning,
} from '@element-plus/icons-vue'


const currentDate = ref(new Date())
let total = ref(0)
let review = ref(0)
let goods = ref(0)
let sortArr = ref([])
let money = ref('')
money.value = localStorage.getItem("money")
onMounted(async () => {

    try {
        const res: any = await merchantOrders<string>({
            params: {
                page: 1,
                pageSize: 5,
                id: localStorage.getItem('id')
            }
        }).then((res: any) => {
            total.value = res.data[0].count
        });
    } catch (error) {
        console.log(error);

    }
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    try {
        const res: any = await myBroSun<string>(localStorage.getItem('id'));
        const result = res.data.reduce((accumulator, item) => {
            goods.value++
            review.value = review.value + item.reviewsCount
            const { BreedName } = item;
            const existingItem = accumulator.find(obj => obj.name === BreedName);
            if (existingItem) {
                existingItem.value++;
            } else {
                accumulator.push({ value: 1, name: BreedName });
            }
            return accumulator;
        }, []);
        sortArr.value = res.data.sort((a, b) => b.avg - a.avg); // 按 avg 从高到低排序
        sortArr.value = sortArr.value.splice(1, 3);
        sortArr.value.forEach((value, index) => {
            value.avg = value.avg.toFixed(1)
        })

        var option;
        option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: '已上架商品分类统计',
                left: 'center',
                top: 0,
                textStyle: {
                    color: '#ccc'
                }
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: '数量',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: result
                }
            ]
        };
        option && myChart.setOption(option);
    } catch (error) {
        console.log(error);
    }
});
</script>
  
<style scoped lang="scss">
::v-deep .el-row {
    width: 100px;
}

:global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: rgb(244, 244, 244);
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>
  