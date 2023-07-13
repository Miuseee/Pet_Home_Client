<template>
    <div class="login" v-loading="loading">
        <div class="loginbox">
            <Transition name="loginShow">
                <div class="message" ref="message" v-if="!changeLogToRegister">
                    <div class="ask">已有账号？</div>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon="true" :rules="rules" label-width="120px"
                        class="demo-ruleForm">
                        <el-form-item label=" " class="input usertel" prop="usertel">
                            <el-input v-model="ruleForm.usertel" placeholder="请输入手机号" type="usertel" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label=" " class="input password" prop="pass">
                            <el-input v-model="ruleForm.pass" type="password" placeholder="请输入密码" show-password
                                autocomplete="off" />
                        </el-form-item>
                        <div class="my-2 flex items-center text-sm first">
                            <el-radio-group v-model="radio2" class="ml-4" fill="#FF7F50">
                                <el-radio label="2">用户</el-radio>
                                <el-radio label="1">商家</el-radio>
                            </el-radio-group>
                        </div>
                        <el-form-item label=" " class="combo">
                            <el-button class="button loginbutton" type="primary" @click="submitForm()">Go!</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="gotoreg" @click="change">
                        立即注册
                    </div>
                </div>
            </Transition>
            <Transition name="loginShow1">
                <div class="message1" v-if="changeLogToRegister">
                    <h1 class="Regtitle">
                        Hey! 现在注册
                    </h1>
                    <h2 class="RegSecondTitle">
                        为您的爱宠创造美好生活！
                    </h2>
                </div>
            </Transition>


        </div>
        <div class="registerbox">
            <Transition name="loginShow">
                <div class="message1" v-if="changeLogToRegister">
                    <div class="ask">开始注册！</div>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon="true" :rules="rules" label-width="120px"
                        class="demo-ruleForm">
                        <el-form-item label=" " class="input username" prop="username">
                            <el-input v-model="ruleForm.username" placeholder="请输入用户名" type="username" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label=" " class="input tel" prop="usertel">
                            <el-input v-model="ruleForm.usertel" placeholder="请输入手机号" type="usertel" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label=" " class="input password" prop="registerpass">
                            <el-input v-model="ruleForm.registerpass" type="password" placeholder="请输入密码" show-password
                                autocomplete="off" />
                        </el-form-item>
                        <el-form-item label=" " class="input password" prop="registerpassjudge">
                            <el-input v-model="ruleForm.registerpassjudge" type="password" placeholder="请输入密码" show-password
                                autocomplete="off" />
                        </el-form-item>
                        <div class="my-2 flex items-center text-sm">
                            <el-radio-group v-model="radio2" class="ml-4" fill="#FF7F50">
                                <el-radio label="2">用户</el-radio>
                                <el-radio label="1">商家</el-radio>
                            </el-radio-group>
                        </div>
                        <el-form-item label=" " class="combo">
                            <el-button class="button registerbutton" type="primary"
                                @click="submitForm()">Register!</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="gotologin" @click="change">
                        返回登陆
                    </div>
                </div>
            </Transition>

            <Transition name="loginShow2">
                <div class="message1" v-if="!changeLogToRegister">
                    <h1>开始探索！宠物之家</h1>
                </div>
            </Transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '@/router/index'
import { ElMessage } from 'element-plus'//消息提示框
import type { FormInstance, FormRules } from 'element-plus'
import { register, login, userLogin, userRegister } from '@/axios/api';
const ruleFormRef = ref<FormInstance>()
let changeLogToRegister = ref(false)
let message = ref(null)
let radio2 = ref('1')
let loading = ref(false)
const validatePass = (rule: any, value: any, callback: any) => {
    let judgePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    if (value === '') {
        callback(new Error('请输入密码'))
    }
    else if (!judgePassword.test(value))
        callback(new Error('8-16个字符，至少1个大写字母、1个小写字母和1个数字：'))
    else {
        if (ruleForm.pass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validateUsername = (rule: any, value: string, callback: any) => {
    console.log(value.length)
    if (!value) {

        return callback(new Error('请输入用户名'))
    }
    else if (value.length < 6 || value.length > 12) {
        callback(new Error('用户名长度必须在6~12位之间'))
    } else {
        callback()
    }

}
const validatePassJudge = (rule: any, value: string, callback: any) => {
    if (value != ruleForm.registerpass) {
        return callback(new Error('两次密码输入请保持一致'))
    }
    else if (!value) {
        return callback(new Error('请确认密码'))
    }
    else {
        callback()
    }

}
const validateTelJudge = (rule: any, value: string, callback: any) => {
    const regex = /^1[3-9]\d{9}$/;
    if (regex.test(value)) {
        callback()
    } else {
        return callback(new Error('手机号格式错误'))
    }
}
let ruleForm = reactive({
    username: '',
    pass: '',
    registerpass: '',
    registerpassjudge: '',
    usertel: '',
    radio2: 2
})
const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    registerpass: [{ validator: validatePass, trigger: 'blur' }],
    registerpassjudge: [{ validator: validatePassJudge, trigger: 'blur' }],
    usertel: [{ validator: validateTelJudge, trigger: 'blur' }]
})
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
interface RegisterResponse {  //注册接口来返回数据
    code: any;
    data: Object;
    merchantID: any
    // 其他字段...
}
const submitForm = async () => {  //提交表单
    if (radio2.value === '2') {  //用户登陆注册
        console.log('进入用户登录模块');
        if (ruleForm.pass !== '') {
            try {
                loading.value = true
                const res: RegisterResponse = await userLogin<RegisterResponse>({
                    phoneNumber: ruleForm.usertel,
                    password: ruleForm.pass,
                })
                console.log(res);

                if (res.code === 101) {
                    localStorage.setItem('userID', res.data.userID)
                    loading.value = false
                    router.push('/users/home')
                } else {
                    loading.value = false
                    ElMessage.error('登陆失败')
                }
            }
            catch (error) {
                loading.value = false
                console.error(error);
            }
        }
        else {
            try {
                loading.value = true
                const res: RegisterResponse = await userRegister<RegisterResponse>({
                    phoneNumber: ruleForm.usertel,
                    password: ruleForm.registerpass,
                    username: ruleForm.username,
                    state: ruleForm.radio2
                })
                if (res.code === 1) {
                    ElMessage({
                        message: '注册成功，马上登录！',
                        type: 'success',
                    })
                    loading.value = false
                    ruleForm.pass = ruleForm.registerpass
                    changeLogToRegister.value = !changeLogToRegister.value
                    return
                } else
                    alert("去你妈的")
            }
            catch (error) {
                loading.value = false
                console.error(error);
                // message.value = 'Registration failed';
            }
        }
    }
    else {//商家登陆注册
        if (ruleForm.pass === '') {
            loading.value = true
            try {
                const res: RegisterResponse = await register<RegisterResponse>({
                    merchantName: ruleForm.username,
                    password: ruleForm.registerpass,
                    phoneNumber: ruleForm.usertel,
                    state: ruleForm.radio2
                })
                if (res.code === 101) {
                    console.log(res);

                    ElMessage({
                        message: '注册成功，马上登录！',
                        type: 'success',
                    })
                    loading.value = false
                    ruleForm.pass = ruleForm.registerpass
                    changeLogToRegister.value = !changeLogToRegister.value
                    return
                }
                else if (res.code === 303) {
                    ruleForm.username = '',
                        ruleForm.usertel = '',
                        ruleForm.registerpassjudge = '',
                        ruleForm.registerpass = '',
                        ruleForm.radio2 = 1
                    loading.value = false
                    ElMessage.error('有重复的用户名或手机号,请重新输入')
                    return
                }
            }
            catch (error) {
                console.error(error);
            }

        }
        else { //商家登录逻辑
            try {
                loading.value = true
                const res: RegisterResponse = await login<RegisterResponse>({
                    phoneNumber: ruleForm.usertel,
                    password: ruleForm.pass,
                })
                console.log(res);

                if (res.code === 101) {
                    localStorage.setItem("id", res.data.merchantID)
                    loading.value = false
                    router.push('/users/merchanthome')
                    return
                } else if (res.code === 202) {
                    ElMessage.error('有重复的用户名或手机号,请重新输入')
                    return
                }
            }
            catch (error) {
                loading.value = false
                console.error(error);
                // message.value = 'Registration failed';
            }

        }
    }
}
const change = () => {  //改变登陆注册
    changeLogToRegister.value = !changeLogToRegister.value
}

</script>
<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: lightgray;
    overflow: hidden;
}

.loginbox {
    position: relative;
    width: 600px;
    height: 600px;
    background-color: rgba(121, 42, 255, 0.6);

    .ask {
        position: absolute;
        top: 27%;
        left: 50%;
        transform: translate(-50%, 0%);
        font-size: 20px;
    }

    .demo-ruleForm {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .gotoreg {
        position: absolute;
        padding: 10px;
        right: 0;
    }

    .message1 {
        margin-top: 130px;
        margin-left: 50px;

        h1 {

            color: rgb(247, 227, 198);
            font-size: 50px;
        }

        h2 {
            font-size: 40px;
            color: white;
        }
    }
}

::v-deep .el-input__suffix .el-input__suffix-inner {
    color: green;
}

::v-deep .el-form-item__label {
    width: 0 !important;
}

::v-deep .el-form-item__content {
    margin: 0 auto;
}

::v-deep .el-form-item {
    width: 250px;
    background: transparent;

    .el-form-item__error {
        width: 400px;
    }
}

::v-deep .el-input__wrapper {
    background-color: transparent;
    border-bottom: 1px solid #c7c3c3;
    box-shadow: none;
    font-style: #fff;

    .el-input__inner {
        background-color: transparent;
    }
}

::v-deep .el-form-item.is-error .el-input__wrapper {
    box-shadow: none;
}

::v-deep .combo {
    position: relative;
    width: 238px;
    height: 30px;
    padding: 0;
    margin: 50px auto;

    .button {
        width: 60px;
        height: 30px;
        margin-left: 1px;
    }

    .loginbutton {
        width: 100px;
        margin: 0 auto;
        border-radius: 40px;
        color: rgb(128, 33, 176);
        background-color: #fff;
        border: 0;
    }

    .loginbutton:hover {
        border: 1px solid purple;
        transition: 0.5s;
        transform: rotate(360deg);
    }

    .registerbutton {
        width: 100px;
        margin: 0 auto;
        border-radius: 40px;
        color: #fff;
        background-color: rgb(128, 33, 176);
        border: 0;
    }

    .registerbutton:hover {
        border: 1px solid purple;
        transition: 0.5s;
        transform: rotate(-360deg);
    }
}

.registerbox {
    position: relative;
    // margin: 180px 70px;
    margin-left: 0px;
    width: 600px;
    height: 600px;
    background-color: rgb(255, 255, 255);

    .ask {
        position: absolute;
        top: 17%;
        left: 50%;
        transform: translate(-50%, 0%);
        font-size: 20px;
    }

    .message1 {
        margin-top: 350px;
        margin-left: 50px;

        h1 {

            color: rgb(160, 32, 240);
            font-size: 50px;
        }
    }

    .demo-ruleForm {
        padding: 45px 0 0 0;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);

    }

    .gotologin {
        position: absolute;
        left: 0;
        top: 0;
        padding: 10px;
    }

    .el-radio-group {
        margin-left: 14px;
        margin-bottom: -10px;
    }
}

::v-deep .el-radio__input.is-checked+.el-radio__label {
    color: rgb(150, 57, 156);
}

::v-deep .first .el-radio-group {
    margin-left: 13px;
    margin-top: 5px;

    // background-color: #fff;
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #43075f;
        background-color: rgb(62, 8, 74);
    }

    .el-radio__input.is-checked+.el-radio__label {
        color: #fff;
    }
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: rgb(150, 57, 156);
    background: rgb(150, 57, 156);
}

.loginShow-enter,
.loginShow-leave-to {
    opacity: 0;
}

.loginShow-enter-active,
.loginShow-leave-active {
    transition: 0.5s;
}

.loginShow1-enter,
.loginShow1-leave-to {
    transform: translateY(-200px);
    opacity: 0;


}

.loginShow1-enter-active,
.loginShow1-leave-active {
    transition: 0.5s;

}

.loginShow2-enter,
.loginShow2-leave-to {
    transform: translateY(200px);
    opacity: 0;


}

.loginShow2-enter-active,
.loginShow2-leave-active {
    transition: 0.5s;

}
</style>