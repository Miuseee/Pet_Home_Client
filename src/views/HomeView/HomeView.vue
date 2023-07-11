<template>
    <div class="main">
        <el-container>
            <el-header>
                <div class="navbar">
                    <div class="navbarLeft">
                        <span class="userName">
                            <strong>Welcome!</strong> Miuseee
                        </span>
                    </div>
                    <div class="navbarRight">
                        <!-- <span>登录</span>&nbsp;
                        <span>|</span>&nbsp;
                        <span>注册</span> -->
                        退出登录
                    </div>
                </div>
            </el-header>
            <el-main>
                <!-- <div class="search">
                    <div class="search bar4">
                        <form>
                            <input type="text" placeholder="请输入您要搜索的内容...">
                            <button type="submit">GO!</button>
                        </form>
                    </div>
                </div> -->
                <Search></Search>
                <div class="mainTable">
                    <div class="menu">
                        <SideBar></SideBar>
                    </div>
                    <div class="lunbotu">
                        <Swiper></Swiper>
                    </div>
                    <div class="menu2">123</div>
                </div>
            </el-main>

            <!-- <el-footer></el-footer> -->
        </el-container>
    </div>
</template>

<script setup lang="ts">
import SideBar from '../../components/SideBar.vue'
import Swiper from '../../components/Swiper.vue'
import Search from '../../components/Search.vue'
import { ref } from 'vue';
var keyword = ref('')
const search = () => {
    alert('正在搜索')
}
</script>

<style scoped lang="scss">
* {
    padding: 0;
}

.main {
    position: fixed;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
}

div {
    display: inline-block;
}

::v-deep .el-header {
    position: relative;
    width: 100%;
    // height: 4.2%;
    background-color: #e93819;
    color: #F9F0DA;
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
    margin-top: 60px;
    background-color: rgb(153, 153, 161);
    display: flex;
    justify-content: center;
    align-items: center;





    .mainTable {
        display: flex;
        width: 75%;
        height: 80%;
        min-width: 720px;
        background-color: #fafafa;
        padding: 15px 0px;

        .menu {
            flex: 2;
        }

        .lunbotu {
            flex: 8;
        }

        .menu2 {
            flex: 2;
            padding-left: 10px;
        }
    }


}

// ::v-deep .el-footer {
//     height: 10%;
// }
</style>