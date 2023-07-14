<template>
    <div class="main">
        <el-container>
            <Navbar></Navbar>
            <FlyModel></FlyModel>
            <el-main>
                <Search @click="search"></Search>
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
        <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
            <div class="main">
                <div class="card-container">
                    <CommodityCard v-for="(item, index) in items" :key="index" :item="item"></CommodityCard>
                </div>
            </div>
        </div>
    </div>
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
const apiUrl = 'http://192.168.20.174:8080/commodity/mohu';
const scrollContainer = ref<HTMLElement | null>(null);
let items = reactive([]); // 分页数据
let page = 1; // 当前页数
const pageSize = 5; // 每页数据量
const fetchData = async () => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                page,
                pageSize
            }
        });
        const responseData = response.data;
        const records = responseData.data.records;
        items.push(...records);
    } catch (error) {
        console.error('请求出错:', error);
    }
};
const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // 判断滚动条是否滚动到页面底部
    console.log(document.documentElement.scrollTop);
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
    window.addEventListener('scroll', handleScroll);
    try {
        const response = await axios.get(apiUrl, {
            params: {
                page,
                pageSize
            }
        });
        const responseData = response.data;
        const records = responseData.data.records;
        items.push(...records);
    } catch (error) {
        console.error('请求出错:', error);
    }
});
scrollContainer.value?.addEventListener('scroll', handleScroll);
var scrollBar = ref('')
const search = () => {
    router.push({ name: 'search', query: { userId: 123 } });
}
</script>

<style scoped lang="scss">
* {
    padding: 0;

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

// div {
//     display: inline-block;
// }

::v-deep .el-header {
    position: relative;
    width: 100%;
    background: rgba(40, 24, 112, 0.9);
    color: rgb(247, 227, 198);
    min-width: 1000px;

    .navbar {
        position: absolute;
        top: 30%;
        width: 100%;
        height: 5%;

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
    margin-top: 120px;
    background: rgb(48, 28, 138, 0.8);
    // color: rgb(66, 49, 23);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;

    .mainTable {
        // display: flex;
        display: inline-block;
        // position: relative;
        width: 1100px;
        height: 400px;
        min-width: 720px;
        background: rgba(40, 24, 112, 0.6);
        color: rgb(247, 227, 198);
        padding: 15px 0px;

        .menu {
            display: inline-block;
            position: absolute;
            width: 150px;
            left: 120px;
            top: 180px;
        }

        .lunbotu {
            position: absolute;
            width: 700px;
            display: inline-block;
            left: 50%;
            transform: translateX(-50%);
        }

        .menu2 {
            position: absolute;
            width: 150px;
            display: inline-block;
            // padding-left: 10px;
        }
    }


}
</style>