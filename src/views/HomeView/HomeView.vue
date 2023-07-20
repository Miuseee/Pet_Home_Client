<template>
    <div class="main">
        <el-container>
            <Navbar></Navbar>
            <FlyModel></FlyModel>
            <el-main>
                <div class="search" @click="search">
                    <Search></Search>
                </div>

                <div class="mainTable">
                    <div class="menu">
                        <SideBar></SideBar>
                    </div>

                    <div class="lunbotu">
                        <Swiper></Swiper>
                    </div>
                    <div class="menu2"></div>
                </div>
            </el-main>

            <!-- <el-footer></el-footer> -->
        </el-container>
        <!-- 好物列表 -->
        <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
            <div class="main">
                <div class="card-container">
                    <CommodityCard v-for="(item, index) in items" :key="index" :item="item"></CommodityCard>
                </div>
            </div>
        </div>
    </div>
    <el-backtop :bottom="100" style="background-color: #4045cb;color:white;box-shadow:0px 0px 20px #020079;">
    </el-backtop>
    <el-skeleton :rows="5" animated v-if="show" style="width:  1000px;margin: 10px auto;" />
</template>

<script setup lang="ts">
import SideBar from '../../components/SideBar.vue'
import Swiper from '../../components/Swiper.vue'
import Search from '../../components/Search.vue'
import Navbar from '../../components/NavBar.vue';
import FlyModel from '@/components/FlyModel.vue';
import router from '@/router';
import { ref, reactive, nextTick, onMounted } from 'vue';
import axios from 'axios';
import CommodityCard from '@/components/CommodityCard.vue'
const apiUrl = 'http://192.168.9.174:8080/commodity/mohu';
const scrollContainer = ref<HTMLElement | null>(null);
let items = reactive([]); // 分页数据
let page = 1; // 当前页数
const pageSize = 7; // 每页数据量
let show = ref(false)
const fetchData = async () => {
    show.value = true
    try {
        const response: any = await axios.get(apiUrl, {
            params: {
                page,
                pageSize
            }
        });
        const responseData = response.data;
        const records = responseData.data;
        if (response.code === 5002) {
            return
        }
        else {
            items.push(...records);
            show.value = false
        }
        return
    } catch (error) {
        console.error('请求出错:', error);
    }
};
const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // 判断滚动条是否滚动到页面底部

    if (scrollTop + clientHeight + 1 >= scrollHeight) {
        await nextTick(); // 等待下一次DOM更新
        await loadMore();
    }
};
const loadMore = async () => {
    page++;
    await fetchData();
};
// fetchData();
onMounted(async () => {
    show.value = true
    window.addEventListener('scroll', handleScroll);
    try {
        const response: any = await axios.get(apiUrl, {
            params: {
                page,
                pageSize
            }
        });
        const responseData = response.data;
        const records = responseData.data;
        // const filteredRecords = records.filter(item => item.sure === 1);
        console.log("主页面", records)
        items.push(...records);
        show.value = false

    } catch (error) {
        console.error('请求出错:', error);
    }
});
scrollContainer.value?.addEventListener('scroll', handleScroll);
const search = () => {
    router.push({ name: 'search', query: { userId: 123 } });
}
</script>

<style scoped lang="scss">
* {
    padding: 0;
    // position: relative;
}

.scroll-container {
    width: 1000px;
    margin: 0 auto;
    // overflow-y: scroll;
}

.main {
    // position: fixed;
    height: 100%;
    width: 100%;

}


::v-deep .el-header {
    position: relative;
    width: 100%;
    background: rgb(110, 130, 158);
    color: rgb(46, 53, 63);
    min-width: 1000px;

    .navbar {
        position: absolute;
        top: 30%;
        width: 100%;
        height: 30px;

        .navbarLeft {
            width: 92%;

            .userName {
                margin-left: 20px;
            }
        }

        .navbarRight {
            width: 8%;
        }

        .navbarRight {
            cursor: pointer;
        }
    }

}

::v-deep .el-main {
    margin-top: 135px;
    background: rgb(127, 140, 159);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;

    .mainTable {
        display: inline-block;
        width: 1100px;
        height: 435px;
        min-width: 720px;
        background: rgba(153, 169, 191);
        color: rgb(211, 220, 230);
        padding: 15px 0px;

        .menu {
            display: inline-block;
            // position: absolute;
            width: 150px;
            // left: 120px;
            // top: 180px;
            margin: 15px -80px;
        }

        .lunbotu {
            position: absolute;
            width: 700px;
            display: inline-block;
            left: 50%;
            top: 20%;
            transform: translateX(-50%);
            z-index: 0;
            animation: fadeIn 0.3s ease-in-out;
        }

        .menu2 {
            position: absolute;
            width: 150px;
            display: inline-block;
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    84% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.search {
    z-index: 100;
}
</style>