<template>
    <div class="searchView">
        <NavBar></NavBar>
        <div class="search">
            <div class="search bar4">
                <div class="form">
                    <input type="text" v-model="commodityName" placeholder="请输入您要搜索的内容...">
                    <button type="submit" @click="search">GO!</button>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="card-container">
                <CommodityCard v-for="(item, index) in data" :key="index" :item="item"></CommodityCard>
            </div>
        </div>
    </div>
    <el-skeleton v-if="show" :rows="16" animated style="position: absolute;width: 1173px;margin: 160px 130px;" />
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import NavBar from '@/components/NavBar.vue';
import CommodityCard from '@/components/CommodityCard.vue';
import { searchCommodity, searchByComNameUser } from '@/axios/api';
import { ElMessage } from 'element-plus';
const breedName = ref('');
breedName.value = localStorage.getItem('breedName');
let dataArray = reactive([]);
const data = ref([]);
let show = ref(true)
let commodityName = ref('')

onMounted(async () => {
    try {
        const res = await searchCommodity<string>(breedName.value);
        if (res.code === 5001) {
            ElMessage({
                message: '查询成功',
                type: 'success',
            });
            dataArray.push(...res.data);
            data.value = dataArray;
            show.value = false
        }
    } catch (error) {
        console.error(error);
    }
});

const search = async () => {
    data.value = []
    dataArray = []
    try {
        const res = await searchByComNameUser<string>({
            params: {
                page: '1',
                pageSize: '10',
                name: commodityName.value
            }
        });
        console.log(res.data.records)
        if (res.code === 101) {
            ElMessage({
                message: '查询成功',
                type: 'success',
            }
            );
            dataArray.push(...res.data.records);
            data.value = dataArray;
        }
    } catch (error) {
        console.error(error);
    }
};
</script>
  
<style scoped lang="scss">
.main {
    position: absolute;
    top: 160px;
    left: 130px;
    width: 1173px;
    background-color: rgb(215, 215, 215);
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    // gap: 20px;
    overflow: hidden;
}

div.search {
    position: fixed;
    top: 10%;
    left: 39%;
}

.form {
    position: relative;
    width: 300px;
    margin: 0 auto;
}

input,
button {
    border: none;
    outline: none;
}

input {
    width: 100%;
    height: 42px;
    padding-left: 13px;
}

button {
    height: 44px;
    width: 44px;
    cursor: pointer;
    position: absolute;
}

.bar4 {
    background: #F15B42;
    border-radius: 30px;
}

.bar4 .form {
    background: #F9F0DA;
    border: 1px solid #BE290E;
    border-radius: 30px;
}

.bar4 input,
.bar4 button {
    background: transparent;
    border-radius: 0 30px 30px 0;
}

.bar4 button {
    position: absolute;
    top: 0px;
    right: 0;
    background-color: #BE290E;
    color: #fafafa;
    // border-bottom: 2px solid #F9F0DA;
}

.bar4 button:hover {
    background-color: #fafafa;
    color: #BE290E;

}
</style>
  