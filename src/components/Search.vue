<template>
    <div class="search">
        <div class="search bar4">
            <form>
                <input type="text" placeholder="请输入您要搜索的内容...">
                <button type="submit">GO!</button>
            </form>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
var keyword = ref('')
const search = () => {
    alert('正在搜索')
}
</script>
<style  lang="scss" scoped >
div.search {
    position: fixed;
    top: 8%;
    left: 39%;
}

form {
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

.bar4 form {
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
