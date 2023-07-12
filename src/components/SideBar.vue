<template>
    <div>
        <ul>
            <li v-for="(item, index) in tableData" :key="item.id" :class="{ 'odd-row': index % 2 === 0 }"
                @mouseenter="showDes(item)" @mouseleave="hideDes(item)" @click="gotoSearchView(item)">
                {{ item.breedName }}
                <div class="des" v-if="item.show">{{ item.description }}</div>
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { searchBreed } from '@/axios/api'
import router from '@/router';
onMounted(async () => {
    try {
        const res = await searchBreed<string>()  //记得改
        // console.log("初始", tableData)
        res.data.forEach((element: any, index: any) => {
            tableData.value[index] = element
        });
    }
    catch (error) {
        console.error(error);
    }
});
const tableData = ref([
    {
        id: 1,
        breedName: '主食',
        description: "我朝主食",
        show: ref(false)
    },
    {
        id: 2,
        breedName: '零食',
        description: "我朝零食",
        show: ref(false)
    },
    {
        id: 3,
        breedName: '玩具',
        description: "我朝玩具",
        show: ref(false)
    },
    {
        id: 4,
        breedName: '药物',
        description: "我朝药物",
        show: ref(false)
    },
])
const gotoSearchView = (item: any) => {
    // console.log(item.breedName)
    localStorage.setItem('breedName', item.breedName)
    router.push("/users/searchview")
}
const showDes = (item: any) => {
    item.show = !item.show
}
const hideDes = (item: any) => {
    item.show = !item.show
}
</script>
<style  lang="scss" scoped >
ul {
    width: 80px;
    height: 100px;
    list-style: none;
    padding: 0;
    margin: 0 auto;

    li {
        padding: 10px;
        margin-left: 20px;
        width: 120px;
        text-align: left;
    }

    li:hover {
        cursor: pointer;
        background-color: lightgray;
        transition: .25s ease;
    }
}

.odd-row {
    background-color: rgb(113, 109, 109);
    color: white;
}

.des {
    position: absolute;
    color: black;
    left: 120px;
    margin-top: -22px;
}
</style>
