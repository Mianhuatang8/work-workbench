<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>功能管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">精选描述词</span>
    </div>


    <div style="background-color: white;padding: 30px;">
      <div
        style="display: flex;margin-bottom: 15px;justify-content: space-between;align-items: center;margin-left: 15px;">
        <el-button type="primary" style="margin-right: 8px;" @click="addWord()">+&nbsp;新建</el-button>
        <div style="display: flex;">
          <el-button type="primary" plain @click="delSome()">批量操作</el-button>
        </div>
      </div>

      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="descWord" align="center" header-align="center" label="描述词">
        </el-table-column>
        <el-table-column prop="type" align="center" header-align="center" label="类型">
        </el-table-column>
        <el-table-column prop="upLoadUser" align="center" header-align="center" label="上传用户">
        </el-table-column>

        <el-table-column prop="upLoadTime" align="center" header-align="center" label="上传时间">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <el-button type="primary" link @click="lookWord(scope.row)">查看</el-button>
              <el-button type="primary" link @click="editWord(scope.row)">编辑</el-button>

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



  <el-dialog v-model="addDialogVisible" :title="type == 'add' ? '新增描述词' : type == 'edit' ? '编辑描述词' : '查看描述词'" width="35%"
    :before-close="handleClose">
    <div>
      <div style="font-size: 15px;margin-bottom: 20px;">{{ type == 'look' ? '描述词' : '填写描述词' }}</div>
      <el-input v-model="textarea" maxlength="200" resize="none" placeholder="请输入" :disabled="type == 'look'"
        show-word-limit type="textarea"  />
    </div>
    <div>
      <div style="font-size: 15px;margin-bottom: 20px;margin-top: 10px;">选择类型</div>
      <el-select v-model="selectValue" class="m-2" placeholder="请选择" :disabled="type == 'look'">
        <el-option label="住宅设计" value="0" />
        <el-option label="建筑" value="1" />
        <el-option label="公共空间" value="2" />
        <el-option label="商业地产" value="3" />
      </el-select>
    </div>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish(type)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { ref,onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadFilled, Plus, Select, WarningFilled } from '@element-plus/icons-vue'

//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10

})

const tableData = ref([
  {
    descWord: '复古卧室，现实主义，轻松的，清晰的，呼拉拉拉拉，复古卧室，现实主义，轻松的，清晰的，呼拉拉拉拉',
    upLoadUser: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
    type: '住宅设计'
  },
  {
    descWord: '复古卧室，现实主义，轻松的，',
    upLoadUser: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
    type: '住宅设计'
  },
  {
    descWord: '复古卧室，现实主义，轻松的，',
    upLoadUser: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
    type: '住宅设计'
  },
  {
    descWord: '复古卧室，现实主义，轻松的，',
    upLoadUser: '后台用户',
    upLoadTime: '2020/09/10 12:23:33',
    type: '住宅设计'
  },
])
const textarea = ref('')

const addDialogVisible = ref(false)
const type = ref('add')

//新增描述词
const addWord = () => {
  type.value = 'add'
  addDialogVisible.value = true
}
//编辑描述词
const editWord = () => {
  type.value = 'edit'
  addDialogVisible.value = true
}
//查看描述词
const lookWord = () => {
  type.value = 'look'
  addDialogVisible.value = true
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
        icon:WarningFilled,
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
:deep(.el-textarea__inner) {
  height: 125px;
}
</style>