<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>会员管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">会员列表</span>
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

        <div style="display: flex;align-items: center;width: 50%;">
          <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
            日期
          </div>

          <el-date-picker v-model="time" type="date" placeholder="请选择日期" style="float:left" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" @change="changeDate">
          </el-date-picker>
          <div class=" " v-for="(item, index) in daysArr" :key="index"
            style="cursor: pointer;text-align: center;margin-left: 10px;"
            :class="selectDateSortIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex2(index)">
            <div @click="setTimeByDays(index)" style="width: 60px;line-height: 32px;font-size: 14px;">
              {{ item }}
            </div>
          </div>
        </div>
        <div style="display: flex;margin-right: 60px;">
          <el-button type="primary" style="margin-right:10px;" :icon="Search" @click="getList()">查询</el-button>
          <el-button @click="reset()">重置</el-button>

        </div>
      </div>

    </div>

    <div style="background-color: white;padding: 30px;">
      <div
        style="display: flex;margin-bottom: 15px;justify-content: space-between;align-items: center;margin-left: 15px;">
        <el-button type="primary" style="margin-right: 8px;" @click="addVipRank()">+&nbsp;新建</el-button>
        <!-- <div style="display: flex;">
          <el-button type="primary" style="margin-right: 8px;" plain>批量操作</el-button>
          <el-button type="danger" plain @click="delSome()">删除</el-button>
        </div> -->
      </div>
      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="RoleName" align="center" header-align="center" label="会员类型">
        </el-table-column>
        <el-table-column prop="RoleCode" align="center" header-align="center" label="会员编码">
        </el-table-column>
        <el-table-column prop="RecordName" align="center" header-align="center" label="上传用户">

        </el-table-column>
        <el-table-column prop="ModifTime" align="center" header-align="center" label="更新时间">
          <template #default="scope">
            {{ processTime(scope.row.ModifTime) }}

          </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;align-items: center;">
              <el-switch v-model="scope.row.IsEnable" @change="updatePermission" />
              <div style="color: #009fff; " @click="lookDetail(scope.row)">详情</div>
              <div style="color: #009fff; " @click="setFunItem(scope.row)">功能配置</div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 40px;display: flex;justify-content: flex-end;align-items: center;">
        <div style="margin-right: 15px;">
          共<span>{{ pages.total }}</span>条
        </div>
        <el-pagination v-model:current-page="pages.currentPage" :page-size="pages.limit" background
          layout=" prev, pager, next, jumper" :total="pages.total" @current-change="handleCurrentChange"></el-pagination>
      </div>

    </div>
  </div>


  <el-dialog v-model="addDialogVisible" :title="type == 'add' ? '新增会员等级' : '编辑功能配置'" width="35%"
    :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="120px">
        <el-form-item label="等级名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="等级编码">
          <el-input v-model="form.rankCode" />
        </el-form-item>
        <el-form-item label="创作权益配置">
          <div style="display:flex;flex-direction:column">
            <el-checkbox v-model="formData.Authorities[0].IsSelect" :disabled="operationType == 'look'">专属标识</el-checkbox>
            <!-- <el-checkbox v-model="value" :disabled="operationType == 'look'">
              <template #default>
                每日灵感值
                <el-input v-model="formData.GetCreationTelepathy" placeholder="请输入数字(例如+10)" style="margin-left: 10px;"
                  size="small" :disabled="operationType == 'look'" />
              </template>
            </el-checkbox>
            <el-checkbox v-model="value" :disabled="operationType == 'look'">
              <template #default>
                每日成长值
                <el-input v-model="formData.VIPGiftDate" placeholder="请输入数字" style="margin-left: 10px;"
                  :disabled="operationType == 'look'" size="small" />
              </template>
            </el-checkbox> -->
            <el-checkbox v-model="formData.Authorities[1].IsSelect" :disabled="operationType == 'look'">高级设置</el-checkbox>
            <el-checkbox v-model="formData.Authorities[2].IsSelect"
              :disabled="operationType == 'look'">购买优惠券包</el-checkbox>
            <el-checkbox v-model="formData.Authorities[3].IsSelect"
              :disabled="operationType == 'look'">功能无水印下载</el-checkbox>
            <el-checkbox v-model="formData.Authorities[4].IsSelect"
              :disabled="operationType == 'look'">创作资源包</el-checkbox>
          </div>
          <!-- <el-checkbox-group v-model="form.checkList" @change="handleCheckAllChange"
            style="display: flex; flex-direction: column;">
            <el-checkbox label="2">
              <template #default>
                每日灵感值
                <el-input v-model="form.inspiration" placeholder="请输入数字(例如+10)" style="margin-left: 10px;" size="small" />
              </template>
            </el-checkbox>
            <el-checkbox label="3">
              <template #default>
                每日成长值
                <el-input v-model="form.getInspiration" placeholder="请输入数字(例如+20)" style="margin-left: 10px;"
                  size="small" />
              </template>
            </el-checkbox>
            <el-checkbox label="4">高级设置</el-checkbox>
            <el-checkbox label="5">功能无水印下载</el-checkbox>
          </el-checkbox-group> -->
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish(type)">确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 查看详情对话框 -->
  <el-dialog v-model="detailDialogVisible" title="查看会员详情" width="35%" :before-close="handleClose">
    <div class="orange-card">
      <div class="title">{{ detailData.RoleName }}</div>
      <div class="content">+180灵感值/天</div>
      <div class="content">+20成长值/天</div>
    </div>
    <div class="orange-card" style="margin-top: 20px;height: 130px;">
      <div class="title">{{ detailData.RoleName }}功能权益</div>
      <div class="content" v-for="item in detailData.Authority" :key="item">
        {{ item.AuthorityName }}
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="detailDialogVisible = false" type="primary">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>


  
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllRole, searchRoleInfo, addRoleInfo, editRoleInfo, delRoleInfo } from '../../api/user'


//分页条数据
const pages = reactive({
  total: 0,
  currentPage: 1,
  limit: 10
})

const sortRole = ref(['不限', '普通会员', '月度会员', '年度会员'])
const selectRoleSortIndex = ref(0)
const selectDateSortIndex = ref(null)


const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])

const yearVipFunc = ref(['专属标识', '高级设置', '功能无水印下载', '更多会员福利等待解锁'])

const tableData = ref([])

//改变被选中的角色分类样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
}
const changeIndex2 = (index) => {
  selectDateSortIndex.value = index
}

const addDialogVisible = ref(false)
const type = ref('add')

const formData = reactive({
  GroupCode: "",
  RoleName: "",
  RoleCode: "",
  Weight: null,
  Remark: "",
  Authorities: [
    {
      AuthorityKey: "Identification",
      AuthorityName: "专属标识",
      IsSelect: true,
      Value: "true"
    },
    {
      AuthorityKey: "RandomVIP",
      AuthorityName: "是否有随机会员",
      IsSelect: true,
      Value: "true"
    },
    {
      AuthorityKey: "TelepathyPack",
      AuthorityName: "是否能购买灵感值包",
      IsSelect: true,
      Value: "true"
    },
    {
      AuthorityKey: "CreatePack",
      AuthorityName: "是否能购买创作资源包",
      IsSelect: true,
      Value: "true"
    },
    {
      AuthorityKey: "ElectionQualification",
      AuthorityName: "是否能参与设计竞选资格",
      IsSelect: true,
      Value: "true"
    },
    {
      AuthorityKey: "CouponPack",
      AuthorityName: "是否能购买优惠劵包",
      IsSelect: true,
      Value: "true"
    }
  ],
  GetTelepathy: [
    {
      Key: "SignDay",
      Name: "每日签到",
      IsSelect: true,
      Value: ''
    },
    {
      Key: "SignWx",
      Name: "微信签到",
      IsSelect: true,
      Value: ''
    }
  ],
  ConsumeTelepathy: [
    {
      Key: "GeneratePicture",
      Name: "生成图片",
      IsSelect: true,
      Value: ''
    },
    {
      Key: "DownloadPicture",
      Name: "下载图片",
      IsSelect: true,
      Value: ''
    }
  ],
  GetGrowthValue: []
})

const time = ref([])
const searchData = reactive({
  PageIndex: 1, //页码
  PageSize: 10,  //页数
  GroupCode: "VIP", //分组code 目前有VIP、USER 
  DateTimes: []  //更新日期
})

//获取vip用户列表
const getList = async () => {
  let res = await searchRoleInfo(searchData)
  console.log('获取vip用户列表', res);
  tableData.value = res.data.Result.Datas
  pages.total = res.data.Result.totalCount
}
getList()


//点击分页条
const handleCurrentChange = (currentPage) => {
  searchData.PageIndex = currentPage
  //修改当前页数后重新发起数据请求
  getList()
}


//对接口请求的时间进行加工
const processTime = (value) => {
  let newValue = value.split('T')
  let newValue2 = newValue[1].split(':')
  return newValue[0] + " " + newValue2[0] + ':' + newValue2[1];
}


//日期选择器时间发生变化
const changeDate = (value) => {
  // console.log('日期选择器发生变化', value);
  selectDateSortIndex.value = null
  searchData.DateTimes = [time.value]
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
  time.value = formatDate(start)
  if (value == 1) {
    // const date = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24)
    end.setTime(end.getTime() - 3600 * 1000 * 24)
    time.value = formatDate(end)
  } else if (value == 2) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    time.value = []
  } else if (value == 3) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    time.value = []
  }
  //对获取到的时间进行格式化
  searchData.DateTimes = [formatDate(start), formatDate(end)]
}





const detailDialogVisible = ref(false)



//新增会员等级
const addVipRank = () => {
  type.value = 'add'
  addDialogVisible.value = true

}


const detailData=reactive({
  Authority:[],
  RoleName:'',
  GetTelepathy:[],//每日灵感值
  GetGrowthValue:[],//每日成长值


})

//详情
const lookDetail = (row) => {
  console.log('当前vip的详情信息',row);
  type.value = 'look'
  detailDialogVisible.value = true
  detailData.Authority=row.Authority
  detailData.RoleName=row.RoleName
  detailData.GetTelepathy=row.GetTelepathy
  detailData.GetGrowthValue=row.GetGrowthValue

}
//功能配置
const setFunItem = () => {
  type.value = 'set'
  addDialogVisible.value = true

}

// 启用/停用权限
const updatePermission = (value) => {
  console.log('会员列表-启用/停用权限', value);
  //通知后台修改数据
}


//批量删除
const delSome = () => {
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}
//完成新建/编辑/查看
const finish = (type) => {
  addDialogVisible.value = false
  if (type = 'add') {
    ElMessage({
      message: '新建成功',
      type: 'success',
    })
  }
  if (type == 'set') {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  }
}

//重置
const reset = () => {
  selectDateSortIndex.value = null
  selectRoleSortIndex.value = 0
  pages.currentPage = 1
  time.value = []
  searchData.DateTimes = []
  searchData.PageIndex = 1
  //重新发起请求
  getList()

}

onMounted(() => {
  document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";

})


</script>
  
<style lang="scss" scoped>
.selectedRoleStyle {
  color: white;
  display: flex;
  justify-content: center;
  background-color: #06a6ff;
  width: 90px;
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


.orange-card {
  margin: auto;
  width: 60%;
  background-color: #fcc66c;
  height: 85px;
  border-radius: 15px;
  color: white;
  padding: 30px;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .content {
    font-size: 13px;
    margin-top: 8px;
    color: #848484;
  }
}
</style>