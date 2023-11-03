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
               <el-date-picker v-model="form.time" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="daterange"
                  start-placeholder="开始日期" end-placeholder="结束日期" style="float:left">
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


         <!-- 实现数据可拖拽 -->
         <div style="width:100%" class="draggable">
            <el-table :data="tableData" style="width: 100%;margin-left: 15px; margin-bottom: 20px" row-key="id"
            :key="tableKey"
               :header-cell-style="{ background: '#F2F3F8' }" max-height="380"
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
                        <el-popconfirm title="请问确定要删除吗?" confirm-button-text="是" cancel-button-text="取消"
                           @confirm="delItem()">
                           <template #reference>
                              <div style="color: red; ">删除</div>
                           </template>
                        </el-popconfirm>
                     </div>
                  </template>
               </el-table-column>
            </el-table>
         </div>

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

      <el-form ref="addFormRef" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
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
            <el-upload class="avatar-uploader" action="#" :http-request="uploadFile" :show-file-list="false"
               :on-change="handleAvatarChange">
               <img v-if="form.imgSrc" :src="form.imgSrc" class="avatar" />
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
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import draggable from "vuedraggable";
import Sortable from 'sortablejs'
import $ from 'jquery'

//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10

})

const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])
const sortRank = ref(['不限', '一级', '二级', '三级'])
const selectRankIndex = ref(0)
const changeIndex = (index) => {
   selectRankIndex.value = index
}

const tableKey = ref('')
var tableData = reactive([
   {
      id: 1,
      rankStyle: '一级',
      rankName: '住宅空间',
      backImg: '-',
      user: '后台用户',
      updateTime: '2022/09/12 12:34:33',
      changePermission: false,
      parentId: 0,
      level: 1,
      children: [
         {
            id: 11,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: false,
            parentId: 1,
            level:2,
            children: [
               {
                  id: 111,
                  rankStyle: '三级',
                  rankName: '美式',
                  backImg: '-',
                  user: '后台用户',
                  updateTime: '2022/09/12 12:34:33',
                  changePermission: false,
                  parentId: 11,
                  level: 3,
               },
               {
                  id: 112,
                  rankStyle: '三级',
                  rankName: '日式',
                  backImg: '-',
                  user: '后台用户',
                  updateTime: '2022/09/12 12:34:33',
                  changePermission: true,
                  parentId: 11,
                  level: 3,
               },
            ],
         },
         {
            id: 12,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: true,
            parentId: 1,
            level: 2,
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
      parentId: 0,
      level: 1,
   },
   {
      id: 3,
      rankStyle: '一级',
      rankName: '住宅空间',
      backImg: '-',
      user: '后台用户',
      updateTime: '2022/09/12 12:34:33',
      changePermission: true,
      parentId: 0,
      level: 1,
      children: [
         {
            id: 31,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: false,
            parentId: 3,
            level: 2,
         },
         {
            id: 32,
            rankStyle: '二级',
            rankName: '住宅空间',
            backImg: '-',
            user: '后台用户',
            updateTime: '2022/09/12 12:34:33',
            changePermission: false,
            parentId: 3,
            level: 2,
         },
      ],
   },

])

var activeRows = reactive([]) // 转换为列表的数据
//将树结构平铺成列表
const treeToTile = (tableData, childKey = 'children') => {
   const arr = []
   const expanded = data => {
      if (data && data.length > 0) {
         data.filter(d => d).forEach(e => {
            arr.push(e)
            expanded(e[childKey] || [])
         })
      }
   }
   expanded(tableData)
   return arr
}
//将列表数据转换成树形结构
const changeToTree = (list, parentId = 0) => {
   const tree = []
   list.map((item) => {
      if (item.parentId == parentId) {
         //判断是否有子节点
         const children = changeToTree(list, item.id)
         if (children.length != 0) {
            item.children= children
         }
         tree.push(item)
      }
   })
   return tree
}

const type = ref('add')
const addDialogVisible = ref(false)
//表单数据
const form = reactive({
   sortName: '',
   sortRank: null,
   backImg: '',
   desc: '',
   time: null,
   imgSrc: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
})
const addFormRef = ref(null)

//上传图片
const uploadFile = (file) => {
   let json;
   form.imgSrc = null;
   let formData = new FormData();
   formData.append("fil1", file.file);
   $.ajax({
      url: "https://3dapi.shixianjia.com/api/file/upload",
      type: "POST",
      contentType: false,
      processData: false,
      async: false,
      headers: {
         token:
            "F45BD6CCB4BF39394DDC58F8C4B125D5271D9A11D4B1E9BB67F53FDBFB1A547B",
      },
      data: formData,
      success: function (data) {
         console.log(data.Data, 8888);
         let url = JSON.parse(data.Data);
         json = url;
         // addForm.cover = url;
      },
   });
   form.imgSrc = json[0];
   console.log('json[0]', json[0]);
   console.log(form.imgSrc);
   console.log('点击上传图片', form.imgSrc);
}

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
const finish = async (type) => {
   addFormRef.value.validate((valid, fields) => {
      if (valid) {
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
         console.log('submit!')
      } else {
         console.log('error submit!', fields)
         return false
      }
   })
}


//删除
const delItem = () => {
   ElMessage({
      message: '删除成功',
      type: 'success',
   })
}

//行拖拽
const rowDrop = () => {
   const tbody = document.querySelector(
      ".draggable .el-table__body-wrapper tbody"
   );
   console.log(tbody, 'tbody')
   Sortable.create(tbody, {
      animation: 100,
      draggable: ".draggable .el-table__row",
      onMove: function ({ dragged, related }) {
         // evt.dragged; // 被拖拽的对象
         // evt.related; // 被替换的对象
         const oldRow = activeRows[dragged.rowIndex]
         const newRow = activeRows[related.rowIndex]
         console.log('newRow',newRow);
         console.log('oldRow',oldRow);
         //限制只能同级别之间移动
         if (oldRow.level !== newRow.level || oldRow.parentId !== newRow.parentId) {
            return false
         }
      },

      onEnd({ newIndex, oldIndex }) {
         console.log('newIndex', newIndex);
         console.log('oldIndex', oldIndex);
         //数据进行移动-修改activeRow的数据顺序
         const currRow = activeRows.splice(oldIndex, 1)[0]
         console.log('currRow', currRow);
         const aa = activeRows.splice(newIndex, 0, currRow)
         console.log('修改后activeRows的数据', activeRows);
         const newTabledata = changeToTree(activeRows, 0)
         //修改table的数据
         // nextTick(() => {
            tableData = newTabledata
            tableKey.value = new Date().getTime()
            console.log('新表单数据', newTabledata);
         // })
      }
   })
}

onMounted(() => {
   document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";
   activeRows = treeToTile(tableData)
   console.log("树结构转化成列表", activeRows);
   rowDrop()
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