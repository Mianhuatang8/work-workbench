<template>
   <div class="Container" style="padding:17px 44px">

      <div>
         <div style="margin-bottom: 30px; font-size: 17px;">
            <span>订单管理</span>
            <span style="margin:0 5px;">/</span>
            <span style="font-weight: bold;">订单列表</span>
         </div>

         <div style="background-color: white;padding: 20px;font-size: 14px;">
            <div style="display: flex; margin-left: 20px;">
               <div style="display: flex;align-items: center;margin-top: 15px;">
                  <div style="margin-right: 10px;width: 99px;">精确查询</div>
                  <el-select placeholder="请选择" style="width:270px" v-model="accurateSearch">
                     <el-option label="用户ID" value="0"></el-option>
                     <el-option label="订单编号" value="1"></el-option>
                  </el-select>
                  <el-input v-if="accurateSearch=='0'" v-model="formData.PageQueryParam.UserCode" placeholder="请输入用户ID" style="margin-left: 10px;"></el-input>
                  <el-input v-else placeholder="请输入" v-model="formData.PageQueryParam.OrderCode" style="margin-left: 10px;"></el-input>
               </div>

               <div style="display: flex;align-items: center;margin-top: 15px;margin-left: 20px;">
                  <div style="margin-right: 10px;">订单类型</div>
                  <el-select placeholder="请选择订单类型" style="width:270px" v-model="formData.PageQueryParam.OrderTypeCode">
                     <el-option label="年度会员" value="0"></el-option>
                     <el-option label="月度会员" value="1"></el-option>
                     <el-option label="普通会员" value="2"></el-option>
                  </el-select>
               </div>
               <div style="margin-left: 20px;">
                  <div style="display: flex;align-items: center;margin-top: 15px;">
                     <div style="margin-right: 10px;">付款方式</div>
                     <el-select placeholder="请选择付款方式" style="width:270px" v-model="formData.PageQueryParam.PayChannelCode">
                        <el-option label="微信支付" value="0"></el-option>
                        <el-option label="支付宝支付" value="1"></el-option>
                     </el-select>
                  </div>
               </div>
               <div style="display: flex;margin-left: 20px;align-items: center;margin-top: 15px;">
                  <el-button type="primary" style="margin-right:12px" @click="serach()">查询</el-button>
                  <el-button @click="reset()">重置</el-button>
               </div>
            </div>

            <div style="display: flex;align-items: center;margin-top: 15px; margin-left: 20px;">
               <div style="margin-right: 10px;">下单日期</div>
               <el-date-picker v-model="time" @change="changeTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
               </el-date-picker>
               <div class="dateOption">
                  <p @click="setTimeByDays(0)">今天</p>
                  <p @click="setTimeByDays(1)">昨天</p>
                  <p @click="setTimeByDays(7)">最近7天</p>
                  <p @click="setTimeByDays(30)">最近30天</p>
               </div>

            </div>

         </div>

         <div class="reportContentBox" style="margin-top:30px;">
            <!-- <div style="display: flex;justify-content: space-between;"> -->
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
               <div style="display: flex;justify-content: end; margin-bottom: 10px;">
                  <el-button type="primary" plain>批量操作</el-button>
               </div>
               <el-tab-pane label="全部订单" name="all">
                  <el-table ref="multipleTableDevice" :data="tableData"
                     style="width: 100%;margin-left: 15px;" :header-cell-style="{ background: '#F2F3F8' }" max-height="380"
                     :row-style="{ height: 40 + 'px' }" :cell-style="{ padding: 0 + 'px' }">

                     <el-table-column type="selection" width="60">
                     </el-table-column>

                     <el-table-column prop="orderID" align="center" header-align="center" label="订单编号" width="300">
                     </el-table-column>
                     <el-table-column prop="userID" align="center" header-align="center" label="用户ID" width="300">
                     </el-table-column>
                     <el-table-column prop="orderType" align="center" header-align="center" label="订单类型">
                        <template #default="scope">
                           <span>{{ scope.row.orderType == 0 ? '年度会员' : '月度会员' }}</span>
                        </template>
                     </el-table-column>
                     <el-table-column prop="orderFrom" align="center" header-align="center" label="订单来源">
                        <template #default="scope">
                           <span>{{ scope.row.orderFrom == 0 ? '微信支付' : '支付宝支付' }}</span>
                        </template>

                     </el-table-column>
                     <el-table-column prop="money" align="center" header-align="center" label="消费金额">
                        <template #default="scope">
                           ￥{{ scope.row.money }}
                        </template>
                     </el-table-column>
                     <el-table-column prop="orderState" align="center" header-align="center" label="订单状态">
                        <template #default="scope">
                           <div style="display: flex;align-items: center;justify-content:center">
                              <div :style="{ 'background-color': getStateColor(scope.row.orderState) }" class="stateIcon">
                              </div>
                              <span :style="{ 'color': getStateColor(scope.row.orderState) }"> {{
                                 getOrderStateText(scope.row.orderState) }}</span>
                           </div>
                        </template>
                     </el-table-column>
                     <el-table-column prop="time" align="center" header-align="center" label="下单时间" width="200">
                     </el-table-column>

                     <el-table-column align="center" header-align="center" label="操作">
                        <template #default="scope">
                           <div style="display: flex;justify-content: space-around; cursor: pointer;align-items: center;">
                              <div style="color: #009fff; " @click="lookDetail(scope.row)">订单详情</div>

                           </div>
                        </template>
                     </el-table-column>
                  </el-table>

               </el-tab-pane>
               <el-tab-pane label="待付款" name="wait">待付款</el-tab-pane>
               <el-tab-pane label="退款中" name="refunding">退款中</el-tab-pane>
               <el-tab-pane label="已完成" name="finish">已完成</el-tab-pane>
               <el-tab-pane label="已关闭" name="close">已关闭</el-tab-pane>
               <el-tab-pane label="已退款" name="refunded">已退款</el-tab-pane>
            </el-tabs>

            <!-- </div> -->

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
import { ref, markRaw, onMounted, reactive } from "vue";
import { useRouter } from 'vue-router';
import { getOrderList, getOrderInfoById } from '../../api/order';

const router = useRouter()
//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10
})


const tableData = ref([
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      orderType: 0,//0-年度会员 1-月度会员
      orderFrom: 0,//0-微信 1-支付宝
      money: 199.00,
      orderState: 0,//0-已完成 1-待付款 2-退款中 3-已关闭 4-已退款
      time: '2020/02/12 12:33:11'
   },
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      orderType: 1,//0-年度会员 1-月度会员
      orderFrom: 0,//0-微信 1-支付宝
      money: 199.00,
      orderState: 1,//0-已完成 1-待付款 2-退款中 3-已关闭 4-已退款
      time: '2020/02/12 12:33:11'
   },
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      orderType: 0,//0-年度会员 1-月度会员
      orderFrom: 1,//0-微信 1-支付宝
      money: 199.00,
      orderState: 2,//0-已完成 1-待付款 2-退款中 3-已关闭 4-已退款
      time: '2020/02/12 12:33:11'
   },
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      orderType: 1,//0-年度会员 1-月度会员
      orderFrom: 1,//0-微信 1-支付宝
      money: 199.00,
      orderState: 3,//0-已完成 1-待付款 2-退款中 3-已关闭 4-已退款
      time: '2020/02/12 12:33:11'
   },
   {
      orderID: '121323433333311111111354',
      userID: '121323433333311111111354',
      orderType: 0,//0-年度会员 1-月度会员
      orderFrom: 0,//0-微信 1-支付宝
      money: 199.00,
      orderState: 4,//0-已完成 1-待付款 2-退款中 3-已关闭 4-已退款
      time: '2020/02/12 12:33:11'
   }
])

//日期选择器的时间
const time = ref([])
//精确查询
const accurateSearch=ref(null)
const formData = reactive({
   PageIndex: 1,//第几页
   PageSize: 10,//总页数
   PageQueryParam: {//分页查询参数
      OrderTypeCode: "",//订单类型编号
      OrderStartTime: null,//下单时间
      OrderEndTime: null,//下单时间（需要取选中当天则要传多一天）
      PayChannelCode: "",//支付渠道编号
      UserCode: "",//用户编号
      OrderCode: "",//订单编号
      UserPhone: "",//用户手机号
      OrderStatus: null//订单状态
   }
})

//时间选择器发生变化
const changeTime = (date) => {
   console.log('时间选择器发生变化', date);
   //修改表单数据里面的反馈时间
   formData.PageQueryParam.OrderStartTime = date[0]
   const newDate = date[1].split('-')
   newDate[2] = (Number(newDate[2]) + 1).toString()
   formData.PageQueryParam.OrderEndTime = newDate.join('-')
}


//重置
const reset=()=>{
   time.value=[]
   formData.PageQueryParam.OrderTypeCode=''
   formData.PageQueryParam.OrderStartTime=null
   formData.PageQueryParam.OrderEndTime=null
   formData.PageQueryParam.PayChannelCode=''
   formData.PageQueryParam.UserCode=''
   formData.PageQueryParam.OrderCode=''
   formData.PageQueryParam.UserPhone=''
   formData.PageQueryParam,OrderStatus=null
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
   } else if (value == 7) {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
   } else if (value == 30) {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
   }
   //对获取到的时间进行格式化
   time.value = [formatDate(start), formatDate(end)]
}

const activeName = ref('all')
const getStateColor = (row) => {
   if (row == 0) {
      return "#0adf0a";
   } else if (row == 1) {
      return "orange";
   } else if (row == 2) {
      return "red";
   }
   else if (row == 3) {
      return "gray";
   }
   else if (row == 4) {
      return "gray";
   }
}

const getOrderStateText = (row) => {
   if (row == 0) {
      return "已完成";
   } else if (row == 1) {
      return "待付款";
   } else if (row == 2) {
      return "退款中";
   } else if (row == 3) {
      return "已关闭";
   } else if (row == 4) {
      return "已退款";
   }
}


//查询
const serach=()=>{

}


//点击查看举报详情
const lookDetail = (row) => {
   router.push({
      path: '/orderDetail',
      query: {
         ...row
      }
   })

}


onMounted(() => {
   document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";

})


</script>
   
<style lang="scss" scoped>
.stateIcon {
   width: 8px;
   margin-left: 10px;
   height: 8px;
   background-color: black;
   border-radius: 50%;
   margin-right: 8px;
}

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
   width: 70%;
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