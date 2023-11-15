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
        <div style="display: flex;">
          <el-button style="margin-right: 8px;" disabled>批量操作</el-button>
          <el-button type="danger" plain @click="delSome()">删除</el-button>
        </div>
      </div>
      <el-table ref="multipleTableDevice" :data="tableData" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }" @selection-change="changeSelection">

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
              <el-switch v-model="scope.row.IsEnable" @change="updatePermission(scope.row)" />
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


  <el-dialog v-model="addDialogVisible" :title="type == 'add' ? '新增会员等级' : '编辑功能配置'" width="35%">
    <div>
      <el-form :model="formData" label-width="120px">
        <el-form-item label="会员名称">
          <el-input v-model="formData.RoleName" />
        </el-form-item>
        <el-form-item label="会员编码">
          <el-input v-model="formData.RoleCode" />
        </el-form-item>
        <el-form-item label="级别权重">
          <el-input v-model="formData.Weight" />
        </el-form-item>
        <el-form-item label="创作权益配置">
          <div style="display:flex;flex-direction:column">
            <el-checkbox v-model="formData.GetTelepathy[0].IsSelect">
              <template #default>
                每日灵感值
                <el-input v-model="formData.GetTelepathy[0].Value" placeholder="请输入数字" style="margin-left: 10px;"
                  :disabled="!formData.GetTelepathy[0].IsSelect" size="small" />
              </template>
            </el-checkbox>

            <el-checkbox v-model="formData.GetGrowthValue[0].IsSelect">
              <template #default>
                每日成长值
                <el-input v-model="formData.GetGrowthValue[0].Value" placeholder="请输入数字" style="margin-left: 10px;"
                  :disabled="!formData.GetGrowthValue[0].IsSelect" size="small" />
              </template>
            </el-checkbox>

            <el-checkbox v-model="formData.Authorities[0].IsSelect">使用高级设置</el-checkbox>
            <el-checkbox v-model="formData.Authorities[1].IsSelect">图片无水印下载</el-checkbox>
          </div>
        </el-form-item>


      </el-form>


    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish()">确认 </el-button>
      </span>
    </template>
  </el-dialog>



  <!-- 查看详情对话框 -->
  <el-dialog v-model="detailDialogVisible" title="查看会员详情" width="35%">
    <div class="orange-card">
      <div class="title">{{ detailData.RoleName }}</div>
      <div class="content">+{{ detailData.GetTelepathy[0].Value }}灵感值/天</div>
      <div class="content">+{{ detailData.GetGrowthValue[0].Value }}成长值/天</div>
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

//改变被选中的会员分类样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
  if (index == 1) {
    searchData.RoleCode = 'VIP001'
  } else if (index == 2) {
    searchData.RoleCode = 'VIP002'
  } else if (index == 3) {
    searchData.RoleCode = 'VIP003'
  } else {
    searchData.RoleCode = ''
  }
}
const changeIndex2 = (index) => {
  selectDateSortIndex.value = index
}

const addDialogVisible = ref(false)
const type = ref('add')

const formData = reactive({
  GroupCode: "VIP",
  RoleName: "",
  RoleCode: "",
  Weight: undefined,
  Authorities: [
    {
      AuthorityKey: "AdvancedSettings",
      AuthorityName: "使用高级设置",
      Value: "true",
      IsSelect: false,
      Order: 0
    },
    {
      AuthorityKey: "IsWatermark",
      AuthorityName: "是否有无水印下载功能",
      Value: "true",
      IsSelect: false,
      Order: 0
    }
  ],
  //获取灵感值方式
  GetTelepathy: [
    {
      Key: "SignDay",
      Name: "每日灵感值",
      Value: undefined,
      IsSelect: false
    }
  ],
  //消耗灵感值方式
  ConsumeTelepathy: [],
  //获取成长值方式
  GetGrowthValue: [
    {
      Key: "GetGrowthValue",
      Name: "获取成长值",
      Value: undefined,
      IsSelect: false
    }
  ]

})


const selections = ref([])
const time = ref([])
const searchData = reactive({
  PageIndex: 1, //页码
  PageSize: 10,  //页数
  GroupCode: "VIP", //分组code 目前有VIP、USER 
  DateTimes: [],  //更新日期
  RoleCode: '',//会员类型
})

//获取vip用户列表
const getList = async () => {
  console.log('发起请求的数据', searchData);
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
  let processValue = newValue[0].split('-').join('/')
  let newValue2 = newValue[1].split(':')
  return processValue + " " + newValue2[0] + ':' + newValue2[1];
}


//日期选择器时间发生变化
const changeDate = (value) => {
  // console.log('日期选择器发生变化', value);
  selectDateSortIndex.value = null
  // searchData.DateTimes = [time.value]
  const newDate = value.split('-')
  newDate[2] = (Number(newDate[2]) + 1).toString()
  searchData.DateTimes = [time.value, newDate.join('-')]
}


//格式化时间
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

  const newDate = formatDate(end).split('-')
  newDate[2] = (Number(newDate[2]) + 1).toString()
  //日期往后多取一个时间
  // console.log('点击按钮实现的时间', formatDate(start), formatDate(end));
  searchData.DateTimes = [formatDate(start), newDate.join('-')]
  // console.log("加工后的时间", searchData.DateTimes);
}



//详情页数据
const detailDialogVisible = ref(false)
const detailData = reactive({
  Authority: [],
  RoleName: '',
  GetTelepathy: [],//每日灵感值
  GetGrowthValue: [],//每日成长值
})

//详情
const lookDetail = (row) => {
  console.log('当前vip的详情信息', row);
  type.value = 'look'
  detailDialogVisible.value = true
  detailData.Authority = row.Authority
  detailData.RoleName = row.RoleName
  detailData.GetTelepathy = row.GetTelepathy
  detailData.GetGrowthValue = row.GetGrowthValue
}


//新增会员等级
const addVipRank = () => {
  //重置表单数据
  resetFormData()
  type.value = 'add'
  addDialogVisible.value = true

}

//功能配置
const setFunItem = (row) => {
  type.value = 'set'
  addDialogVisible.value = true
  //传递当前表单数据过去
  console.log('当前表单数据：', row);
  formData.RoleCode = row.RoleCode
  formData.RoleName = row.RoleName
  formData.Weight = row.Wegiht
  formData.GroupCode = 'VIP'
  formData.Authorities = row.Authority
  //获取灵感值方式
  formData.GetTelepathy = row.GetTelepathy
  //消耗灵感值方式
  formData.ConsumeTelepathy = row.ConsumeTelepathy
  //获取成长值方式
  formData.GetGrowthValue = row.GetGrowthValue
}

//完成新建/编辑
const finish = async () => {
  console.log('编辑等级', type.value);
  if (type.value == 'add') {
    //发起新建请求
    let res1 = await addRoleInfo(formData)
    console.log('新建角色信息', res1);
    if (res1.data.StatusCode == 200) {
      ElMessage({
        message: '新建成功',
        type: 'success',
      })
      addDialogVisible.value = false
      console.log('新建成功11111');
    } else {
      ElMessage({
        message: res1.data.Message,
        type: 'error',
      })
      console.log('新建失败2222', res1.data.Message);
    }
  }

  if (type.value == 'set') {
    let res2 = await editRoleInfo(formData)
    console.log('修改角色信息', res2);
    if (res2.data.StatusCode == 200) {
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
      console.log('修改成功11111');
      addDialogVisible.value = false
    } else {
      ElMessage({
        message: res2.data.Message,
        type: 'error',
      })
      console.log('修改失败2222', res2.data.Message);
    }
  }
  getList()
}

// 启用/停用权限
const updatePermission = async (row) => {
  console.log('会员列表-启用/停用权限', row, row.IsEnable);
  //通知后台修改数据
  // let res = await editRoleInfo({
  //   RoleCode: row.RoleCode,
  //   RoleName: row.RoleName,
  //   Weight: row.Wegiht,
  //   GroupCode: 'VIP',
  //   Authorities: row.Authority,
  //   //获取灵感值方式
  //   GetTelepathy: row.GetTelepathy,
  //   //消耗灵感值方式
  //   ConsumeTelepathy: row.ConsumeTelepathy,
  //   //获取成长值方式
  //   GetGrowthValue: row.GetGrowthValue,
  //   IsEnable:row.IsEnable
  // })
  console.log('启用/停用权限', res);
}



//表格选择项发生变化
const changeSelection = (item) => {
  // console.log('选择项发生变化', item);
  selections.value = []
  item.map((item) => {
    selections.value.push(item.RoleCode)
  })
  // console.log('选择项selection', selections.value);
}


//批量删除
const delSome = async () => {
  //删除角色信息
  for (let [index, value] of selections.value.entries()) {
    console.log('循环遍历数组', index, value);
    let res = await delRoleInfo({ RoleCode: value })
    console.log('删除角色信息', res);
    if (res.status == 200) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      console.log('删除成功1111');

    }
    else {
      ElMessage({
        message: '删除失败',
        type: 'error',
      })
    }
  }
  //重新获取角色信息
  getList()
}


//重置
const reset = () => {
  selectDateSortIndex.value = null
  selectRoleSortIndex.value = 0
  pages.currentPage = 1
  time.value = []
  searchData.DateTimes = []
  searchData.PageIndex = 1
  searchData.RoleCode = ''
  //重新发起请求
  getList()
}

//重置表单数据
const resetFormData = () => {
  formData.RoleCode = ''
  formData.RoleName = ''
  formData.Weight = undefined
  formData.GroupCode = 'VIP'
  formData.Authorities = [
    {
      AuthorityKey: "AdvancedSettings",
      AuthorityName: "使用高级设置",
      Value: "true",
      IsSelect: false,
      Order: 0
    },
    {
      AuthorityKey: "IsWatermark",
      AuthorityName: "是否有无水印下载功能",
      Value: "true",
      IsSelect: false,
      Order: 0
    }
  ]
  //获取灵感值方式
  formData.GetTelepathy = [
    {
      Key: "SignDay",
      Name: "每日灵感值",
      Value: undefined,
      IsSelect: false
    }
  ],
    //消耗灵感值方式
    formData.ConsumeTelepathy = [],
    //获取成长值方式
    formData.GetGrowthValue = [
      {
        Key: "GetGrowthValue",
        Name: "获取成长值",
        Value: undefined,
        IsSelect: false
      }
    ]

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