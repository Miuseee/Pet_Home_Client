<template>
    <div>
        <el-form :inline="true" :model="failedSearch" class="demo-form-inline">

            <el-form-item>
                <el-input v-model="failedSearch" placeholder="请输入商品名称搜索..."></el-input>
                <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="items" style="margin-top: 20px" v-loading="loading">
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="商品价格"></el-table-column>
            <el-table-column prop="breedname" label="商品类别"></el-table-column>
            <el-table-column prop="description" label="商品描述"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="text" size="mini" @click="">编辑</el-button>
                    <el-button type="text" size="mini" @click="deleteItem(row)">删除</el-button>
                    <el-button v-if="isUpload === 1 ? true : false" @click="uploadImage(row)">上传图片</el-button>
                    <el-button v-if="isUpload === 0 ? true : false" @click="showImage(row)">
                        查看图片
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="centerDialogVisible" title="查看图片" width="30%" center>
            <span>
                <div class="demo-image__preview">
                    <el-image style="width: 100px; height: 100px;margin: 0 135px;" :src="url" :zoom-rate="1.2"
                        :preview-src-list="srcList" :initial-index="4" fit="cover" />
                </div>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
            <span>
                <div class="uploadimg">
                    <el-upload class="upload-demo" drag :on-success="successUpload"
                        action="http://192.168.9.174:8080/upload" method="post" name="image" multiple>
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
import { getWaitComInfo, addImage, deleteCommodity, searchByComNameFail, getImg } from '@/axios/api'
import { UploadFilled } from '@element-plus/icons-vue'
let failedSearch = ref("");
let isUpload = ref(1)
const dialogVisible = ref(false)
let imageUrlCode = ref(0)
let imageUrl = ref('')
let ready = ref(false)
let url = ref('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')
const centerDialogVisible = ref(false)
let srcList = ref([
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
])
onMounted(async () => {
    try {
        const res: any = await getWaitComInfo<string>({
            params: {
                page: 1,
                pageSize: 5,
                merchantID: localStorage.getItem("id")
            }

        })
        if (res.code === 5002) {
            loading.value = false
            items.length = 0
            return
        }
        loading.value = false
        res.data.forEach((element: any, index: any) => {
            if (index >= items.length) {
                items.push({ name: '', price: 0, breedname: '', description: '', commodityID: 0, merchantID: 0 });
            }
            console.log(res);

            items[index].name = element.CommodityName
            items[index].commodityID = element.CommodityID
            items[index].price = element.Price
            items[index].breedname = element.BreedName
            items[index].description = element.Gender
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

let items = reactive([{ name: '', price: 0, breedname: '', description: '', commodityID: 0, merchantID: 0 }]);


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
        if (imageUrlCode.value === 101) {
            addImage<string>({
                commodityID: row.commodityID,
                imageURL: imageUrl.value
            }).then((res: any) => {
                console.log(res);

                if (res.code === 101) {
                    isUpload.value = 0
                    ElMessage.success('上传成功');

                }

                else
                    ElMessage.error('上传失败')
            })
        }
    })
}
const Search = () => {
    if (failedSearch == null) {
        ElMessage.error('请输入正确的商品名字');
        return;
    }
    else {
        localStorage.getItem('id');
        searchByComNameFail<string>({
            merchantID: localStorage.getItem('id'),
            commodityName: failedSearch.value
        }).then((res: any) => {
            if (res.code === 5001) {
                ElMessage({
                    message: '添加成功，请上传图片',
                    type: 'success',
                })
                res.data.forEach((element: any, index: any) => {
                    if (index >= items.length) {
                        items.push({ name: '', price: 0, description: '', breedname: '', merchantID: 0, commodityID: 0 });
                    }
                    items[index].name = element.commodityName
                    items[index].price = element.price
                    items[index].breedname = element.breedName
                    items[index].description = element.gender
                    items[index].commodityID = element.commodityID
                });
                let len = items.length
                for (let i = res.data.length; i < len; i++) {
                    items.pop()
                }
            }
        })
    }
}
const showImage = (row: any) => {
    centerDialogVisible.value = true
    getImg<string>(row.commodityID).then((res: any) => {
        url.value = res.data
        srcList.value[0] = res.data
    })

};
</script>
  
<style>
.dialog-footer {
    text-align: right;
    padding: 10px 0;
}
</style>
  