<template>
    <NavBar></NavBar>
    <el-radio-group v-model="page" style="position: absolute;left: 42%;top: 13%;">
        <el-radio label="1">个人信息中心</el-radio>
        <el-radio label="2">修改密码</el-radio>
        <el-radio label="3">收货地址</el-radio>
    </el-radio-group>
    <div v-if="page == '1'" class="userinfo">
        <el-button class="edit" @click="editDialogVisible1 = true">
            编辑个人信息
        </el-button>
        <el-descriptions title="欢迎来到个人中心" direction="vertical" :column="4" border style="width: 50%;">
            <el-descriptions-item label="用户编号" :span="2" prop="userID">{{ user.userID }}</el-descriptions-item>
            <el-descriptions-item label="姓名" :span="2" prop="userName">{{ user.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱" :span="2" prop="email">{{ user.email }}</el-descriptions-item>
            <el-descriptions-item label="手机号" :span="2" prop="phoneNumber">{{ user.phoneNumber }}</el-descriptions-item>
            <el-descriptions-item label="注册时间" :span="2" prop="registrationDate">{{ user.registrationDate
            }}</el-descriptions-item>
        </el-descriptions>
    </div>
    <el-dialog v-model="editDialogVisible1" title="编辑个人信息">
        <el-form :model="editFormDatauser" inline>
            <el-form-item label="姓名" prop="username">
                <el-input v-model="editFormDatauser.username" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editFormDatauser.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="editt">保存</el-button>
        </span>
    </el-dialog>
    <div v-if="page == '2'" class="userupdatepassword" style="position: absolute;top: 20%;left:41%">
        <div class="step">
            <el-steps direction="horizontal" :active="step">
                <el-step title="手机验证" />
                <el-step title="重置密码" />
                <el-step title="修改成功" />
            </el-steps>
        </div>
        <div class="step1" v-show="step === '1' ? true : false">
            <h2>手机验证</h2>
            <el-form :model="formData" label-width="0px">
                <el-form-item label=" " prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="verificationCode">
                    <el-input placeholder="请输入验证码" v-model="formData.verificationCode"></el-input>
                    <el-button class="vertify" type="primary" :disabled="isSendingCode" @click="sendVerificationCode">
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
                <el-form-item label="新密码 " prop="newPassword">
                    <el-input type="password" v-model="formData.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确定密码" prop="newPassword">
                    <el-input type="password" v-model="formData.renewPassword"></el-input>
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
    <div class="reset-password">
        <div class="userAddress info" v-if="page == '3'"
            style="position: absolute;margin-top: 200px;margin-left: 300px;width: 1200px;">
            <el-form :model="insertData" inline>
                <el-form-item label="收件人">
                    <el-input v-model="insertData.recipientName" placeholder="请输入收件人"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="insertData.city" placeholder="请输入城市"></el-input>
                </el-form-item>
                <el-form-item label="具体地址">
                    <el-input v-model="insertData.address" placeholder="请输入具体地址"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码">
                    <el-input v-model="insertData.postalCode" placeholder="请输入邮政编码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="insert">创建</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="items" style="margin-top: 20px">
                <el-table-column prop="addressID" label="地址编号"></el-table-column>
                <el-table-column prop="recipientName" label="收件人"></el-table-column>
                <el-table-column prop="address" label="具体地址"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="postalCode" label="邮政编码"></el-table-column>

                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="text" @click="editItem(row)">编辑</el-button>
                        <el-button type="text" @click="deleteItem(row)">删除</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog v-model="editDialogVisible" title="编辑地址">
            <el-form :model="editFormData" inline>
                <el-form-item label="收件人">
                    <el-input v-model="editFormData.recipientName" placeholder="请输入收件人"></el-input>
                </el-form-item>
                <el-form-item label="收件人地址">
                    <el-input v-model="editFormData.address" placeholder="请输入收件人地址"></el-input>
                </el-form-item>
                <el-form-item label="收件人城市">
                    <el-input v-model="editFormData.city" placeholder="收件人城市"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码">
                    <el-input v-model="editFormData.postalCode" placeholder="请输入邮政编码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveItem">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { onBeforeMount, ref, reactive } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { phoneVertify, geruser, getaddress, deleteaddress, insertaddress, updateaddress, userres, userupdate } from '@/axios/api';
let items = ref([{ addressID: '', recipientName: '', address: '', postalCode: '', city: '' }]);
const editFormData = reactive({
    recipientName: '',
    address: '',
    addressID: '',
    postalCode: '',
    city: ''
});
const insertData = reactive({
    recipientName: '',
    address: '',
    postalCode: '',
    city: '',
    userID: ''
});
const editDialogVisible = ref(false);
const editDialogVisible1 = ref(false);
const formData = ref({
    phone: '',
    verificationCode: '',
    renewPassword: '',
    newPassword: '',
    password: '',
    merchantName: '',
    merchantID: ''

});
const reset = () => {
    let judgePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    let judge = judgePassword.test(formData.value.newPassword)
    let dwadd = (formData.value.newPassword != formData.value.renewPassword)
    let oldpass = localStorage.getItem("pass")
    let repetition = (oldpass == formData.value.newPassword)
    if (dwadd) {
        ElMessage.error("两次输入的密码不同请重新输入")
        formData.value.newPassword = ''
        formData.value.renewPassword = ''
    }
    if (judge == false) {
        ElMessage.error('不符合规则请重新输入');
        formData.value.newPassword = ''
        formData.value.renewPassword = ''
    }
    if (repetition == true) {
        ElMessage.error('新旧密码重复，请重重输入');
        formData.value.newPassword = ''
        formData.value.renewPassword = ''
    }
    if (judge && repetition === false && !dwadd) {
        console.log('wocaonimsdawd')
        let awd: boolean
        console.log(formData)
        userres<string>({
            password: formData.value.newPassword,
            userID: localStorage.getItem("userID"),
        })
            .then((res: any) => {
                if (res.code = "1") { awd = true; }
                else { awd = false; }
                if (awd) { step.value = '3' }
                else {
                    ElMessage.error('验证失败请重新尝试');
                    step.value = '1'
                    formData.value.newPassword = ""
                    formData.value.renewPassword = ""
                    formData.value.password = ""
                }
            })

    }

};
const insert = () => {
    insertaddress<string>(insertData).then((res: any) => {
        if (res.code = '2001') ElMessage.success('新增成功')
        else ElMessage.error("新增失败")

    })

}
const sendVerificationCode = () => {//用户修改密码手机验证
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
            code.value = res
            console.log(res)
            ElMessage.success('验证码发送成功');
        })
    setTimeout(() => {

    }, 1000);
};
const editItem = (item: any) => {
    editFormData.recipientName = item.recipientName;
    editFormData.address = item.address;
    editFormData.addressID = item.addressID
    editFormData.postalCode = item.postalCode
    editFormData.city = item.city
    editDialogVisible.value = true
};
const editt = () => {
    userupdate<string>(editFormDatauser.value).then((res: any) => {
        if (res.code = '4001') {
            ElMessage.success("修改成功")
            editDialogVisible1.value = false
        }
        else {
            ElMessage.error('修改失败')

            editDialogVisible1.value = false
        }

    })
}

let user: any = ref([{
    phoneNumber: '',
    userName: '',
    password: '',
    userID: '',
    state: '',
    email: '',
    registrationDate: ''
}]);
const editFormDatauser = ref({
    phoneNumber: '',
    username: '',
    password: '',
    userID: '',
    email: '',
    registrationDate: '',
    verificationCode: ''

});
let isSendingCode = ref(false);
let countdown = ref(60);
let code = ref('1')
let timer: any = null;
let step = ref('')
let page = ref('')
const saveItem = () => {
    updateaddress<string>(
        editFormData
    ).then((res: any) => {
        if (res.code = '4001') { ElMessage.success('修改成功') }
        else { ElMessage.error("修改失败") }
    }
    )
};
const deleteItem = (item: any) => {
    deleteaddress<string>(item.addressID)
        .then((res: any) => {
            if (res.code = '1')
                ElMessage.success("删除成功")
            else
                ElMessage.error("删除失败")

            //删除商品
            //
        })

};
let phone = localStorage.getItem("phone")
onBeforeMount(() => {//获取用户信息?
    step.value = '1'
    page.value = '1'
    geruser<string>(phone)
        .then((res: any) => {
            user.value = res.data
            editFormDatauser.value = res.data
            insertData.userID = res.data.userID

        })
    let id = localStorage.getItem("userID")
    getaddress<string>(id)
        .then((res: any) => {
            items.value = res.data
        })
})
const vertifyCode = () => {//验证验证码
    if (code.value == formData.value.verificationCode && (formData.value.phone == phone)) {
        ElMessage.success("验证成功")
        step.value = '2'
    }
    else {
        ElMessage.error("验证码错误或者手机号错误请重新输入")
        formData.value.password = ''
    }
}
</script>

<style scoped lang="scss">
::v-deep .el-header {
    position: relative;
    width: 100%;
    background: rgb(149, 182, 229);
    color: rgb(94, 112, 140);
    min-width: 1000px;

    .navbar {
        position: absolute;
        top: 30%;
        width: 100%;
        height: 30px;

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

.userinfo {
    position: absolute;
    width: 1800px;
    left: 20%;
    top: 20%;

    // transform: translateX(-50%);
    .edit {
        position: absolute;
        bottom: -14%;
    }
}

.step1 {
    width: 600px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);

    .vertify {
        margin-top: 30px;
    }
}
</style>

