<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

            <el-form-item>
                <el-input v-model="formInline" placeholder="请输入商品名称搜索..."></el-input>
                <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-form :model="formData" inline>
            <el-form-item label="商品名称">
                <el-input v-model="formData.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="formData.price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品类别">
                <!-- <el-input v-model="formData.breedname" placeholder="请输入商品类别"></el-input> -->
                <el-select v-model="formData.breedname" class="m-2" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
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
                    <el-popover class="popover" placement="left-end" trigger="hover" @before-enter="showImage(row)"
                        popper-style="width:200px;height:200px;background-color: lightgray;">
                        <template #reference>
                            <el-button style="">
                                图片
                            </el-button>
                        </template>
                        <div class="img">
                            <span>
                                <div class="demo-image__preview">
                                    <el-image style="width: 150px; height: 150px;margin-right: 15px;" :src="url"
                                        :zoom-rate="1.2" :preview-src-list="srcList" :initial-index="4" fit="cover" />
                                </div>
                            </span>

                        </div>
                    </el-popover>

                </template>
            </el-table-column>

        </el-table>
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="totalPage" :current-page="page"
                @current-change="handleCurrentChange" />
        </div>
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
import { getComInfo, addCommodity, deleteCommodity, updateCommodity, searchByComName, getImg, searchBreed, getBreedName } from '@/axios/api'
import router from '@/router';
let url = ref('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')
const centerDialogVisible = ref(false)
let srcList = ref([
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
])
let loading = ref(true)
let formInline = ref("");
let totalPage = ref(1)
let page = ref(1)
const options = reactive([
])
onMounted(async () => {
    try {
        const res: any = await getComInfo<string>(
            {
                params: {
                    page: 1,
                    pageSize: 8,
                    merchantID: localStorage.getItem("id")
                }
            })  //记得改
        if (res.code === 2002) {
            items.length = 0
            loading.value = false
            return
        }
        loading.value = false
        res.data.forEach((element: any, index: any) => {
            if (index >= items.length) {
                items.push({ name: '', price: 0, status: 0, description: '', breedname: '', merchantID: 0, commodityID: 0 });
            }
            items[index].name = element.CommodityName
            items[index].price = element.Price
            items[index].breedname = element.BreedName
            items[index].description = element.Gender
            items[index].commodityID = element.CommodityID
        });
        totalPage.value = res.data[0].count
    }
    catch (error) {
        console.error(error);
    }
    try {
        const res: any = await searchBreed<string>()
        res.data.forEach((value: any, index: any) => {
            options.push({ value: value.breedName, label: value.breedName })
        })
    } catch (error) {
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
                console.log(res);
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
const showImage = (row: any) => {
    centerDialogVisible.value = true
    getImg<string>(row.commodityID).then((res: any) => {
        url.value = res.data
        srcList.value[0] = res.data
    })

};
const Search = () => {
    loading.value = true
    if (formInline == null) {
        ElMessage.error('请输入正确的商品名字');
        loading.value = false
        return;
    }
    else {
        localStorage.getItem('id');
        searchByComName<string>({
            merchantID: localStorage.getItem('id'),
            commodityName: formInline.value
        }).then((res: any) => {
            if (res.code === 5001) {
                loading.value = false
                ElMessage({
                    message: '查询成功',
                    type: 'success',
                })
                res.data.forEach((element: any, index: any) => {
                    if (index >= items.length) {
                        items.push({ name: '', price: 0, status: 0, description: '', breedname: '', merchantID: 0, commodityID: 0 });
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
            loading.value = false
        })
    }
}
const handleCurrentChange = async (currentpage: any) => {
    page.value = currentpage
    loading.value = true
    try {
        const res: any = await getComInfo<string>(
            {
                params: {
                    page: currentpage,
                    pageSize: 8,
                    merchantID: localStorage.getItem("id")
                }
            })  //记得改
        if (res.code === 2002) {
            loading.value = false
            items.length = 0
            return
        }
        for (let i = 0; i < 8; i++) {
            items.pop()
        }
        loading.value = false
        res.data.forEach((element: any, index: any) => {
            if (index >= items.length) {
                items.push({ name: '', price: 0, status: 0, description: '', breedname: '', merchantID: 0, commodityID: 0 });
            }
            items[index].name = element.CommodityName
            items[index].price = element.Price
            items[index].breedname = element.BreedName
            items[index].description = element.Gender
            items[index].commodityID = element.CommodityID
        });
        loading.value = false
    }
    catch (error) {
        console.error(error);
    }
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

.img {
    position: absolute;

    top: 12%;
    right: 5%;

    z-index: 1000;
}
</style>
  