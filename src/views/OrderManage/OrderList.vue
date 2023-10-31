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
                  <el-select placeholder="请选择" style="width:270px" v-model="formData.QState">
                     <el-option label="用户ID" value="0"></el-option>
                     <el-option label="订单编号" value="1"></el-option>
                  </el-select>
                  <el-input placeholder="请输入" style="margin-left: 10px;"></el-input>
               </div>

               <div style="display: flex;align-items: center;margin-top: 15px;margin-left: 20px;">
                  <div style="margin-right: 10px;">订单类型</div>
                  <el-select placeholder="请选择订单类型" style="width:270px" v-model="formData.QState">
                     <el-option label="年度会员" value="0"></el-option>
                     <el-option label="月度会员" value="1"></el-option>
                     <el-option label="普通会员" value="2"></el-option>
                  </el-select>
               </div>
               <div style="margin-left: 20px;">
                  <div style="display: flex;align-items: center;margin-top: 15px;">
                     <div style="margin-right: 10px;">付款方式</div>
                     <el-select placeholder="请选择付款方式" style="width:270px" v-model="formData.QState">
                        <el-option label="微信支付" value="0"></el-option>
                        <el-option label="支付宝支付" value="1"></el-option>
                     </el-select>
                  </div>
               </div>
               <div style="display: flex;margin-left: 20px;align-items: center;margin-top: 15px;">
                  <el-button type="primary" style="margin-right:12px" @click="getList()">查询</el-button>
                  <el-button @click="reset()">重置</el-button>
               </div>
            </div>

            <div style="display: flex;align-items: center;margin-top: 15px; margin-left: 20px;">
               <div style="margin-right: 10px;">下单日期</div>
               <!-- style="width:270px;" -->
               <el-date-picker v-model="time" @change="changeTime" value-format="yyyy-MM-dd" type="daterange"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
                  <el-button type="primary" plain >批量操作</el-button>
               </div>
               <el-tab-pane label="全部订单" name="all">
                  <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab"
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
                           <span :style="{ 'color': getStateColor(scope.row.orderState) }"> {{
                              getOrderStateText(scope.row.orderState) }}</span>
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

            <div class="foot-pages">
               <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                  :page-sizes="[10, 20, 30, 40]" :small="small" :disabled="disabled" background
                  layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
            </div>
         </div>
      </div>
   </div>
</template>
   
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Select } from '@element-plus/icons-vue'
import { ref, markRaw } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()


const options = ref([])
const value = ref('')
const input = ref('')
const params = ref({
   startTime: "",
   endTime: "",
   date: "",
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
const currentPage = ref(1)
const userLength = ref(0)
const TotalPage = ref(0)
const formData = ref({
   UniqueCode: "",
   Title: "",
   Role: "",
   CollectId: "",
   QState: null,
   PageIndex: 1,
   PageSize: 8
})
const time = ref(null)
const handleList = ref([])
const traslate2APIState = ref({
   // 待处理: 1,
   // 已下架: 2,
   // 已驳回: 3,
})
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



//点击查看举报详情
const lookDetail = () => {
   router.push({
      path: '/orderDetail'
   })

}

//上架
const add = () => {

}
//下架
const remove = () => {
   ElMessageBox.alert('下架成功', '提示', {
      // center:true,
      icon: markRaw(Select),
   })

}

//驳回
const reject = () => {
   ElMessageBox.alert('驳回举报信息', '提示', {
      // center:true,
      icon: markRaw(Select),
   })

}

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