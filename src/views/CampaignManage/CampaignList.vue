<template>
  <div class="Container" style="padding:22px;height: calc(100% - 64px);">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>竞选管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">竞选列表</span>
    </div>

    <div class="card-content">
      <div style="display: flex; font-size: 15px; align-items: center+;">
        <div style="display: flex; align-items: center;">
          <span style="margin: 0 10px">关键字</span>
          <el-input v-model="keyword" placeholder="请输入ID/手机号" style="width: 200px" size="small" />
        </div>
        <div style="display: flex; align-items: center;font-size: 15px;">
          <span style="line-height:32px;width:64px;margin: 0 12px;vertical-align: middle;">订单状态</span>
          <el-select v-model="orderStateSelect" class="m-2" placeholder="不限" size="small">
            <el-option label="待支付" value="0" />
            <el-option label="进行中" value="1" />
            <el-option label="已完成" value="2" />
            <el-option label="取消" value="3" />
            <el-option label="超时" value="4" />
          </el-select>
        </div>
        <div style="display: flex;align-items: center;font-size: 15px;">
          <span style="line-height:32px;width:64px;margin: 0 12px;vertical-align: middle;">进行状态</span>

          <el-select v-model="doingStateSelect" class="m-2" placeholder="不限" size="small">
            <el-option label="进行中" value="0" />
            <el-option label="上传方案（投稿中）" value="1" />
            <el-option label="待评选" value="2" />
            <el-option label="方案上传中" value="3" />
            <el-option label="评选中" value="4" />
          </el-select>
        </div>

        <div class="" style="line-height:32px;width:64px;margin: 0 12px;vertical-align: middle;">
          提交时间
        </div>
        <el-date-picker v-model="pickTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" width="300px"
          size="small" />
        <el-button type="primary" style="margin:0 20px" size="small">查询</el-button>
        <el-button size="small">重置</el-button>
      </div>
    </div>
    <div style="padding: 30px; background-color: white;">
      <el-table ref="multipleTableDevice" :data="tableData" style="width: 100%;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column prop="id" align="center" header-align="center" label="竞选工单ID">
        </el-table-column>
        <el-table-column prop="name" align="center" header-align="center" label="业主名">
          <template #default="scope">
            <span style="color: blue;">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" align="center" header-align="center" label="设计师用名">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="提交时间">
          <template v-slot="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column prop="money" align="center" header-align="center" label="竞选奖金">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="订单状态">
          <template v-slot="scope">
            <span :style="{ color: getStateColor(scope.row.status), 'font-weight': 'bold' }">
              {{ getStateByCode(scope.row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="doingStatus" align="center" header-align="center" label="进行状态">
          <template v-slot="scope">
            <span :style="{ color: getStateColor(scope.row.doingStatus), 'font-weight': 'bold' }">
              {{ getDoingStateByCode(scope.row.doingStatus) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop=" operations" align="center" header-align="center" label="操作">
          <template v-slot="scope">
            <el-link type="primary" @click=showDetail(scope.row)>查看详情</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 40px;display: flex;justify-content: flex-end;">
        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
          :small="small" :disabled="disabled" background layout="total, sizes, prev, pager, next, jumper" :total="400"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

      <!-- <el-pagination style="float:right;margin-right:15px;" v-model:current-page="page.current"
        v-model:page-size="page.limit" :page-sizes="[10, 20, 30, 40]" :small="small" :disabled="disabled"
        :background="background" layout=" sizes, prev, pager, next, jumper" :total="page.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
    </div>



  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router=useRouter()

// const  page=ref({
//         current: 1,
//         limit: 10,
//         total: 1000,
//       })

const tableData = ref([
  {
    id: "123321",
    name: "用户1",
    phone: "11111111111",
    time: new Date(), //获取当前的系统时间
    money: "100元",
    status: 0, // 0-待支付 1-进行中 2-已完成 3-取消 4-超时
    doingStatus: 999,
  },
  {
    id: "124421",
    name: "用户2",
    phone: "22222222222",
    time: new Date(), //获取当前的系统时间
    money: "200元",
    status: 1, // 0-待支付 1-进行中 2-已完成 3-取消 4-超时
    doingStatus: 0,
  },
  {
    id: "345543",
    name: "用户3",
    phone: "33333333333",
    time: new Date(), //获取当前的系统时间
    money: "300元",
    status: 2, // 0-待支付 1-进行中 2-已完成 3-取消 4-超时
    doingStatus: 3,//0 投稿中 3-已评选
  },
  {
    id: "456654",
    name: "用户4",
    phone: "44444444444",
    time: new Date(), //获取当前的系统时间
    money: "400元",
    status: 3, // 0-待支付 1-进行中 2-已完成 3-取消 4-超时
    doingStatus: 999,
  },
  {
    id: "567765",
    name: "用户5",
    phone: "55555555555",
    time: new Date(), //获取当前的系统时间
    money: "500元",
    status: 4, // 0-待支付 1-进行中 2-已完成 3-取消 4-超时
    doingStatus: 999,
  },
  {
    id: "678876",
    name: "用户6",
    phone: "66666666666",
    time: new Date(), //获取当前的系统时间
    money: "600元",
    status: 0, // 0-待支付 1-进行中 2-已完成 3-取消 4-超时
    doingStatus: 999,
  },
])
const keyword = ref('') //关键字
const pickTime = ref('')


//格式化时间
const fromatDate = () => {
  const time = new Date();
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const hh = time.getHours();
  const mm = time.getMinutes();
  const ss = time.getSeconds();
  console.log(`${y}-${m}-${d} ${hh}:${mm}:${ss}`);
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}
const getStateByCode = (val) => {
  if (!val) {
    return "待支付";
  } else if (val == 1) {
    return "进行中";
  } else if (val == 2) {
    return "已完成";
  } else if (val == 3) {
    return "取消";
  } else if (val == 4) {
    return "超时";
  }
}
//进行状态
const getDoingStateByCode = (val) => {
  if (val == 999) {
    return '-'
  } else if (val == 0) {
    return '投稿中'
  } else if (val == 3) {
    return '已评选'
  }

}
const getStateColor = (val) => {
  if (!val) {
    return "red";
  } else if (val == 1) {
    return "blue";
  } else if (val == 2) {
    return "#32e332";
  } else {
    return "black";
  }
}

const handleSizeChange = () => { }
const handleCurrentChange = () => { }
const showDetail = (row) => {
  router.push({
    path: '/campaignDetail',
    query: row
  })
}

</script>
  
<style lang="scss" scoped>
.card-content {
  background-color: white;
  padding: 17px;
  margin-bottom: 30px;

  // .datePick {
  //   display: flex;
  //   padding: 10px 0;
  //   align-items: center;
  //   justify-content: space-between;
  // }
}
</style>