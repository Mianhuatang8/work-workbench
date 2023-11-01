<template>
   <div class="Container" style="padding:22px">
      <div style="margin-bottom: 30px; font-size: 17px;">
         <span>功能管理</span>
         <span style="margin:0 5px">/</span>
         <span style="margin:0 5px;font-weight: bold;">类型管理</span>
      </div>

      <div class="card-content">
         <div class="role-sort" style="display:flex;">
            <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
               级别
            </div>
            <div v-for="(item, index) in sortRank" :key="index"
               style="margin-right: 20px;font-size:14px;display: flex;align-items: center;cursor: pointer;"
               :class="selectRankIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex(index)">
               {{ item }}</div>
         </div>
         <div class="datePick">

            <div style="display: flex;align-items: center;width: 52%;">
               <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
                  日期
               </div>
               <el-date-picker v-model="form.time" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                  style="float:left">
               </el-date-picker>
               <div class=" " v-for="(item, index) in daysArr" :key="index" style="cursor: pointer;">
                  <div @click="setTimeByDays(index)"
                     style="margin:0 12px;width: 60px;line-height: 32px;font-size: 14px;margin:0 15px">
                     {{ item }}
                  </div>
               </div>
            </div>
            <div style="display: flex;margin-right: 60px;">
               <el-button type="primary" style="margin-right:10px;" :icon="Search">查询</el-button>
               <el-button>重置</el-button>

            </div>
         </div>

      </div>


      <div style="background-color: white;padding: 30px;">
         <div
            style="display: flex;margin-bottom: 15px;justify-content: space-between;align-items: center;margin-left: 15px;">
            <el-button type="primary" style="margin-right: 8px;" @click="addSort()">+&nbsp;新建</el-button>
            <div style="display: flex;">
               <el-button type="primary" style="margin-right: 8px;" plain>批量操作</el-button>
               <el-button type="danger" plain>删除</el-button>
            </div>
         </div>

         <el-table :data="tableData" style="width: 100%;margin-left: 15px; margin-bottom: 20px" row-key="id"
            default-expand-all :header-cell-style="{ background: '#F2F3F8' }" max-height="380"
            :row-style="{ height: 40 + 'px' }" :cell-style="{ padding: 0 + 'px' }">
            <!-- sortable  -->
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="id" label="类别ID" />
            <el-table-column prop="rankStyle" label="等级类型" align="center" header-align="center" />
            <el-table-column prop="rankName" label="类别名称" align="center" header-align="center" />
            <el-table-column prop="backImg" label="类别底图" align="center" header-align="center" />
            <el-table-column prop="user" label="操作者" align="center" header-align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" header-align="center" />
            <el-table-column align="center" header-align="center" label="操作">
               <template #default="scope">
                  <div style="display: flex;justify-content: space-around; cursor: pointer;align-items: center;">
                     <el-switch v-model="scope.row.changePermission" @change="updatePermission" />
                     <div style="color: #009fff; " @click="editSort(scope.row)">编辑</div>
                     <el-popconfirm title="请问确定要删除吗?" confirm-button-text="是" cancel-button-text="取消" @confirm="delItem()">
                        <template #reference>
                           <div style="color: red; ">删除</div>
                        </template>
                     </el-popconfirm>
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


   <!-- 新建类型/修改类型 -->
   <el-dialog v-model="addDialogVisible" :title="type == 'add' ? '新增类型' : '编辑类型'" width="35%" :before-close="handleClose">

      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
         status-icon>
         <el-form-item label="类型名称" prop="sortName">
            <el-input v-model="form.sortName" />
         </el-form-item>
         <el-form-item label="级别分类" prop="sortRank">
            <el-select v-model="form.sortRank" placeholder="请选择">
               <el-option label="一级" value="0" />
               <el-option label="二级" value="1" />
            </el-select>
         </el-form-item>
         <el-form-item label="类别底图" prop="backImg">
            <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
               :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
               <img v-if="imageUrl" :src="imageUrl" class="avatar" />
               <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
               </el-icon>
            </el-upload>
         </el-form-item>
         <el-form-item label="用户备注" prop="desc">
            <el-input v-model="form.desc" />
         </el-form-item>

      </el-form>


      <template #footer>
         <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="finish(type)">完成</el-button>
         </span>
      </template>
   </el-dialog>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'


//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10

})

const pickerOptions = ref({
   disabledDate(time) {
      // 设置选择今天及今天之后的日期
      return time.getTime() < Date.now() - 8.64e7;
   }

})

const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])


const sortRank = ref(['不限', '一级', '二级',])
const selectRankIndex = ref(0)
const changeIndex = (index) => {
   selectRankIndex.value = index
}

const tableData = ref([
   {
      id: 1,
      rankStyle: '一级',
      rankName: '住宅空间',
      backImg: '-',
      user: '后台用户',
      updateTime: '2022/09/12 12:34:33',
      changePermission: false,

      children: [
         {
            id: 11,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: false,
         },
         {
            id: 12,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: true,
         },
      ],
   },
   {
      id: 2,
      rankStyle: '一级',
      rankName: '住宅空间',
      backImg: '-',
      user: '后台用户',
      updateTime: '2022/09/12 12:34:33',
      changePermission: true,
   },
   {
      id: 3,
      rankStyle: '一级',
      rankName: '住宅空间',
      backImg: '-',
      user: '后台用户',
      updateTime: '2022/09/12 12:34:33',
      changePermission: true,

      children: [
         {
            id: 31,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: false,
         },
         {
            id: 32,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: false,
         },
      ],
   },

])

const type = ref('add')
const addDialogVisible = ref(false)
//表单数据
const form = reactive({
   sortName: '',
   sortRank: null,
   backImg: '',
   desc: '',
   time: null
})
const formatDate = (time) => {
   const y = time.getFullYear();
   const yy = y < 10 ? '0' + y : y
   const m = time.getMonth() + 1;
   const mm = m < 10 ? '0' + m : m
   const d = time.getDate();
   const dd = d < 10 ? '0' + d : d
   return `${yy}-${mm}-${dd}`;
}

const setTimeByDays = (value) => {
   console.log('点击日期', value);
   const end = new Date()
   const start = new Date()
   if (value == 1) {
      // const date = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      end.setTime(end.getTime() - 3600 * 1000 * 24)
   } else if (value == 2) {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
   } else if (value == 3) {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
   }
   //对获取到的时间进行格式化
   form.time = [formatDate(start), formatDate(end)]
   // console.log('form的time', formData.time);
}



const rules = reactive({
   sortName: [
      { required: true, message: '请输入类型名称', trigger: 'blur' },
   ],
   sortRank: [
      {
         required: true,
         message: '请选择级别分类',
         trigger: 'change',
      },
   ],
})
//照片墙图片
const fileList = ref([])
//新建
const addSort = () => {
   type.value = 'add'
   addDialogVisible.value = true
}
//编辑
const editSort = () => {
   type.value = 'edit'
   addDialogVisible.value = true

}

//完成
const finish = (type) => {
   addDialogVisible.value = false
   if (type == 'add') {
      ElMessage({
         message: '新建成功',
         type: 'success',
      })
   }
   if (type == 'edit') {
      ElMessage({
         message: '修改成功',
         type: 'success',
      })
   }
}
//删除
const delItem = () => {
   ElMessage({
      message: '删除成功',
      type: 'success',
   })
}

onMounted(() => {
   document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";

})

</script>
  
<style scoped lang="scss">
.selectedRoleStyle {
   color: white;
   display: flex;
   justify-content: center;
   background-color: #06a6ff;
   width: 60px;
   line-height: 30px;
   height: 30px;
   border-radius: 25px;
}

.card-content {
   background-color: white;
   padding: 17px;
   margin-bottom: 30px;

   .datePick {
      display: flex;
      margin-top: 28px;
      align-items: center;
      justify-content: space-between;
   }
}

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