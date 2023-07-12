<template>
    <div class="merchant">
        <div class="header">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text-large font-600 mr-3"> 欢迎来到宠物之家商家管理系统 </span>
                </template>
            </el-page-header>
        </div>
        <div class="main">
            <div class="sidebar">
                <el-row class="tac">
                    <el-col :span="3">
                        <!-- <h5 class="mb-2">增删改查</h5> -->
                        <el-menu default-active="1">
                            <el-menu-item index="1" @click="gotoUserInfo">
                                <template #title>
                                    <el-icon>
                                        <location />
                                    </el-icon>
                                    <span>个人信息管理</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="2" @click="gotoComInfo">
                                <el-icon><icon-menu /></el-icon>
                                <span>商品管理</span>
                            </el-menu-item>
                            <el-menu-item index="3" @click="gotoWaitCom">
                                <el-icon>
                                    <document />
                                </el-icon>
                                <span>待审核列表</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>

                </el-row>
            </div>
            <div class="showInfo">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const goBack = () => {
    console.log('go back')
}
const gotoComInfo = () => {
    router.push("/users/merchanthome/cominfo")
}
const gotoWaitCom = () => {
    router.push("/users/merchanthome/waitcominfo")
}
const gotoUserInfo = () => {
    router.push("/users/merchanthome/personinfo")
}
</script>
<style lang="scss" scoped>
::v-deep .el-page-header {
    height: 60px;
    display: flex;
    // justify-content: center;
    align-items: center;
    border-bottom: 1px solid blue;
}

::v-deep .el-menu {
    width: 200px;
}

.main {
    display: flex;
    margin-top: 30px;

    .sidebar {
        flex: 2;
    }

    .showInfo {
        flex: 10;
    }
}
</style>