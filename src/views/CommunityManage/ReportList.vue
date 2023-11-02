<template>
  <div class="Container" style="padding:17px 44px">

    <div>
      <div style="margin-bottom: 30px; font-size: 17px;">
        <span >社区管理</span>
        <span style="margin:0 5px;">/</span>
        <span style="font-weight: bold;">举报</span>
      </div>

      <div class="reportSearchBox">
        <el-descriptions class="margin-top inner-block reportFilterWith1" :colon="false" :column="3">
          <el-descriptions-item label="举报编号">
            <el-input placeholder="请输入内容" style="width:270px" v-model="formData.UniqueCode"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-select placeholder="请选择" style="width:270px" v-model="formData.QState">
              <el-option label="待处理" value="1"></el-option>
              <el-option label="已下架" value="2"></el-option>
              <el-option label="已驳回" value="3"></el-option>
            </el-select>
          </el-descriptions-item>
          <!-- :shortcuts="shortcuts" -->
          <el-descriptions-item label="日期" style="    display: flex;  align-items: center">
            <el-date-picker v-model="formData.time" @change="changeTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              style="width:270px;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-descriptions-item>

        </el-descriptions>
        <div class="margin-top inner-block reportFilterWith2" :colon="false" :column="2">
          <div class="dateOption" style="padding-bottom: 12px;">
            <p @click="setTimeByDays(0)">今天</p>
            <p @click="setTimeByDays(1)">昨天</p>
            <p @click="setTimeByDays(7)">最近7天</p>
            <p @click="setTimeByDays(30)">最近30天</p>
          </div>
          <div style="display: flex;align-items: center;padding-bottom: 12px;">
            <el-button type="primary" style="margin-right:12px" @click="getList()">查询</el-button>
            <el-button @click="reset()">重置</el-button>
          </div>
        </div>
      </div>

      <div class="reportContentBox" style="margin-top:30px;">
        <div class="reportContentBox_head">
          <div style="font-weight: bold;">
            举报列表
          </div>
          <div>
            <el-button @click="downSome()">批量驳回</el-button>
            <el-button @click="rejectSome()">批量下架</el-button>
          </div>
        </div>

        <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick"> -->
        <!-- <el-tab-pane label="全部" name="all"> -->

        <!-- :row-style="{ height: 40 + 'px' }" :cell-style="iCellStyle"-->
        <el-table ref="multipleTableDevice" :data="tableData" :header-cell-style="{ background: '#F2F3F8' }"
          @selection-change="handleSelectionChange" style="margin-top: 10px;">
          <el-table-column type="selection" :selectable="checkSelectable" width="60">
          </el-table-column>
          <el-table-column prop="uniqueCode" label="举报编号">
          </el-table-column>
          <el-table-column prop="content" label="举报信息" show-overflow-tooltip>

          </el-table-column>
          <el-table-column prop="userInfo.userName" label="用户信息">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="手机号">
          </el-table-column>
          <el-table-column prop="mAiContent.title" show-overflow-tooltip label="文章名称">
          </el-table-column>
          <el-table-column prop="QType" label="举报状态">
            <template v-slot="scope">
              <div style="display: flex;flex-direction: row;align-items: center;">
                <div :style="{ 'background-color': getStateColor(scope.row) }" class="stateIcon"></div>
                <div>{{ getStateFont(scope.row) }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="caozuo" label="操作">
            <template v-slot="scope">
              <p class="openPicBtn">
                <el-button @click="detail(scope.row)" type="text">详情</el-button>
                <el-button @click="down(scope.row)" type="text" :disabled="scope.row.state !== 1">下架</el-button>
                <el-button @click="reject(scope.row)" type="text" :disabled="scope.row.state !== 1">驳回</el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>

        <!-- <div class="main-table-title">
              <div style="width:30%;font-weight: bold;">举报信息</div>
              <div style="width: 42%;font-weight: bold;">用户信息</div>
              <div style="width: 8%;font-weight: bold;">举报状态</div>
              <div style="width: 20%;font-weight: bold;">操作</div>
            </div>
            <div class="left-select">
              <el-checkbox v-model="checked1" size="small" style="margin-top: 30px;" />
              <div class="main-table-content">
                <div class="header"
                  style="font-size:14px;background-color: rgb(179 242 255);display: flex;margin:0 15px;align-items: center;height: 30px;">
                  <div style="display: flex; width: 30%;">
                    <div style="margin-left: 10px;font-weight: bold;">举报编号：</div>
                    <div style="font-weight: bold;">1231435645656876879</div>
                  </div>
                  <div style="display: flex; width: 70%;">
                    <div style="margin-left: 10px;font-weight: bold;">创建时间：</div>
                    <div style="font-weight: bold;">2020-09-02 12：12：02</div>
                  </div>
                </div>
                <div class="content">
                  <div class="unite-style" style="border:1px solid #ededed;width: 30%;">
                    <div style="display: flex;padding-left: 12px;align-items: center; font-size: 14px">
                      <img src="D:\obj\workbench\src\assets\img" alt="" style="width: 95px;height: 50px;">
                      <div class="text">
                        康师傅糊弄i福利啊欧拉回复vi的技能商品房抵抗康师傅糊弄i福利啊欧拉回复vi的技能商品房抵抗jfriofvcskv
                      </div>

                    </div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 42%;">
                    <div style="display: flex;padding-left: 12px;">
                      <img src="D:\obj\workbench\src\assets\img" alt=""
                        style="height: 40px;width: 40px;border-radius: 50%">
                      <div style="margin-left: 14px;font-size: 14px;">
                        <div class="text">张三</div>
                        <div style="margin-top: 5px;margin-left: 10px;">1223432345434</div>
                      </div>
                    </div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 8%;font-size: 14px;">
                    <div style="padding-left: 12px;color: #2be32b;">已下架</div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 20%;font-size: 14px;">
                    <div style="display: flex;padding-left: 12px;">
                      <div style="margin-right: 8px;cursor: pointer;" @click="gotoReportDetail()">举报详情</div>
                      <div style="margin-right: 8px;cursor: pointer;" @click="remove()">下架</div>
                      <div style="margin-right: 8px;cursor: pointer;" @click="add()">上架</div>
                      <div style="margin-right: 8px;cursor: pointer;" @click="reject()">驳回</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div class="left-select">
              <el-checkbox v-model="checked1" size="small" style="margin-top: 30px;" />
              <div class="main-table-content">
                <div class="header"
                  style="font-size:14px;background-color: rgb(179 242 255);display: flex;margin:0 15px;align-items: center;height: 30px;">
                  <div style="display: flex; width: 30%;">
                    <div style="margin-left: 10px;font-weight: bold;">举报编号：</div>
                    <div style="font-weight: bold;">1231435645656876879</div>
                  </div>
                  <div style="display: flex; width: 70%;">
                    <div style="margin-left: 10px;font-weight: bold;">创建时间：</div>
                    <div style="font-weight: bold;">2020-09-02 12：12：02</div>
                  </div>
                </div>
                <div class="content">
                  <div class="unite-style" style="border:1px solid #ededed;width: 30%;">
                    <div style="display: flex;padding-left: 12px;align-items: center; font-size: 14px">
                      <img src="D:\obj\workbench\src\assets\img" alt="" style="width: 95px;height: 50px;">
                      <div class="text">
                        康师傅糊弄i福利啊欧拉回复vi的技能商品房抵抗康师傅糊弄i福利啊欧拉回复vi的技能商品房抵抗jfriofvcskv
                      </div>

                    </div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 42%;">
                    <div style="display: flex;padding-left: 12px;">
                      <img src="D:\obj\workbench\src\assets\img" alt=""
                        style="height: 40px;width: 40px;border-radius: 50%">
                      <div style="margin-left: 14px;font-size: 14px;">
                        <div class="text">张三</div>
                        <div style="margin-top: 5px;margin-left: 10px;">1223432345434</div>
                      </div>
                    </div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 8%;font-size: 14px;">
                    <div style="padding-left: 12px;color: rgb(0 159 255);">待处理</div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 20%;font-size: 14px;">
                    <div style="display: flex;padding-left: 12px;">
                      <div style="margin-right: 8px;">举报详情</div>
                      <div style="margin-right: 8px;">下架</div>
                      <div style="margin-right: 8px;">上架</div>
                      <div style="margin-right: 8px;">驳回</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div class="left-select">
              <el-checkbox v-model="checked1" size="small" style="margin-top: 30px;" />
              <div class="main-table-content">
                <div class="header"
                  style="font-size:14px;background-color: rgb(179 242 255);display: flex;margin:0 15px;align-items: center;height: 30px;">
                  <div style="display: flex; width: 30%;">
                    <div style="margin-left: 10px;font-weight: bold;">举报编号：</div>
                    <div style="font-weight: bold;">1231435645656876879</div>
                  </div>
                  <div style="display: flex; width: 70%;">
                    <div style="margin-left: 10px;font-weight: bold;">创建时间：</div>
                    <div style="font-weight: bold;">2020-09-02 12：12：02</div>
                  </div>
                </div>
                <div class="content">
                  <div class="unite-style" style="border:1px solid #ededed;width: 30%;">
                    <div style="display: flex;padding-left: 12px;align-items: center; font-size: 14px">
                      <img src="D:\obj\workbench\src\assets\img" alt="" style="width: 95px;height: 50px;">
                      <div class="text">
                        康师傅糊弄i福利啊欧拉回复vi的技能商品房抵抗康师傅糊弄i福利啊欧拉回复vi的技能商品房抵抗jfriofvcskv
                      </div>

                    </div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 42%;">
                    <div style="display: flex;padding-left: 12px;">
                      <img src="D:\obj\workbench\src\assets\img" alt=""
                        style="height: 40px;width: 40px;border-radius: 50%">
                      <div style="margin-left: 14px;font-size: 14px;">
                        <div class="text">张三</div>
                        <div style="margin-top: 5px;margin-left: 10px;">1223432345434</div>
                      </div>
                    </div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 8%;font-size: 14px;">
                    <div style="padding-left: 12px;color: #2be32b;">已下架</div>
                  </div>
                  <div class="unite-style" style="border:1px solid #ededed;width: 20%;font-size: 14px;">
                    <div style="display: flex;padding-left: 12px;">
                      <div style="margin-right: 8px;">举报详情</div>
                      <div style="margin-right: 8px;">下架</div>
                      <div style="margin-right: 8px;">上架</div>
                      <div style="margin-right: 8px;">驳回</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待处理" name="wait">待处理</el-tab-pane>
          <el-tab-pane label="已下架" name="removed">已下架</el-tab-pane>
          <el-tab-pane label="已驳回" name="dismissed">已驳回</el-tab-pane>
        </el-tabs> -->


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
const router = useRouter()

//分页条数据
const pages = ref({
  total: 1000,
  currentPage: 1,
  limit: 10
})

const formData = reactive({
  UniqueCode: "",
  Title: "",
  Role: "",
  CollectId: "",
  QState: null,
  PageIndex: 1,
  PageSize: 8,
  time: null
})

//日期选择器日期变化
const changeTime = (value) => {
  console.log('日期选择器发生变化', value);
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
  formData.time = [formatDate(start), formatDate(end)]
  // console.log('form的time', formData.time);
}



const tableData = ref([
  {
    id: 1,
    uniqueCode: '123456456755',
    content: "文章标题按哟i都多愁善感v哈佛i他就是是的咯是",
    userInfo: {
      userName: '张三'
    },
    phoneNumber: '12121212121',
    mAiContent: {
      title: '好设计是诚实的'
    },
    state: 1,//1-待处理 2-已下架 3-已驳回
    createTime: '2025/08/12 13:54'
  },
  {
    id: 2,
    uniqueCode: '123456456755',
    content: "文章标题按哟i都多愁善感v哈佛i他就是是的咯是",
    userInfo: {
      userName: '张三'
    },
    phoneNumber: '12121212121',
    mAiContent: {
      title: '好设计是诚实的'
    },
    state: 2,
    createTime: '2025/08/12 13:54'
  },
  {
    id: 3,
    uniqueCode: '123456456755',
    content: "文章标题按哟i都多愁善感v哈佛i他就是是的咯是",
    userInfo: {
      userName: '张三'
    },
    phoneNumber: '12121212121',
    mAiContent: {
      title: '好设计是诚实的'
    },
    state: 3,
    createTime: '2025/08/12 13:54'
  }
])


// const time = ref(null)
const handleList = ref([])

const activeName = ref('all')
const getStateFont = (row) => {
  if (row.state == 1) {
    return "待处理";
  } else if (row.state == 2) {
    return "已下架";
  } else if (row.state == 3) {
    return "已驳回";
  }
}
const getStateColor = (row) => {
  if (row.state == 1) {
    return "#FFAD28";
  } else if (row.state == 2) {
    return "#52C41A";
  } else {
    return "#5F90EE";
  }
}



//点击查看举报详情
const detail = (row) => {
  console.log('row',row);
  router.push({
    path: '/reportDetail',
    query: {
      id:row.id,
      state:row.state
    }
  })

}


//下架
const down = (row) => {
  //修改表单数据
  row.state=2
  //向后台发起请求修改后台数据状态
  ElMessageBox.alert('下架成功', '提示', {
    icon: markRaw(Select),
  })

}
//驳回
const reject = (row) => {
  //修改表单数据
  row.state=3
  //向后台发起请求修改后台数据状态
  ElMessageBox.alert('驳回举报信息', '提示', {
    icon: markRaw(Select),
  })
}

//批量驳回
const rejectSome=()=>{
  ElMessageBox.alert('批量驳回成功', '提示', {
    icon: markRaw(Select),
  })
}
//批量下架
const downSome=()=>{
  ElMessageBox.alert('批量下架成功', '提示', {
    icon: markRaw(Select),
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
  transform: translate(-40px);
  display: flex;
  align-items: center;
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