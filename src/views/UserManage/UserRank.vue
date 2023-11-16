<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>用户管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">用户等级</span>
    </div>

    <div class="card-content">
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
            :class="selectRoleSortIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex(index)">
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
        <el-button type="primary" style="margin-right: 8px;" @click="addUserRank()">+&nbsp;新建</el-button>
        <div style="display: flex;">
          <el-button disabled>批量操作</el-button>
          <el-button type="danger" plain @click="delSome()">删除</el-button>
        </div>
      </div>

      <el-table ref="multipleTableDevice" :data="tableData" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="480" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }" @selection-change="changeSelection">

        <el-table-column type="selection" width="60">
        </el-table-column>

        <el-table-column prop="RoleName" align="center" header-align="center" label="等级类型">
        </el-table-column>
        <el-table-column prop="RoleCode" align="center" header-align="center" label="等级编码">
        </el-table-column>
        <el-table-column prop="RecordName" align="center" header-align="center" label="更新者">
        </el-table-column>

        <el-table-column prop="ModifTime" align="center" header-align="center" label="更新时间">
          <template #default="scope">
            {{ processTime(scope.row.ModifTime) }}
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <el-button type="primary" link @click="gotToRankDetail(scope.row)">详情</el-button>
              <el-button type="primary" link @click="setFunction(scope.row)">功能配置</el-button>
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


  <!-- 新增用户等级 -->
  <el-dialog v-model="addDialogVisible"
    :title="operationType == 'add' ? '新增用户等级' : operationType == 'setFun' ? '编辑功能配置' : '查看用户等级详情'" width="35%">
    <div>
      <el-form :model="formData" label-width="202px">
        <el-form-item label="等级名称">
          <el-input v-model="formData.RoleName" :disabled="operationType == 'look'" />
        </el-form-item>
        <el-form-item label="等级编码">
          <el-input v-model="formData.RoleCode" :disabled="operationType == 'look'" />
        </el-form-item>
        <el-form-item label="级别权重" v-if="operationType == 'add'">
          <el-input v-model="formData.Weight" :disabled="operationType == 'look'" />
        </el-form-item>
        <el-form-item label="达到该等级所需成长值">
          <el-input v-model="formData.Weight" :disabled="operationType == 'look'" />
        </el-form-item>

        <el-form-item label="获得灵感值配置" style="margin-top: 30px;">
          <el-checkbox v-model="formData.GetTelepathy[0].IsSelect" :disabled="operationType == 'look'">
            <template #default>
              主页签到
              <el-input v-model="formData.GetTelepathy[0].Value" placeholder="请输入数字" style="margin-left: 10px;"
                size="small" :disabled="operationType == 'look' || !formData.GetTelepathy[0].IsSelect" />
            </template>
          </el-checkbox>
          <el-checkbox v-model="formData.GetTelepathy[1].IsSelect" :disabled="operationType == 'look'">
            <template #default>
              微信打卡
              <el-input v-model="formData.GetTelepathy[1].Value" placeholder="请输入数字" style="margin-left: 10px;"
                size="small" :disabled="operationType == 'look' || !formData.GetTelepathy[1].IsSelect" />
            </template>
          </el-checkbox>
        </el-form-item>


        <el-form-item label="消耗灵感值配置" style="margin:30px 0;">
          <el-checkbox v-model="formData.ConsumeTelepathy[0].IsSelect" :disabled="operationType == 'look'">
            <template #default>
              生成
              <el-input v-model="formData.ConsumeTelepathy[0].Value" placeholder="请输入数字" style="margin-left: 10px;"
                size="small" :disabled="operationType == 'look' || !formData.ConsumeTelepathy[0].IsSelect" />
            </template>
          </el-checkbox>
          <el-checkbox v-model="formData.ConsumeTelepathy[1].IsSelect" :disabled="operationType == 'look'">
            <template #default>
              下载超清
              <el-input v-model="formData.ConsumeTelepathy[1].Value" placeholder="请输入数字" style="margin-left: 10px;"
                size="small" :disabled="operationType == 'look' || !formData.ConsumeTelepathy[1].IsSelect" />
            </template>
          </el-checkbox>
        </el-form-item>


        <el-form-item label="创作权益配置">
          <div style="display:flex;flex-direction:column">
            <el-checkbox v-model="formData.Authorities[0].IsSelect" :disabled="operationType == 'look'">专属标识</el-checkbox>

            <el-checkbox v-model="formData.GetTelepathy[0].IsSelect" :disabled="operationType == 'look'">
              <template #default>
                每日灵感值
                <el-input v-model="formData.GetTelepathy[0].Value" placeholder="请输入数字" style="margin-left: 10px;"
                  :disabled="operationType == 'look' || !formData.GetTelepathy[0].IsSelect" size="small" />
              </template>
            </el-checkbox>

            <el-checkbox v-model="formData.Authorities[1].IsSelect" :disabled="operationType == 'look'">
              <template #default>
                VIP天数
                <el-input v-model="formData.Authorities[1].Value" placeholder="请输入数字" style="margin-left: 10px;"
                  :disabled="operationType == 'look' || !formData.Authorities[1].IsSelect" size="small" />
              </template>
            </el-checkbox>


            <el-checkbox v-model="formData.Authorities[1].IsSelect" :disabled="operationType == 'look'">随机会员</el-checkbox>
            <el-checkbox v-model="formData.Authorities[5].IsSelect"
              :disabled="operationType == 'look'">购买优惠券包</el-checkbox>
            <el-checkbox v-model="formData.Authorities[2].IsSelect" :disabled="operationType == 'look'">灵感值包</el-checkbox>
            <el-checkbox v-model="formData.Authorities[3].IsSelect"
              :disabled="operationType == 'look'">创作资源包</el-checkbox>
            <el-checkbox v-model="formData.Authorities[4].IsSelect"
              :disabled="operationType == 'look'">参与设计竞选资格</el-checkbox>
          </div>


        </el-form-item>

      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false" v-if="operationType == 'look'">关闭</el-button>
        <div v-else>
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="finish()">确认 </el-button>
        </div>

      </span>
    </template>
  </el-dialog>

  <!-- 查看用户等级详情 -->
  <!-- <el-dialog v-model="detailDialogVisible" title="用户等级详情" width="35%" :before-close="handleClose">
    <div class="green-card">
      <div class="title">{{ currentUserRankData.name }}</div>
      <div class="process" style="margin-bottom: 10px;">
        <el-progress :percentage="parseInt(currentUserRankData.growthValue / 500 * 100)" :stroke-width="10"
          color="rgb(255 255 255)" class="process-content" />
      </div>
      <div style="font-size: 12px;">成长值距离剩升下一级还有{{ 500 - currentUserRankData.growthValue }}成长值</div>
    </div>

    <div style="margin: 45px 15px 0 25px">
      <div style="font-size: 17px;font-weight: bold;margin-bottom: 15px;">创作权益</div>
      <div style="display: flex;align-items: center;margin-left: 25px;margin-top: 15px;"
        v-for="item in currentUserRankData.createPermission " :key="item">
        <template v-if="item.IsSelect">
          <el-icon style="margin-right: 20px;font-size: 16px;">
            <CircleCheckFilled />
          </el-icon>
          <div style="font-size: 14px;">{{ item.AuthorityName }}</div>
        </template>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog> -->
</template>
  
<script setup>
import { ref, watch, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox, valueEquals } from 'element-plus'
import { Delete, Edit, Search, Share, Upload, Plus } from '@element-plus/icons-vue'
import { getAllRole, searchRoleInfo, addRoleInfo, editRoleInfo, delRoleInfo } from '../../api/user'


//分页条数据
const pages = reactive({
  total: 0,
  currentPage: 1,
  limit: 10
})

const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])
const selectRoleSortIndex = ref(null)
//改变被选中的角色分类样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
}

//被选中的表格数据
const selections = ref([])
const tableData = ref([])

const time = ref([])

const formData = reactive({
  GroupCode: "USER",
  RoleName: "",
  RoleCode: "",
  Weight: undefined,
  Remark: "",
  Authorities: [
    {
      AuthorityKey: "Identification",
      AuthorityName: "专属标识",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "RandomVIP",
      AuthorityName: "是否有随机会员",
      IsSelect: false,
      Value:undefined
    },
    {
      AuthorityKey: "TelepathyPack",
      AuthorityName: "是否能购买灵感值包",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "CreatePack",
      AuthorityName: "是否能购买创作资源包",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "ElectionQualification",
      AuthorityName: "是否能参与设计竞选资格",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "CouponPack",
      AuthorityName: "是否能购买优惠劵包",
      IsSelect: false,
      Value: "true"
    }
  ],
  GetTelepathy: [
    {
      Key: "SignDay",
      Name: "每日签到",
      IsSelect: false,
      Value: undefined
    },
    {
      Key: "SignWx",
      Name: "微信签到",
      IsSelect: false,
      Value: undefined
    }
  ],
  ConsumeTelepathy: [
    {
      Key: "GeneratePicture",
      Name: "生成图片",
      IsSelect: true,
      Value: undefined
    },
    {
      Key: "DownloadPicture",
      Name: "下载图片",
      IsSelect: true,
      Value: undefined
    }
  ],
  //获取成长值方式
  GetGrowthValue: [
    {
      Key: "GetGrowthValue",
      Name: "获取成长值",
      Value: undefined,
      IsSelect: false
    }
  ],
})


const searchData = reactive({
  PageIndex: 1, //页码
  PageSize: 10,  //页数
  GroupCode: "USER", //分组code 目前有VIP、USER 
  DateTimes: []  //更新日期
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
const changeDate = (value) => {
  // console.log('日期选择器发生变化', value);
  selectRoleSortIndex.value = null
  const newDate = value.split('-')
  newDate[2] = (Number(newDate[2]) + 1).toString()
  searchData.DateTimes = [time.value,newDate.join('-')]
  // console.log('日期选择器时间发生变化加工的时间',searchData.DateTimes);
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


//对接口请求的时间进行加工
const processTime = (value) => {
  let newValue = value.split('T')
  // let processValue = newValue[0].split('-').join('/')
  let newValue2 = newValue[1].split(':')
  return newValue[0] + " " + newValue2[0] + ':' + newValue2[1];
}

//获取用户等级列表
const getList = async () => {
  console.log('查询时间', searchData);
  let res = await searchRoleInfo(searchData)
  console.log('获取用户等级列表', res);
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


//重置
const reset = () => {
  pages.currentPage = 1
  time.value = []
  selectRoleSortIndex.value = null
  searchData.DateTimes = []
  searchData.PageIndex = 1
  //重新发起请求
  getList()
}


const operationType = ref('add')//默认类型为新建等级 setFun为功能配置
const addDialogVisible = ref(false)
//新增用户等级
const addUserRank = () => {
  //重置表单数据
  resetForm()
  operationType.value = 'add'
  addDialogVisible.value = true

}
//功能配置
const setFunction = (row) => {
  operationType.value = 'setFun'
  addDialogVisible.value = true
  console.log('当前行数据', row);
  //回填表单数据
  formData.GroupCode = 'USER'
  formData.RoleName = row.RoleName
  formData.RoleCode = row.RoleCode
  formData.Weight = row.Wegiht
  formData.GetGrowthValue = row.GetGrowthValue
  formData.GetTelepathy = row.GetTelepathy
  formData.ConsumeTelepathy = row.ConsumeTelepathy
  formData.Authorities = row.Authority

}


const gotToRankDetail = (row) => {
  console.log('当前用户等级的全部信息', row);
  addDialogVisible.value = true
  operationType.value = 'look'
  formData.GroupCode = 'USER'
  formData.RoleName = row.RoleName
  formData.RoleCode = row.RoleCode
  formData.Weight = row.Wegiht
  formData.GetGrowthValue = row.GetGrowthValue
  formData.GetTelepathy = row.GetTelepathy
  formData.ConsumeTelepathy = row.ConsumeTelepathy
  formData.Authorities = row.Authority
}



//完成
const finish = async () => {
  if (operationType.value == 'add') {
    //发起新增请求
    let res1 = await addRoleInfo(formData)
    console.log('新增角色信息', res1);

    if (res1.data.StatusCode == 200) {
      ElMessage({
        message: '新建成功',
        type: 'success',
      })
      addDialogVisible.value = false
    } else {
      ElMessage({
        message: res1.data.Message,
        type: 'error',
      })
      console.log('新建失败2222', res1.data.Message);
    }

  }
  if (operationType.value == 'setFun') {
    //发起修改请求
    console.log('发起修改角色请求数据', formData);
    let res2 = await editRoleInfo(formData)
    console.log('编辑角色信息', res2);
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
  //重新发起数据请求
  getList()
}

//重置表单数据
const resetForm = () => {
  formData.GroupCode = 'USER'
  formData.RoleName = ''
  formData.RoleCode = ''
  formData.Weight = undefined
  formData.Remark = ''
  formData.GetGrowthValue = []
  formData.GetTelepathy = [
    {
      Key: "SignDay",
      Name: "每日签到",
      IsSelect: false,
      Value: undefined
    },
    {
      Key: "SignWx",
      Name: "微信签到",
      IsSelect: false,
      Value: undefined
    }
  ]
  formData.ConsumeTelepathy = [
    {
      Key: "GeneratePicture",
      Name: "生成图片",
      IsSelect: false,
      Value: undefined
    },
    {
      Key: "DownloadPicture",
      Name: "下载图片",
      IsSelect: false,
      Value: undefined
    }
  ]
  formData.Authorities = [
    {
      AuthorityKey: "Identification",
      AuthorityName: "专属标识",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "RandomVIP",
      AuthorityName: "是否有随机会员",
      IsSelect: false,
      Value: undefined
    },
    {
      AuthorityKey: "TelepathyPack",
      AuthorityName: "是否能购买灵感值包",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "CreatePack",
      AuthorityName: "是否能购买创作资源包",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "ElectionQualification",
      AuthorityName: "是否能参与设计竞选资格",
      IsSelect: false,
      Value: "true"
    },
    {
      AuthorityKey: "CouponPack",
      AuthorityName: "是否能购买优惠劵包",
      IsSelect: false,
      Value: "true"
    }

  ]
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
  for (let [index, value] of selections.value.entries()) {
    console.log('循环遍历数组', index, value);
    let res = await delRoleInfo({ RoleCode: value })
    console.log('删除角色信息', res);
    if (res.status == 200) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })

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
  width: 70px;
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
    padding: 10px 0;
    align-items: center;
    justify-content: space-between;
  }
}

.green-card {
  margin: auto;
  width: 60%;
  background-color: #09cd8a;
  height: 85px;
  border-radius: 15px;
  color: white;
  padding: 30px;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  :deep(.el-progress-bar__outer) {
    background-color: #ffffff7a;
  }

  :deep(.el-progress__text) {
    display: none;
  }
}
</style>