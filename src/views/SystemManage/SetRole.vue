<template>
   <div class="Container" style="padding:22px">
      <div style="margin-bottom: 30px; font-size: 17px;">
         <span>系统管理</span>
         <span style="margin:0 5px">/</span>
         <span style="margin:0 5px;font-weight: bold;">角色配置</span>
      </div>

      <div class="card-content">
         <div class="role-sort" style="display:flex;">
            <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
               角色
            </div>
            <div v-for="(item, index) in sortRole" :key="index"
               style="margin-right: 20px;font-size:14px;display: flex;align-items: center;cursor: pointer;"
               :class="selectRoleSortIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex(index)">
               {{ item }}</div>
         </div>
         <div class="datePick">

            <div style="display: flex;align-items: center;width: 52%;">
               <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
                  日期
               </div>
               <el-date-picker v-model="form.time" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  :picker-options="pickerOptions" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
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
      <!-- </el-card> -->

      <div style="background-color: white;padding: 30px;">
         <div
            style="display: flex;margin-bottom: 15px;justify-content: space-between;align-items: center;margin-left: 15px;">
            <el-button type="primary" style="margin-right: 8px;" @click="addRole()">+&nbsp;新建</el-button>
            <div style="display: flex;">
               <el-button type="primary" plain>批量操作</el-button>
               <el-button type="danger" plain @click="delSome()">删除</el-button>
            </div>
         </div>

         <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
            :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
            :cell-style="{ padding: 0 + 'px' }">

            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="id" align="center" header-align="center" label="角色ID">
            </el-table-column>
            <el-table-column prop="role" align="center" header-align="center" label="角色类型">
               <!-- <template #default="scope">
                  <div style="color: #009fff;">
                     {{ scope.row.role }}
                  </div>
               </template> -->
            </el-table-column>
            <el-table-column prop="roleCode" align="center" header-align="center" label="角色编号">
            </el-table-column>

            <el-table-column prop="updateTime" align="center" header-align="center" label="更新时间">
            </el-table-column>
            <el-table-column align="center" header-align="center" label="操作">
               <template #default="scope">
                  <div style="display: flex;justify-content: space-around; cursor: pointer;">
                     <el-button type="primary" @click="lookItem()" link>详情</el-button>
                     <el-button type="primary" @click="editItem(scope.row)" link>编辑</el-button>
                     <el-button type="primary" @click="startItem()" link>权限</el-button>
                     <el-button type="danger" @click="delItem(scope.row)" link>删除</el-button>

                     <!-- <div style="color: #009fff; " @click="editItem(scope.row)">编辑</div>
                     <div style="color: #009fff; " @click="startItem(scope.row)"></div> -->
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

   <!-- 新建角色对话框 -->
   <el-dialog v-model="dialogVisible" :title="type == 'add' ? '新建角色' : type == 'look' ? '查看角色详情' : '编辑角色'" width="35%"
      :before-close="handleClose">
      <div>
         <el-form :model="form" label-width="120px">
            <el-form-item label="角色类型">
               <el-input v-model="form.role" placeholder="请输入" />
            </el-form-item>

            <el-form-item label="角色编码">
               <el-input v-model="form.roleCode" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="系统后台权限设置" label-width="174px">
               <el-tree :data="router.options.routes.slice(0, 10)" show-checkbox node-key="name"
                  :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps" />
            </el-form-item>
         </el-form>
      </div>
      <template #footer>
         <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="finish()">完成 </el-button>
         </span>
      </template>
   </el-dialog>
</template>
  
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

const defaultProps = ref({
   children: 'children',
   label: 'name',
})
//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10

})
const router = useRouter()
// const route = useRoute()

const sortRole = ref(['不限', '管理员'])
const selectRoleSortIndex = ref(0)

const pickerOptions = ref({
   disabledDate(time) {
      // 设置选择今天及今天之后的日期
      return time.getTime() < Date.now() - 8.64e7;
   }

})

const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])

const tableData = ref([
   {
      id: '1',
      role: '超级管理员',
      roleCode: 'admin',
      updateTime: '2020/09/20 16:12:23'
   },
   {
      id: '2',
      role: '高级管理员',
      roleCode: 'admin',
      updateTime: '2020/09/20 16:12:23'
   },
   {
      id: '3',
      role: '普通管理员',
      roleCode: 'admin',
      updateTime: '2020/09/20 16:12:23'
   },])

const dialogVisible = ref(false)
const form = reactive({
   role: '',
   roleCode: '',
   permission: [],
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

const type = ref('add')
//新建角色
const addRole = () => {
   dialogVisible.value = true
   type.value = 'add'
}
//查看
const lookItem = () => {
   type.value = 'look'
   dialogVisible.value = true

}
//编辑
const editItem = (row) => {
   type.value = 'edit'
   dialogVisible.value = true

}


//完成新建修改
const finish = () => {
   dialogVisible.value = false
   if (type.value == 'add') {
      ElMessage({
         message: '新建成功',
         type: 'success',
      })
   }
   if (type.value == 'edit') {
      ElMessage({
         message: '修改成功',
         type: 'success',
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
         ElMessage({
            type: 'success',
            message: '删除成功',
         })
      })
      .catch(() => {
         ElMessage({
            type: 'info',
            message: '取消删除',
         })
      })

}
//批量删除
const delSome = () => {
   ElMessage({
      message: '删除成功',
      type: 'success',
   })

}


onMounted(() => {
   console.log('route-permission', router.options.routes);
   document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";
   // document.getElementsByClassName("el-pagination__total is-first")[0].childNodes[0].nodeValue = "共";

})
</script>
  
<style lang="scss" scoped>
.selectedRoleStyle {
   color: white;
   display: flex;
   justify-content: center;
   background-color: #06a6ff;
   width: 100px;
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
</style>