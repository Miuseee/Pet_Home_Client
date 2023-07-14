<template>
    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
        <div class="main">
            <div class="card-container">
                <CommodityCard v-for="(item, index) in items" :key="index" :item="item"></CommodityCard>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue';
import axios from 'axios';
import CommodityCard from '@/components/CommodityCard.vue'
const apiUrl = 'http://192.168.20.174:8080/commodity/mohu';
const scrollContainer = ref<HTMLElement | null>(null);
let items = reactive([]); // 分页数据
let page = 1; // 当前页数
const pageSize = 12; // 每页数据量
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
        console.log(123);

        // 发起异步请求加载下一页数据
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
    // page++
});
scrollContainer.value?.addEventListener('scroll', handleScroll);
</script>
  
<style scoped>
.scroll-container {
    width: 1000px;
    margin: 0 auto;
}
</style>
  