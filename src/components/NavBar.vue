<template>
    <div class="navbar">
        <el-header>
            <div class="navbar">
                <div class="navbarLeft">
                    <span class="userName">
                        <strong>Welcome!</strong> Miuseee
                    </span>
                </div>
                <div class="navbarRight" @click="logout">
                    退出登录
                </div>
            </div>
        </el-header>
    </div>
</template>
  
<script lang="ts" setup>
import { logOut } from '@/axios/api'
import router from '@/router';
const logout = () => {
    localStorage.clear()
    logOut<string>()
    router.push('/users/login')
}
</script>
<style  lang="scss" scoped >
div {
    display: inline-block;
}

.navbar {
    // overflow: hidden;
    position: fixed;
    height: 30px;
    width: 100%;
    // overflow-y: scroll;
    z-index: 1;
}

::v-deep .el-header {
    position: relative;
    width: 100%;
    height: 60px;
    background-color: rgb(104, 131, 104);
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
</style>
