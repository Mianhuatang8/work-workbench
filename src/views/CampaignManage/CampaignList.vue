<template>
  <div class="Container" style="padding:22px;height: calc(100% - 64px);">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>竞选管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">竞选列表</span>
    </div>

    <div class="card-content">
      <div style=" font-size: 15px; ">
        <div style="display: flex; font-size: 15px; align-items: center;">
          <div style="display: flex; align-items: center;">
            <span style="margin: 0 10px">关键字</span>
            <el-input v-model="keyword" placeholder="请输入ID/手机号" style="width: 200px" />
          </div>
          <div style="display: flex; align-items: center;font-size: 15px;">
            <span style="line-height:32px;width:64px;margin: 0 12px;vertical-align: middle;">订单状态</span>
            <el-select v-model="orderStateSelect" class="m-2" placeholder="不限">
              <el-option label="待支付" value="0" />
              <el-option label="进行中" value="1" />
              <el-option label="已完成" value="2" />
              <el-option label="取消" value="3" />
              <el-option label="超时" value="4" />
            </el-select>
          </div>
          <div style="display: flex;align-items: center;font-size: 15px;">
            <span style="line-height:32px;width:64px;margin: 0 12px;vertical-align: middle;">进行状态</span>
            <el-select v-model="doingStateSelect" class="m-2" placeholder="不限">
              <el-option label="进行中" value="0" />
              <el-option label="上传方案（投稿中）" value="1" />
              <el-option label="待评选" value="2" />
              <el-option label="方案上传中" value="3" />
              <el-option label="评选中" value="4" />
            </el-select>
          </div>
        </div>

        <div style="display:flex;align-items:center;margin-top:20px;">
          <div class="" style="line-height:32px;width:70px;margin: 0 12px;vertical-align: middle;">
            提交时间
          </div>
          <el-date-picker v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" width="300px"
            format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
          <div class="dateOption">
            <p @click="setTimeByDays(0)">今天</p>
            <p @click="setTimeByDays(1)">昨天</p>
            <p @click="setTimeByDays(7)">最近7天</p>
            <p @click="setTimeByDays(30)">最近30天</p>
          </div>
          <el-button type="primary" style="margin:0 20px">查询</el-button>
          <el-button>重置</el-button>
        </div>


      </div>
    </div>






    <div style="padding: 30px; background-color: white;">
      <el-table ref="multipleTableDevice" :data="tableData" style="width: 100%;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column prop="id" align="center" header-align="center" label="竞选工单ID">
        </el-table-column>
        <el-table-column prop="name" align="center" header-align="center" label="业主名">
          <!-- <template #default="scope">
            <span style="color: blue;">{{ scope.row.name }}</span>
          </template> -->
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
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()

//分页条数据
const pages = ref({
  total: 1000,
  currentPage: 1,
  limit: 10

})

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
const time = ref(null)

const formatDate1 = (time) => {
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
  time.value = [formatDate1(start), formatDate1(end)]
  // console.log('form的time', formData.time);
}



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

onMounted(() => {
  document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";

})
</script>
  
<style lang="scss" scoped>
.card-content {
  background-color: white;
  padding: 30px;
  margin-bottom: 30px;

  // .datePick {
  //   display: flex;
  //   padding: 10px 0;
  //   align-items: center;
  //   justify-content: space-between;
  // }
}

.dateOption {
  // transform: translate(-40px);
  display: flex;
  align-items: center;
  width: 70%;
  margin-left: 20px;
  cursor: pointer;

  p{
    margin-left: 20px;
  }
}
</style>