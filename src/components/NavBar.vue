<template>
    <div class="navbar">
        <el-header>
            <div class="navbar">
                <div class="navbarLeft">
                    <span class="userName">
                        <strong>Welcome!</strong> Miuseee
                    </span>
                </div>
                <div class="navbarRight">
                    退出登录
                </div>
            </div>
        </el-header>
    </div>
</template>
  
<script lang="ts" setup>

</script>
<style  lang="scss" scoped >
div {
    display: inline-block;
}

.navbar {
    position: fixed;
    // height: 100%;
    width: 100%;
    // overflow-y: scroll;
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
</style>
