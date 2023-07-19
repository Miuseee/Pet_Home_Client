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
        const response = await searchBreed<string>()  //记得改
        const res = response as unknown as { data: any[] }
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
    // margin-right: 30px;

    li {
        padding: 10px;
        margin-left: 100px;
        width: 120px;
        text-align: left;
        border: 1px solid white;
    }

    li:hover {
        cursor: pointer;
        background-color: lightgray;
        color: black;
        transition: .25s ease;
    }
}

.odd-row {
    background: rgba(29, 97, 170, 0.6);
    color: rgb(179, 187, 207);
}

.des {
    position: absolute;
    color: black;
    left: 40px;
    margin-top: -22px;
}
</style>
