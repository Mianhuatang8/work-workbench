<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>功能管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">精选图片</span>
    </div>


    <div style="background-color: white;padding: 30px;">
      <div
        style="display: flex;margin-bottom: 15px;justify-content: space-between;align-items: center;margin-left: 15px;">
        <el-button type="primary" style="margin-right: 8px;" @click="addPhoto()">+&nbsp;新建</el-button>
        <div style="display: flex;">
          <el-button type="primary" plain @click="delSome()">批量操作</el-button>
        </div>
      </div>

      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="imgSrc" align="center" header-align="center" label="图片">
          <template #default="scope">
            <el-image style="width: 100px; height: 100px;margin:10px 0;" :src="scope.row.imgSrc" />
          </template>
        </el-table-column>
        <el-table-column prop="type" align="center" header-align="center" label="类型">
        </el-table-column>
        <el-table-column prop="user" align="center" header-align="center" label="操作者">
        </el-table-column>

        <el-table-column prop="upLoadTime" align="center" header-align="center" label="上传时间">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <el-button type="primary" link @click="lookPhoto(scope.row)">查看</el-button>
              <el-button type="primary" link @click="editPhoto(scope.row)">编辑</el-button>
              <el-button type="danger" link @click="delItem(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 40px;display: flex;justify-content: flex-end;align-items: center;">
        <div style="margin-right: 15px;">
          共<span>{{ pages.total }}</span>条
        </div>
        <el-pagination v-model:current-page="pages.currentPage" :page-size="pages.limit" :small="small"
          :disabled="disabled" background layout=" prev, pager, next, jumper" :total="pages.total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
      </div>

    </div>
  </div>



  <!-- 新增图片 -->
  <el-dialog v-model="addDialogVisible" :title="type == 'add' ? '新增图片' : type == 'edit' ? '编辑图片' : '查看图片'" width="35%"
    :before-close="handleClose">
    <div>
      <div style="font-size: 16px;margin-bottom: 20px;" v-if="type != 'look'">上传图片</div>
      <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
        v-if="type != 'look'">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>

    <div>
      <div style="font-size: 16px;margin-bottom: 20px;margin-top: 10px;">备注</div>
      <el-input v-model="form.desc" placeholder="请输入" :disabled="type == 'look'"></el-input>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish(type)">完成</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadFilled, Plus, Select } from '@element-plus/icons-vue'


//分页条数据
const pages = ref({
  total: 1000,
  currentPage: 1,
  limit: 10

})

const tableData = ref([
  {
    imgSrc: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    type: '住宅设计',
    user: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
  },
  {
    imgSrc: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    type: '住宅设计',
    user: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
  },
  {
    imgSrc: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    type: '住宅设计',
    user: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
  },
  {
    imgSrc: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    type: '住宅设计',
    user: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
  },

])


const addDialogVisible = ref(false)
const type = ref('add')
const form = ref({
  imgSrc: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  desc: '',
})
//新增图片
const addPhoto = () => {
  type.value = 'add'
  addDialogVisible.value = true

}
//编辑图片
const editPhoto = () => {
  type.value = 'edit'
  addDialogVisible.value = true
}
//查看图片
const lookPhoto = () => {
  type.value = 'look'
  addDialogVisible.value = true

}

const fileList = ref([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//是否删除图片
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
//完成
const finish = (type) => {
  addDialogVisible.value = false

  if (type == 'add') {
    ElMessageBox.alert('新建成功', '提示', {
      icon: Select,
      confirmButtonText: 'OK',
    })
  }
  if (type == 'edit') {
    ElMessageBox.alert('修改成功', '提示', {
      icon: Select,
      confirmButtonText: 'OK',
    })
  }
}

//删除
const delItem = () => {
  ElMessageBox.confirm(
    '是否确认删除?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessageBox.alert('删除成功', '提示', {
        icon: Select,
        confirmButtonText: 'OK',
      })
    })
    .catch(() => {
      ElMessageBox.alert('取消删除', '提示', {
        confirmButtonText: 'OK',
      })
    })

}
//批量删除
const delSome = () => {
  ElMessageBox.alert('批量删除成功', '提示', {
    icon: Select,
    confirmButtonText: 'OK',
  })
}

onMounted(() => {
  document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";

})


</script>
  
<style lang="less" scoped>
:deep(.avatar-uploader .el-upload) {
   border: 1px dashed #d9d9d9;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
}

:deep(.avatar-uploader .el-upload:hover) {
   border-color: #409EFF;
}

:deep(.avatar-uploader-icon) {
   font-size: 28px;
   color: #8c939d;
   width: 178px;
   height: 178px;
   line-height: 178px;
   text-align: center;
}

:deep(.avatar) {
   width: 178px;
   height: 178px;
   display: block;
}

</style>