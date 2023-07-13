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
    </div>
</template>

<script setup lang="ts">
import SideBar from '../../components/SideBar.vue'
import Swiper from '../../components/Swiper.vue'
import Search from '../../components/Search.vue'
import Navbar from '../../components/NavBar.vue';
import FlyModel from '@/components/FlyModel.vue';
import router from '@/router';
import { ref } from 'vue';
var keyword = ref('')
const search = () => {

    router.push({ name: 'search', query: { userId: 123 } });
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
        display: flex;
        width: 75%;
        height: 80%;
        min-width: 720px;
        background: rgba(40, 24, 112, 0.6);
        color: rgb(247, 227, 198);
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