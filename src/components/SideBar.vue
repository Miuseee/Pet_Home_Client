<template>
    <div>
        <ul>
            <li v-for="(item, index) in tableData" :key="item.id" :class="{ 'odd-row': index % 2 === 0 }"
                @mouseenter="showDes(item)" @mouseleave="hideDes(item)">
                {{ item.breed }}
                <div class="des" v-if="item.show.value">{{ item.Description }}</div>
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
const tableData = [
    {
        id: 1,
        breed: '主食',
        Description: "我朝主食",
        show: ref(false)
    },
    {
        id: 2,
        breed: '零食',
        Description: "我朝零食",
        show: ref(false)
    },
    {
        id: 3,
        breed: '玩具',
        Description: "我朝玩具",
        show: ref(false)
    },
    {
        id: 4,
        breed: '药物',
        Description: "我朝药物",
        show: ref(false)
    },
]
const showDes = (item: any) => {
    item.show.value = !item.show.value
}
const hideDes = (item: any) => {
    item.show.value = !item.show.value
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
