<template>
    <div>
        <el-table :data="items" style="margin-top: 20px" v-loading="loading">
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="商品价格"></el-table-column>
            <el-table-column prop="breedname" label="商品类别"></el-table-column>
            <el-table-column prop="description" label="商品描述"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="text" size="mini" @click="editItem(row)">编辑</el-button>
                    <el-button type="text" size="mini" @click="deleteItem(row)">删除</el-button>
                    <el-button @click="uploadImage(row)">上传图片</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
            <span>
                <div class="uploadimg">
                    <el-upload class="upload-demo" drag :on-success="successUpload"
                        action="http://192.168.35.174:8080/upload" method="post" name="image" multiple>
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            拖曳 <em>或点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template>
                    </el-upload>
                </div>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="readyToUpload">
                        返回
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="editDialogVisible" title="编辑商品">
            <el-form :model="editFormData" inline>
                <el-form-item label="商品名称">
                    <el-input v-model="editFormData.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="editFormData.price" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                <el-form-item label="商品类别">
                    <el-input v-model="editFormData.breedname" placeholder="请输入商品类别"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="editFormData.description" placeholder="请输入商品描述"></el-input>
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
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted } from 'vue'
import { getWaitComInfo, addImage, deleteCommodity } from '@/axios/api'
import { UploadFilled } from '@element-plus/icons-vue'
const dialogVisible = ref(false)
let imageUrlCode = ref(0)
let imageUrl = ref('')
let ready = ref(false)
onMounted(async () => {
    try {
        const res = await getWaitComInfo<string>(localStorage.getItem("id"))
        console.log(res);

        if (res.code === 5002) {
            loading.value = false
            items.length = 0

            return
        }
        loading.value = false
        res.data.forEach((element: any, index: any) => {
            if (index >= items.length) {
                items.push({ name: '', price: 0, breedname: '', description: '', commodityID: 0 });
            }
            items[index].name = element.commodityName
            items[index].commodityID = element.commodityID
            items[index].price = element.price
            items[index].breedname = element.breedName
            items[index].description = element.gender
        });
    }
    catch (error) {
        console.error(error);
    }
});

let loading = ref(true)
interface Item {
    name: string;
    price: number;
    breedname: string;
    description: string;
    commodityID: number
}
const formData = reactive({
    name: '',
    price: 0,
    breedname: '',
    description: ''
});
const editFormData = reactive({
    name: '',
    price: 0,
    breedname: '',
    description: ''
});

const editDialogVisible = ref(false);

let items = reactive([{ name: '', price: 0, breedname: '', description: '', commodityID: 0 }]);
const showImage = () => {
    dialogVisible.value = !dialogVisible.value
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
const saveItem = () => {
    if (!editFormData.name || !editFormData.price || !editFormData.breedname || !editFormData.description) {
        ElMessage.error('请输入完整的商品信息');
        return;
    }
    const index = items.findIndex(item => item.name === editFormData.name);
    if (index !== -1) {
        items[index].name = editFormData.name;
        items[index].price = editFormData.price;
        items[index].breedname = editFormData.breedname;
        items[index].description = editFormData.description;
        editDialogVisible.value = false;
        ElMessage.success('商品更新成功');
    } else {
        ElMessage.error('找不到该商品');
    }
};
const deleteItem = (item: Item) => {
    ElMessageBox.confirm('确定要删除该商品吗？', '确认', {
        type: 'warning'
    })
        .then(() => {
            const index = items.findIndex(i => i.name === item.name);
            if (index !== -1) {
                console.log("index", items[index].commodityID);
                deleteCommodity<string>(items[index].commodityID).then((res: any) => {
                    console.log(res);
                    if (res.code === 3001) {
                        items.splice(index, 1);
                        ElMessage.success("删除成功")
                    }

                })
            }
        })
        .catch((error) => {
            console.log(error);
            ElMessage.error('删除失败')
        });
};
const successUpload = (response: any) => {//图片上传成功返回数据
    imageUrlCode.value = response.code
    imageUrl.value = response.data
}
const readyToUpload = () => {
    ready.value = true
}
const uploadImage = (row: any) => {
    if (ready.value === false) {
        dialogVisible.value = true
    }
    watch(ready, (newValue, oldValue) => {
        console.log(newValue);
        if (imageUrlCode.value === 101) {
            addImage<string>({
                commodityID: row.commodityID,
                imageURL: imageUrl.value
            }).then((res: any) => {
                if (res.code === 101)
                    ElMessage.success('上传成功');
                else
                    ElMessage.error('上传失败')
            })
        }


    })





}
</script>
  
<style>
.dialog-footer {
    text-align: right;
    padding: 10px 0;
}
</style>
  