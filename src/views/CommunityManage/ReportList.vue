<template>
  <div class="Container" style="padding:17px 44px">

    <div>
      <div style="margin-bottom: 30px; font-size: 17px;">
        <span style="font-weight: bold;">社区管理</span>
        <span style="margin:0 5px;">/</span>
        <span>举报</span>
      </div>

      <div class="reportSearchBox">
        <el-descriptions class="margin-top inner-block reportFilterWith1" :colon="false" :column="3">
          <el-descriptions-item label="举报编号">
            <el-input placeholder="请输入内容" size="small" style="width:270px" v-model="formData.UniqueCode"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-select placeholder="请选择" style="width:270px" size="small" v-model="formData.QState">
              <el-option label="待处理" value="1"></el-option>
              <el-option label="已下架" value="2"></el-option>
              <el-option label="已驳回" value="3"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="日期" style="    display: flex;  align-items: center">
            <el-date-picker v-model="time" @change="changeTime" value-format="yyyy-MM-dd" size="small"
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
            <el-button type="primary" style="margin-right:12px" size="small" @click="getList()">查询</el-button>
            <el-button size="small" @click="reset()">重置</el-button>
          </div>
        </div>
      </div>

      <div class="reportContentBox" style="margin-top:30px;border-radius: 15px">
        <div class="reportContentBox_head">
          <div style="font-weight: bold;">
            举报列表
          </div>
          <div>
            <el-button size="small" @click="updateState(handleList, '已驳回')">批量驳回</el-button>
            <el-button size="small" @click="updateState(handleList, '已下架')">批量下架</el-button>
          </div>
        </div>

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="全部" name="all">

            <!-- <el-table ref="multipleTableDevice" :data="tableData" :header-cell-style="{ background: '#F2F3F8' }"
              :row-style="{ height: 40 + 'px' }" @selection-change="handleSelectionChange" :cell-style="iCellStyle"
              style="margin-top: 10px;">
             

              <el-table-column type="selection" :selectable="checkSelectable" width="60">
              </el-table-column> -->
            <!-- <el-table-column prop="uniqueCode" label="举报编号">
              </el-table-column> -->
            <!-- <el-table-column prop="content" label="举报信息">
                
              </el-table-column>
              <el-table-column prop="userInfo.userName" label="用户信息">
              </el-table-column> -->
            <!-- <el-table-column prop="phoneNumber" label="手机号">
              </el-table-column> -->
            <!-- <el-table-column prop="mAiContent.title" show-overflow-tooltip label="文章名称">
              </el-table-column> -->
            <!-- <el-table-column prop="QType" label="举报状态">
                <template v-slot="scope">
                  <div style="display: flex;flex-direction: row;align-items: center;">
                    <div :style="{ 'background-color': getStateColor(scope.row) }" class="stateIcon"></div>
                    <div>{{ getStateFont(scope.row) }}</div>
                  </div>
                </template>
              </el-table-column> -->
            <!-- <el-table-column prop="createTime" label="创建时间">
              </el-table-column> -->
            <!-- <el-table-column prop="caozuo" label="操作">
                <template v-slot="scope">
                  <p class="openPicBtn">
                    <el-button @click="detail(scope.row.id)" type="text">详情</el-button>
                    <el-button @click="updateState([scope.row], '已下架')" type="text"
                      :disabled="scope.row.state !== 1">下架</el-button>
                    <el-button @click="updateState([scope.row], '已驳回')" type="text"
                      :disabled="scope.row.state !== 1">驳回</el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table> -->

            <div class="main-table-title">
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
        </el-tabs>


        <div class="foot-pages">
          <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
            :small="small" :disabled="disabled" background layout="total, sizes, prev, pager, next, jumper" :total="400"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
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
    uniqueCode: '123456456755',
    content: "文章标题按哟i都多愁善感v哈佛i他就是是的咯是",
    userInfo: {
      userName: '张三'
    },
    phoneNumber: '12121212121',
    state: 1,


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
const gotoReportDetail = () => {
  router.push({
    path: '/reportDetail'
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
  border-radius: 15px;
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