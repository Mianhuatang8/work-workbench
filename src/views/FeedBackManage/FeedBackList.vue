<template>
   <div class="Container" style="padding:17px 44px">

      <div>
         <div style="margin-bottom: 30px; font-size: 17px;">
            <span>反馈管理</span>
            <span style="margin:0 5px;">/</span>
            <span style="font-weight: bold;">反馈列表</span>
         </div>

         <div style="background-color: white;padding: 30px;font-size: 14px;">
            <div style="display: flex; justify-content: space-between;">
               <div style="display: flex;align-items: center;">
                  <div style="margin-right: 10px;">平台内容</div>
                  <el-select placeholder="请选择平台内容" style="width:270px" v-model="formData.QState">
                     <el-option label="质量" value="0"></el-option>
                     <el-option label="风格" value="1"></el-option>
                     <el-option label="数量" value="2"></el-option>
                     <el-option label="产出时间" value="3"></el-option>
                     <el-option label="版权" value="4"></el-option>
                     <el-option label="应用场景-类型" value="5"></el-option>
                     <el-option label="应用场景-会员" value="6"></el-option>
                     <el-option label="订单问题" value="7"></el-option>
                     <el-option label="其他" value="8"></el-option>
                  </el-select>
               </div>

               <div style="display: flex;align-items: center;">
                  <div style="margin-right: 10px;">问题类型</div>
                  <el-select placeholder="请选择问题类型" style="width:270px" v-model="formData.QState">
                     <el-option label="使用咨询" value="0"></el-option>
                     <el-option label="需求建议" value="1"></el-option>
                     <el-option label="BUG" value="2"></el-option>
                     <el-option label="其他" value="3"></el-option>
                  </el-select>
               </div>


               <div style="display: flex;align-items: center; ">
                  <div style="margin-right: 10px;">反馈日期</div>
                  <!-- style="width:270px;" -->
                  <el-date-picker v-model="formData.time" @change="changeTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                   type="daterange"
                     range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <div class="dateOption">
                     <p @click="setTimeByDays(0)">今天</p>
                     <p @click="setTimeByDays(1)">昨天</p>
                     <p @click="setTimeByDays(7)">最近7天</p>
                     <p @click="setTimeByDays(30)">最近30天</p>
                  </div>
               </div>


               <div style="display: flex;align-items: center;">
                  <el-button type="primary" style="margin-right:12px" @click="getList()">查询</el-button>
                  <el-button @click="reset()">重置</el-button>
               </div>
            </div>


         </div>

         <div class="reportContentBox" style="margin-top:30px;">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
               <div style="display: flex;justify-content: end; margin-bottom: 10px;">
                  <el-button type="primary" plain @click="roleLeadingOut">导出为Excel</el-button>
               </div>
               <el-tab-pane label="全部订单" name="all">
                  <el-table ref="tableRef" :data="tableData" id="el-table" @select="selectTab"
                     style="width: 100%;margin-left: 15px;" :header-cell-style="{ background: '#F2F3F8' }" max-height="380"
                     :row-style="{ height: 40 + 'px' }" :cell-style="{ padding: 0 + 'px' }">

                     <el-table-column type="selection" width="60">
                     </el-table-column>

                     <el-table-column prop="orderID" align="center" header-align="center" label="反馈编号" width="250">
                     </el-table-column>
                     <el-table-column prop="userID" align="center" header-align="center" label="用户ID" width="250">
                     </el-table-column>
                     <el-table-column prop="title" align="center" header-align="center" label="反馈标题">
                     </el-table-column>
                     <el-table-column prop="content" align="center" header-align="center" label="平台内容">
                     </el-table-column>
                     <el-table-column prop="problemType" align="center" header-align="center" label="问题类型">
                     </el-table-column>
                     <el-table-column prop="feedBackFrom" align="center" header-align="center" label="反馈来源">
                     </el-table-column>
                     <el-table-column prop="state" align="center" header-align="center" label="反馈状态">
                        <template #default="scope">
                           <span :style="{ 'color': getStateColor(scope.row.state) }"> {{
                              getStateText(scope.row.state) }}</span>
                        </template>
                     </el-table-column>
                     <el-table-column prop="time" align="center" header-align="center" label="反馈时间" width="200">
                     </el-table-column>

                     <el-table-column align="center" header-align="center" label="操作">
                        <template #default="scope">
                           <div style="display: flex;justify-content: space-around; cursor: pointer;align-items: center;">
                              <div style="color: #009fff; " @click="lookDetail(scope.row)">详情</div>
                           </div>
                        </template>
                     </el-table-column>
                  </el-table>

                  <!-- 模态框 -->
                  <el-dialog v-model="dialog" title="表格导出" width="30%" @close="close">
                     <el-input v-model="file_name" placeholder="请输入导出文件的文件名"></el-input>
                     <template #footer>
                        <span class="dialog-footer">
                           <el-button @click="dialog = false">取消</el-button>
                           <el-button type="primary" @click="save">
                              确定
                           </el-button>
                        </span>
                     </template>
                  </el-dialog>

               </el-tab-pane>
               <el-tab-pane label="待处理" name="wait">待处理</el-tab-pane>
               <el-tab-pane label="已完成" name="finish">已完成</el-tab-pane>
               <el-tab-pane label="已关闭" name="close">已关闭</el-tab-pane>
            </el-tabs>


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
   </div>
</template>
   
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Select } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { reactive, toRefs, ref, onMounted, nextTick, getCurrentInstance } from 'vue'

// 依赖引入
import FileSaver from "file-saver";
import * as XLSX from 'xlsx'

//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10

})

const router = useRouter()

const tableData = ref([
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      title: '我是反馈标题我是反馈标题',
      content: '产出时间',
      problemType: '需求建议',
      feedBackFrom: 'web',
      state: 0,//0-待处理 1-已完成 2-已关闭
      time: '2020/02/12 12:33:11'
   },
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      title: '我是反馈标题我是反馈标题',
      content: '产出时间',
      problemType: '需求建议',
      feedBackFrom: 'web',
      state: 1,//0-待处理 1-已完成 2-已关闭
      time: '2020/02/12 12:33:11'
   },
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      title: '我是反馈标题我是反馈标题',
      content: '产出时间',
      problemType: '需求建议',
      feedBackFrom: 'web',
      state: 2,//0-待处理 1-已完成 2-已关闭
      time: '2020/02/12 12:33:11'
   },
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      title: '我是反馈标题我是反馈标题',
      content: '产出时间',
      problemType: '需求建议',
      feedBackFrom: 'web',
      state: 0,//0-待处理 1-已完成 2-已关闭
      time: '2020/02/12 12:33:11'
   },
])
//收集表单数据
const formData = reactive({
   UniqueCode: "",
   Title: "",
   Role: "",
   CollectId: "",
   QState: null,
   PageIndex: 1,
   PageSize: 8,
   time:null
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
  } else if (value == 7) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
  } else if (value == 30) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
  }
  //对获取到的时间进行格式化
  formData.time = [formatDate(start), formatDate(end)]
  // console.log('form的time', formData.time);
}


const activeName = ref('all')
const getStateColor = (row) => {
   if (row == 0) {
      return "orange";
   } else if (row == 1) {
      return "#0adf0a";
   } else if (row == 2) {
      return "gray";
   }
}

const getStateText = (row) => {
   if (row == 0) {
      return "待处理";
   } else if (row == 1) {
      return "已完成";
   } else if (row == 2) {
      return "已关闭";
   }
}

//点击查看举报详情
const lookDetail = () => {
   router.push({
      path: '/feedBackDetail'
   })

}

// 用来访问内部组件实例
const { proxy } = getCurrentInstance()

const dialog = ref(false)
// 表格导出excel
function roleLeadingOut() {
   // getSelectionRows() 是el-table官方提供的方法（返回当前表格选中的行）
   // 表格没有指定导出数据时是全部导出（否则是替换表格数据）
   const selectList = proxy?.$refs.tableRef.getSelectionRows()
   if (selectList.length) {
      tableData.value = proxy?.$refs.tableRef.getSelectionRows()
   }
   dialog.value = true
}

//关闭对话框 取消导出
function close() {
   dialog.value = false
}

//确定导出excel文件
const file_name = ref('')
function save() {
   dialog.value = false
   ElMessage({
      message: '导出成功',
      type: 'success',
   })
   nextTick(function () {
      let filename = ''
      const xlsxParam = { raw: true } //转化成Excel使用原始格式
      const elTable = XLSX.utils.table_to_book(document.getElementById('el-table'), xlsxParam)
      if (file_name.value === '') {
         // 默认导出文件名
         filename = '反馈列表.xlsx'
      } else {
         filename = file_name.value += '.xlsx'
      }
      const wbout = XLSX.write(elTable, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
         FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename)
      } catch (e) {
         if (typeof console !== 'undefined') {
            console.log(e, wbout)
         }
      }
      return wbout
   })
}




onMounted(() => {
   document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";

})

</script>
   
<style lang="scss" scoped>
.reportSearchBox {
   // border-radius: 15px;
   background-color: #fff;
   box-shadow: 0px 0px 6px 0px rgba(224, 224, 239, 0.5);
   margin: 25px 0 12px 0;
   padding: 24px 24px 12px 24px;
   box-sizing: border-box;
   display: flex;
}

.reportSearchBox .el-descriptions-item__container {
   align-items: center;
}

.reportSearchBox .el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
   padding-top: 12px;
}

.reportContentBox {
   background-color: #fff;
   padding: 24px;
   border-radius: 2px;
}

.reportContentBox_head {
   display: flex;
   justify-content: space-between;
   margin-bottom: 20px;
}

.reportTableBtn {
   display: flex;
   flex-direction: column;
}

.reportContentBox .el-popover {
   width: 60px !important;
}

.reportContentBox .stateIcon {
   width: 8px;
   height: 8px;
   background-color: black;
   border-radius: 50%;
   margin-right: 8px;
}

.dateOption {
   // transform: translate(-40px);
   display: flex;
   align-items: center;
   // width: 70%;
   margin-left: 20px;
}

.dateOption p {
   font-family: PingFangSC;
   color: #8C8C8C;
   font-weight: 400;
   font-size: 14px;
   line-height: 22px;
   text-align: left;
   margin-right: 20px;
   cursor: pointer;
}

.inner-block {
   display: inline-block;
}

.reportFilterWith1 {
   width: 70%;
}

.reportFilterWith2 {
   width: 30%;
   display: flex;
   align-items: center;
   margin-left: 20px;
}

.el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell {
   padding: 0;
}

.main-table-title {
   display: flex;
   color: #444;
   padding: 10px 15px;
   margin: 25px 15px 15px 15px;
   background-color: #f5f5f5;
   border: 1px solid #e5e5e5;
   font-size: 14px;
   font-weight: bold;
}

.main-table-content {
   margin-top: 15px;
   flex: 1;

   .content {
      display: flex;
      height: 85px;
      padding: 0 15px;

      .text {
         color: #0093ff;
         overflow: hidden;
         -webkit-line-clamp: 2;
         -webkit-box-orient: vertical;
         text-overflow: ellipsis;
         line-height: 16px;
         width: 250px;
         display: -webkit-box;
         margin-left: 10px;
      }


      .unite-style {
         display: flex;
         align-items: center;
      }
   }
}

.foot-pages {
   display: flex;
   justify-content: flex-end;
   margin-top: 25px;
   margin-right: 15px;
}

.left-select {
   display: flex;
   align-items: center;
}
</style>