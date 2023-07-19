<template>
    <div class="reset-password">
        <div class="step">
            <el-steps direction="horizontal" :active="step">
                <el-step title="手机号验证" />
                <el-step title="重置密码" />
                <el-step title="验证成功" />
            </el-steps>
        </div>

        <div class="step1" v-show="step === '1' ? true : false">
            <h2>重置密码</h2>
            <el-form :model="formData" label-width="0px">
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
        <div class="step2" v-show="step === '2' ? true : false">
            <el-form>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="formData.newPassword"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-text class="mx-1" type="warning">请输入正确密码：含8-16个字符且有数字，密码第一个字符大写</el-text>
                </el-form-item>
                <el-form-item>

                    <el-button type="primary" @click="reset">重置密码</el-button>

                </el-form-item>
            </el-form>
        </div>
        <div class="step3" v-show="step === '3' ? true : false">
            修改密码成功，请返回首页！
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { phoneVertify, MerchantRecode } from '@/axios/api';
import { el } from 'element-plus/es/locale';
const formData = ref({
    phone: '',
    verificationCode: '1',
    newPassword: '',
    password: '',
    merchantName: '',
    merchantID: ''

});
let isSendingCode = ref(false);
let countdown = ref(60);
let code = ref('1')
let timer: any = null;
let step = ref('')
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
            console.log(res)
            console.log(code.value)
            console.log(code.value)

        })
    setTimeout(() => {
        ElMessage.success('验证码发送成功');
    }, 1000);
};
onBeforeMount(() => {
    step.value = '1'
})
const vertifyCode = () => {
    step.value = '2'
    console.log("code", code.value);
    console.log('form', formData.value.verificationCode);
    if (code.value === formData.value.verificationCode) {  //验证成功
        step.value = '2'
    }
    else ElMessage.error('验证失败，请重新尝试')
}

const submit = () => {
    console.log("dawjfhakwdjakfd")
    formData.value.merchantName = localStorage.getItem("merchantName")
    formData.value.merchantID = localStorage.getItem("id")
    MerchantRecode<string>({
        passord: formData.value.newPassword

    })
        .then((res: any) => {
            console.log(res)
            if (res.code = "5001")
                console.log("wdawd")
            else console.log("64868");
        })



}

const reset = () => {
    let judgePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    let judge = judgePassword.test(formData.value.newPassword)
    let oldpass = localStorage.getItem("pass")
    let repetition = (oldpass == formData.value.newPassword)
    if (judge == false) {
        ElMessage.error('不符合规则请重新输入');
    }
    if (repetition == true) {
        ElMessage.error('新旧密码重复，请重重输入');

    }
    if (judge && repetition == false) {
        let awd: boolean
        formData.value.merchantName = localStorage.getItem("merchantName")
        formData.value.merchantID = localStorage.getItem("id")
        console.log(formData)
        MerchantRecode<string>({
            password: formData.value.newPassword,
            merchantName: formData.value.merchantName,
            merchantID: formData.value.merchantID
        })
            .then((res: any) => {
                console.log(res)
                if (res.code = "4001") { awd = true; }
                else { awd = false; }
                console.log(awd)
                if (awd) { step.value = '3' }
                else {
                    ElMessage.error('验证失败请重新尝试');
                    step.value = '1'
                    formData.value.newPassword = ""
                    formData.value.phone = ""
                    formData.value.verificationCode = ""
                }
            })

    }

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
  