<template>
    <div class="search">
        <div class="search bar4">
            <div class="form">
                <input type="text" v-model="breedName" placeholder="请输入您要搜索的内容...">
                <button type="submit" @click="search">GO!</button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { searchCommodity } from '@/axios/api'
const breedName = ref('')
const Array = ref([])
onMounted(async () => {
    // const res = await searchCommodity<string>(breedName.value)  //记得改
    // console.log(res.data[0].merchantID);
    // if (res.code === 5001) {
    //     ElMessage({
    //         message: '查询成功',
    //         type: 'success',
    //     })
    //     for (let i = 0; i < res.data.length; i++) {
    //         console.log(res.data[i].merchantID)
    //         Array.value[i] = res.data[i]
    //     }
    //     judge.value = true

    // }
    // console.log(Array.value);
})

const search = async () => {
    try {
        const res = await searchCommodity<string>(breedName.value)  //记得改
    }
    catch (error) {
        console.error(error);
    }

}
</script>
<style  lang="scss" scoped >
.search {
    position: fixed;
    top: 8%;
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
    background: rgba(211, 220, 230);
    color: rgb(127, 140, 159);
    border-radius: 30px;
}

.bar4 .form {
    background: rgba(211, 220, 230); // border: 2px solid black;
    border: 1px solid #3b373e;
    // box-shadow: inset1px 1px 1px red;
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
    background: rgb(127, 140, 159);
    color: white;
    // border: 2px solid black;
    // border-bottom: 2px solid #F9F0DA;
    transition: 0.3s;
}

.bar4 button:hover {

    background-color: #fbfafb;
    color: #000000;

}
</style>
