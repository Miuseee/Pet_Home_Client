<template>
    <div class="reset-password">
        <div class="step">
            <el-steps direction="horizontal" :active="step">
                <el-step title="手机号验证" />
                <el-step title="重置密码" />
                <el-step title="修改信息" />
            </el-steps>
        </div>

        <div class="step1" v-if="step === '1' ? true : false">
            <h2>重置密码</h2>
            <el-form :model="formData" label-width="0px" @submit.native.prevent="submitForm">
                <el-form-item label=" " prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="verificationCode">
                    <el-input placeholder="请输入验证码" v-model="formData.verificationCode"></el-input>
                    <el-button type="primary" :disabled="isSendingCode" @click="sendVerificationCode">
                        {{ isSendingCode ? `${countdown}s 后重新获取` : '获取验证码' }}
                    </el-button>
                    <el-button class="vertify" @click="vertifyCode">
                        验证
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="step2" v-if="step === '2' ? true : false">
            <el-form>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="formData.newPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" @click="reset">重置密码</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="step3" v-if="step === '3' ? true : false">
            验证成功
        </div>

    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { phoneVertify } from '@/axios/api';
const formData = ref({
    phone: '',
    verificationCode: '1',
    newPassword: '',
});
let isSendingCode = ref(false);
let countdown = ref(60);
let code = ref('1')
let timer: any = null;
let step = ref('1')
const sendVerificationCode = () => {
    if (isSendingCode.value) {
        return;
    }
    isSendingCode.value = true;
    countdown.value = 60;
    timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            isSendingCode.value = false;
            clearInterval(timer);
            timer = null;
        }
    }, 1000);
    phoneVertify<string>(formData.value.phone)
        .then((res: any) => {
            code.value = String(res)
        })
    setTimeout(() => {
        ElMessage.success('验证码发送成功');
    }, 1000);
};
const vertifyCode = () => {
    console.log("code", code.value);
    console.log('form', formData.value.verificationCode);
    if (code.value === formData.value.verificationCode) {  //验证成功
        step.value = '2'
    }
}
const reset = () => {
    step.value = '3'
};
</script>
  
<style scoped lang="scss">
.reset-password {
    max-width: 400px;
    margin: 0 auto;
}

.step {
    position: absolute;
    height: 50px;
    width: 700px;
    top: 100px;
    left: 450px;
}

::v-deep .el-input {
    width: 300px;
}

::v-deep .el-button {
    position: absolute;
    right: 90px;
}

.vertify {
    position: absolute;
    top: 50px;
    left: -10px;
    // width: 100px;
}

.step1 {
    margin-top: 100px;
}

.step2 {
    margin-top: 150px;
}

.step3 {
    margin: 150px auto;
    margin-left: 120px;
}
</style>
  