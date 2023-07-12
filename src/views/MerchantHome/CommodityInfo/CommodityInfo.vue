<template>
    <div>
        <el-form :model="formData" inline>
            <el-form-item label="商品名称">
                <el-input v-model="formData.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="formData.price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品类别">
                <el-input v-model="formData.breedname" placeholder="请输入商品类别"></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input v-model="formData.description" placeholder="请输入商品描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createItem">创建</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="items" style="margin-top: 20px" v-loading="loading">
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="商品价格"></el-table-column>
            <el-table-column prop="breedname" label="商品类别"></el-table-column>
            <el-table-column prop="description" label="商品描述"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="text" size="mini" @click="editItem(row)">编辑</el-button>
                    <el-button type="text" size="mini" @click="deleteItem(row)">删除</el-button>
                    <el-button @click="showImage">查看图片</el-button>
                </template>
            </el-table-column>
        </el-table>
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
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted } from 'vue'
import { getComInfo, addCommodity, deleteCommodity, updateCommodity } from '@/axios/api'
import router from '@/router';
let loading = ref(true)
onMounted(async () => {
    try {
        const res = await getComInfo<string>(localStorage.getItem("id"))  //记得改
        console.log(res);
        if (res.code === 5002) {
            items.length = 0
            loading.value = false
            return
        }
        loading.value = false
        res.data.forEach((element: any, index: any) => {
            // items
            if (index >= items.length) {
                items.push({ name: '', price: 0, status: 0, description: '', breedname: '', merchantID: 0, commodityID: 0 });
            }
            items[index].name = element.commodityName
            items[index].price = element.price
            items[index].breedname = element.breedName
            items[index].description = element.gender
            items[index].commodityID = element.commodityID
        });
    }
    catch (error) {
        console.error(error);
    }
});

interface Item {
    name: string;
    price: number;
    breedname: string;
    description: string;
    merchantID: string;
    commodityID: 0;
}

const formData = reactive({
    name: '',
    price: 0,
    breedname: '',
    description: '',
    merchantID: localStorage.getItem("id")
});

const editFormData = reactive({
    name: '',
    price: 0,
    breedname: '',
    description: '',
    commodityID: 0
});

const editDialogVisible = ref(false);

let items = reactive([{ name: '', price: 0, status: 0, description: '', breedname: "", merchantID: 0, commodityID: 0 }]);

const createItem = () => {
    loading.value = true
    if (!formData.name || !formData.price || !formData.breedname || !formData.description) {
        ElMessage.error('请输入完整的商品信息');
        return;
    }
    try {
        const res = addCommodity<string>({
            commodityName: formData.name,
            merchantID: formData.merchantID,
            gender: formData.description,
            price: formData.price,
            breedName: formData.breedname
        }).then((res: any) => {
            if (res.code === 2001) {
                ElMessage({
                    message: '添加成功，请上传图片',
                    type: 'success',
                })
                router.push('/users/merchanthome/waitcominfo')
            }
        })

    }
    catch (error) {
        console.error(error);
    }
    formData.name = '';
    formData.price = 0;
    formData.breedname = '';
    formData.description = '';
    loading.value = false
    ElMessage.success('商品创建成功');
};

const editItem = (item: Item) => {
    editFormData.name = item.name;
    editFormData.price = item.price;
    editFormData.breedname = item.breedname;
    editFormData.description = item.description;
    editFormData.commodityID = item.commodityID
    editDialogVisible.value = true;
};

const saveItem = (item: Item) => {
    console.log(editFormData.commodityID);

    if (!editFormData.name || !editFormData.price || !editFormData.breedname || !editFormData.description) {
        ElMessage.error('请输入完整的商品信息');
        return;
    }
    const index = items.findIndex(item => item.name === editFormData.name);
    if (index !== -1) {

        updateCommodity<string>({
            commodityName: editFormData.name,
            merchantID: localStorage.getItem('id'),
            gender: editFormData.description,
            price: editFormData.price,
            breedName: editFormData.breedname,
            commodityID: editFormData.commodityID,
            sure: 1
        }).then((res: any) => {
            console.log(res);

            if (res.code === 4001) {
                editDialogVisible.value = false;
                ElMessage.success('商品更新成功');
                items[index].name = editFormData.name;
                items[index].price = editFormData.price;
                items[index].breedname = editFormData.breedname;
                items[index].description = editFormData.description;
            }
            else {
                ElMessage.error('商品删除成功');
            }
        })


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
const showImage = () => {
    console.log(123);

}
</script>
  
<style>
.dialog-footer {
    text-align: right;
    padding: 10px 0;
}

.uploadimg {
    z-index: 100;
}
</style>
  